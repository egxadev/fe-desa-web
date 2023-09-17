import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CardPage({ key, title, slug }) {
    return (
        <div className='col-md-4 mb-4'>
            <Link to={`/pages/${slug}`} className='text-decoration-none'>
                <div
                    className='card border-0 shadow-sm rounded-3 text-center text-uppercase'
                    key={key}
                >
                    <div className='card-body mt-2'>
                        <h5>{title}</h5>
                    </div>
                </div>
            </Link>
        </div>
    );
}

CardPage.propTypes = {
    key: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
};
