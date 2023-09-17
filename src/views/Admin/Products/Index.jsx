import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../../services/Api';
import Cookies from 'js-cookie';
import LayoutAdmin from '../../../layouts/Admin';
import hasAnyPermission from '../../../utils/Permissions';
import Pagination from '../../../components/general/Pagination';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import toast from 'react-hot-toast';

export default function ProductsIndex() {
    document.title = 'Products - Desa Digital';

    const [products, setProducts] = useState([]);
    const [keywords, setKeywords] = useState('');
    const [pagination, setPagination] = useState({
        currentPage: 0,
        perPage: 0,
        total: 0,
    });

    const token = Cookies.get('token');

    const fetchData = async (pageNumber = 1, keywords = '') => {
        const page = pageNumber ? pageNumber : pagination.currentPage;

        await Api.get(`/api/admin/products?search=${keywords}&page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            setProducts(response.data.data.data);

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

    const deleteProduct = (id) => {
        confirmAlert({
            title: 'Are You Sure ?',
            message: 'want to delete this data ?',
            buttons: [
                {
                    label: 'YES',
                    onClick: async () => {
                        await Api.delete(`/api/admin/products/${id}`, {
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
                        <div className='col-md-8'>
                            <div className='row'>
                                {hasAnyPermission(['products.create']) && (
                                    <div className='col-md-3 col-12 mb-2'>
                                        <Link
                                            to='/admin/products/create'
                                            className='btn btn-md btn-primary border-0 shadow-sm w-100'
                                            type='button'
                                        >
                                            <i className='fa fa-plus-circle'></i>{' '}
                                            Add New
                                        </Link>
                                    </div>
                                )}
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
                                                        Title
                                                    </th>
                                                    <th className='border-0'>
                                                        Owner
                                                    </th>
                                                    <th className='border-0'>
                                                        Phone
                                                    </th>
                                                    <th className='border-0'>
                                                        Price
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
                                                {products.length > 0 ? (
                                                    products.map(
                                                        (product, index) => (
                                                            <tr key={index}>
                                                                <td className='fw-bold text-center'>
                                                                    {++index +
                                                                        (pagination.currentPage -
                                                                            1) *
                                                                            pagination.perPage}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        product.title
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        product.owner
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        product.phone
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        product.price
                                                                    }
                                                                </td>
                                                                <td className='text-center'>
                                                                    {hasAnyPermission(
                                                                        [
                                                                            'products.edit',
                                                                        ]
                                                                    ) && (
                                                                        <Link
                                                                            to={`/admin/products/edit/${product.id}`}
                                                                            className='btn btn-primary btn-sm me-2'
                                                                        >
                                                                            <i className='fa fa-pencil-alt'></i>
                                                                        </Link>
                                                                    )}

                                                                    {hasAnyPermission(
                                                                        [
                                                                            'products.delete',
                                                                        ]
                                                                    ) && (
                                                                        <button
                                                                            onClick={() =>
                                                                                deleteProduct(
                                                                                    product.id
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
