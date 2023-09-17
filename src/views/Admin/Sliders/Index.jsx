import { useState, useEffect } from 'react';
import Api from '../../../services/Api';
import Cookies from 'js-cookie';
import LayoutAdmin from '../../../layouts/Admin';
import hasAnyPermission from '../../../utils/Permissions';
import Pagination from '../../../components/general/Pagination';
import SlidersCreate from './Create';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import toast from 'react-hot-toast';

export default function SlidersIndex() {
    document.title = 'Sliders - Desa Digital';

    const [sliders, setSliders] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 0,
        perPage: 0,
        total: 0,
    });

    const token = Cookies.get('token');

    const fetchData = async (pageNumber = 1) => {
        const page = pageNumber ? pageNumber : pagination.currentPage;

        await Api.get(`/api/admin/sliders?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            setSliders(response.data.data.data);

            setPagination(() => ({
                currentPage: response.data.data.current_page,
                perPage: response.data.data.per_page,
                total: response.data.data.total,
            }));
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteSlider = (id) => {
        confirmAlert({
            title: 'Are You Sure ?',
            message: 'want to delete this data ?',
            buttons: [
                {
                    label: 'YES',
                    onClick: async () => {
                        await Api.delete(`/api/admin/sliders/${id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }).then((response) => {
                            toast.success(response.data.message, {
                                position: 'top-right',
                                duration: 4000,
                            });

                            fetchData();
                        });
                    },
                },
                {
                    label: 'NO',
                    onClick: () => {},
                },
            ],
        });
    };

    return (
        <LayoutAdmin>
            <main>
                <div className='container-fluid mb-5 mt-5'>
                    <div className='row'>
                        <div className='col-md-12'>
                            {hasAnyPermission(['sliders.create']) && (
                                <SlidersCreate fetchData={fetchData} />
                            )}
                        </div>
                    </div>
                    <div className='row mt-4'>
                        <div className='col-md-12'>
                            <div className='card border-0 rounded shadow-sm border-top-success'>
                                <div className='card-body'>
                                    <div className='table-responsive'>
                                        <table className='table table-bordered table-centered mb-0 rounded'>
                                            <thead className='thead-dark'>
                                                <tr className='border-0'>
                                                    <th
                                                        className='border-0'
                                                        style={{ width: '5%' }}
                                                    >
                                                        No.
                                                    </th>
                                                    <th className='border-0'>
                                                        Image
                                                    </th>
                                                    <th
                                                        className='border-0'
                                                        style={{ width: '15%' }}
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sliders.length > 0 ? (
                                                    sliders.map(
                                                        (slider, index) => (
                                                            <tr key={index}>
                                                                <td className='fw-bold text-center'>
                                                                    {++index +
                                                                        (pagination.currentPage -
                                                                            1) *
                                                                            pagination.perPage}
                                                                </td>
                                                                <td className='text-center'>
                                                                    <img
                                                                        src={
                                                                            slider.image
                                                                        }
                                                                        width={
                                                                            '300px'
                                                                        }
                                                                        className='rounded'
                                                                    />
                                                                </td>
                                                                <td className='text-center'>
                                                                    {hasAnyPermission(
                                                                        [
                                                                            'sliders.delete',
                                                                        ]
                                                                    ) && (
                                                                        <button
                                                                            onClick={() =>
                                                                                deleteSlider(
                                                                                    slider.id
                                                                                )
                                                                            }
                                                                            className='btn btn-danger btn-sm'
                                                                        >
                                                                            <i className='fa fa-trash'></i>
                                                                        </button>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                ) : (
                                                    <tr>
                                                        <td colSpan={5}>
                                                            <div
                                                                className='alert alert-danger border-0 rounded shadow-sm w-100 text-center'
                                                                role='alert'
                                                            >
                                                                Data Belum
                                                                Tersedia!.
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    <Pagination
                                        currentPage={pagination.currentPage}
                                        perPage={pagination.perPage}
                                        total={pagination.total}
                                        onChange={(pageNumber) =>
                                            fetchData(pageNumber)
                                        }
                                        position='end'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </LayoutAdmin>
    );
}
