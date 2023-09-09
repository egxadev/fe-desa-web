import { useState, useEffect } from 'react';
import LayoutAdmin from '../../../layouts/Admin';
import Api from '../../../services/Api';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    document.title = 'Dashboard - Desa Digital';

    const [countCategories, setCountCategories] = useState(0);
    const [countPosts, setCountPosts] = useState(0);
    const [countProducts, setCountProducts] = useState(0);
    const [countAparaturs, setCountAparaturs] = useState(0);

    const token = Cookies.get('token');

    useEffect(() => {
        Api.get('/api/admin/dashboard', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            setCountCategories(response.data.data.categories);
            setCountPosts(response.data.data.posts);
            setCountProducts(response.data.data.products);
            setCountAparaturs(response.data.data.aparaturs);
        });
    }, []);

    return (
        <LayoutAdmin>
            <main>
                <div className='container-fluid px-4 mt-5'>
                    <div className='row'>
                        <div className='col-xl-3 col-md-6'>
                            <div className='card bg-primary text-white mb-4 border-0 shadow-sm'>
                                <div className='card-body'>
                                    <strong>{countCategories}</strong>{' '}
                                    CATEGORIES
                                </div>
                                <div className='card-footer d-flex align-items-center justify-content-between'>
                                    <Link
                                        class='small text-white stretched-link'
                                        to='/admin/categories'
                                    >
                                        View Details
                                    </Link>
                                    <div className='small text-white'>
                                        <i className='fas fa-angle-right'></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-3 col-md-6'>
                            <div className='card bg-warning text-white mb-4 border-0 shadow-sm'>
                                <div className='card-body'>
                                    <strong>{countPosts}</strong> POSTS
                                </div>
                                <div className='card-footer d-flex align-items-center justify-content-between'>
                                    <Link
                                        class='small text-white stretched-link'
                                        to='/admin/posts'
                                    >
                                        View Details
                                    </Link>
                                    <div className='small text-white'>
                                        <i className='fas fa-angle-right'></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-3 col-md-6'>
                            <div className='card bg-success text-white mb-4 border-0 shadow-sm'>
                                <div className='card-body'>
                                    <strong>{countProducts}</strong> PRODUCTS
                                </div>
                                <div className='card-footer d-flex align-items-center justify-content-between'>
                                    <Link
                                        class='small text-white stretched-link'
                                        to='/admin/products'
                                    >
                                        View Details
                                    </Link>
                                    <div className='small text-white'>
                                        <i className='fas fa-angle-right'></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-3 col-md-6'>
                            <div className='card bg-danger text-white mb-4 border-0 shadow-sm'>
                                <div className='card-body'>
                                    <strong>{countAparaturs}</strong> APARATURS
                                </div>
                                <div className='card-footer d-flex align-items-center justify-content-between'>
                                    <Link
                                        class='small text-white stretched-link'
                                        to='/admin/aparaturs'
                                    >
                                        View Details
                                    </Link>
                                    <div className='small text-white'>
                                        <i className='fas fa-angle-right'></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </LayoutAdmin>
    );
}
