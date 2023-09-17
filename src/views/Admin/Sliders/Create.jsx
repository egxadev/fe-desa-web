import { useState } from 'react';
import Api from '../../../services/Api';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

export default function SlidersCreate({ fetchData }) {
    const [image, setImage] = useState('');
    const [errors, setErros] = useState([]);

    const token = Cookies.get('token');

    const storeSlider = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('image', image);

        await Api.post('/api/admin/sliders', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'multipart/form-data',
            },
        })
            .then((response) => {
                toast.success(response.data.message, {
                    position: 'top-right',
                    duration: 4000,
                });

                document.getElementById('file').value = '';

                fetchData();
            })
            .catch((error) => {
                setErros(error.response.data);
            });
    };

    return (
        <div className='card border-0 rounded shadow-sm border-top-success'>
            <div className='card-body'>
                <form onSubmit={storeSlider}>
                    <div className='mb-3'>
                        <label className='form-label fw-bold'>Image</label>
                        <input
                            type='file'
                            id='file'
                            className='form-control'
                            accept='images/*'
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                    {errors.image && (
                        <div className='alert alert-danger'>
                            {errors.image[0]}
                        </div>
                    )}
                    <div>
                        <button
                            type='submit'
                            className='btn btn-md btn-primary me-2'
                        >
                            <i className='fa fa-save'></i> Upload
                        </button>
                        <button type='reset' className='btn btn-md btn-warning'>
                            <i className='fa fa-redo'></i> Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

SlidersCreate.propTypes = {
    fetchData: PropTypes.func,
};
