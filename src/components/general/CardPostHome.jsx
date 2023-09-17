import { Link } from 'react-router-dom';
import DateID from '../../utils/DateID';
import PropTypes from 'prop-types';

export default function CardPostHome({ key, slug, image, title, user, date }) {
    return (
        <div className='col-md-6 mb-3' key={key}>
            <Link to={`/posts/${slug}`} className='text-decoration-none'>
                <div className='card mb-3 w-100 rounded-3 border-0 shadow-sm'>
                    <div className='row g-0 mb-0 pb-0'>
                        <div className='col-md-4'>
                            <img
                                src={image}
                                className='img-fluid rounded h-100 w-100'
                                style={{ objectFit: 'cover' }}
                                alt={title}
                            />
                        </div>
                        <div className='col-md-8'>
                            <div className='card-body'>
                                <h5 className='card-title'>
                                    {title.length > 50
                                        ? `${title.substring(0, 50)}...`
                                        : title}
                                </h5>
                                <hr />
                                <div className='d-flex justify-content-between'>
                                    <div className='start-0'>
                                        <i className='fa fa-user'></i> {user}
                                    </div>
                                    <div className='end-0'>
                                        <i className='fa fa-calendar'></i>{' '}
                                        {DateID(new Date(date))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

CardPostHome.propTypes = {
    key: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
};
