import DateID from '../../utils/DateID';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CardPost({ key, slug, image, title, content, date }) {
    return (
        <div className='col-md-4 mb-3' key={key}>
            <Link to={`/posts/${slug}`} className='text-decoration-none'>
                <div className='card mb-3 w-100 rounded-3 border-0 shadow-sm'>
                    <img src={image} className='card-img-top' alt='...' />
                    <div className='card-body'>
                        <h5 className='card-title'>
                            {title.length > 50
                                ? `${title.substring(0, 50)}...`
                                : title}
                        </h5>
                        <p className='card-text mt-3'>
                            {content.length > 40 ? (
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            content.substring(0, 40) + '...',
                                    }}
                                ></span>
                            ) : (
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: content,
                                    }}
                                ></span>
                            )}
                        </p>
                    </div>
                    <div className='card-footer'>
                        <small className='text-body-secondary'>
                            <i className='fa fa-calendar'></i>{' '}
                            {DateID(new Date(date))}
                        </small>
                    </div>
                </div>
            </Link>
        </div>
    );
}

CardPost.propTypes = {
    key: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
};
