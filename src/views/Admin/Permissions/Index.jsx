import { useState, useEffect } from 'react';
import Api from '../../../services/Api';
import Cookies from 'js-cookie';
import LayoutAdmin from '../../../layouts/Admin';
import Pagination from '../../../components/general/Pagination';

export default function Index() {
    document.title = 'Permissions - Desa Digital';

    const [permissions, setPermissions] = useState([]);
    const [keywords, setKeywords] = useState('');
    const [pagination, setPagination] = useState({
        currentPage: 0,
        perPage: 0,
        total: 0,
    });

    const token = Cookies.get('token');

    const fetchData = async (pageNumber = 1, keywords = '') => {
        const page = pageNumber ? pageNumber : pagination.currentPage;

        await Api.get(
            `/api/admin/permissions?search=${keywords}&page=${page}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ).then((response) => {
            setPermissions(response.data.data.data);

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

    const searchData = async (e) => {
        setKeywords(e.target.value);

        fetchData(1, e.target.value);
    };

    return (
        <LayoutAdmin>
            <main>
                <div className='container-fluid px-4 mt-5'>
                    <div className='row'>
                        <div className='col-md-8'>
                            <div className='row'>
                                <div className='col-md-9 col-12 mb-2'>
                                    <div className='input-group'>
                                        <input
                                            type='text'
                                            className='form-control border-0 shadow-sm'
                                            onChange={(e) => searchData(e)}
                                            placeholder='search here...'
                                        />
                                        <span className='input-group-text border-0 shadow-sm'>
                                            <i className='fa fa-search'></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-1'>
                        <div className='col-md-12'>
                            <div className='card border-0 rounded shadow-sm border-top-success'>
                                <div className='card-body'>
                                    <div className='table-responsive'>
                                        <table className='table table-bordered table-centered table-nowrap mb-0 rounded'>
                                            <thead className='thead-dark'>
                                                <tr className='border-0'>
                                                    <th
                                                        className='border-0'
                                                        style={{ width: '5%' }}
                                                    >
                                                        No.
                                                    </th>
                                                    <th className='border-0'>
                                                        Permission Name
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {permissions.length > 0 ? (
                                                    permissions.map(
                                                        (permission, index) => (
                                                            <tr key={index}>
                                                                <td className='fw-bold text-center'>
                                                                    {++index +
                                                                        (pagination.currentPage -
                                                                            1) *
                                                                            pagination.perPage}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        permission.name
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                ) : (
                                                    <tr>
                                                        <td colSpan={2}>
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
                                            fetchData(pageNumber, keywords)
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
