import MoneyFormat from '../../utils/MoneyFormat';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CardProduct({ key, slug, image, title, price, phone }) {
    return (
        <div className='col-md-4 mb-3' key={key}>
            <Link to={`/products/${slug}`} className='text-decoration-none'>
                <div className='card mb-3 w-100 rounded-3 border-0 shadow-sm'>
                    <img src={image} className='card-img-top' alt='...' />
                    <div className='card-body'>
                        <h5 className='card-title'>
                            {title.length > 50
                                ? `${title.substring(0, 50)}...`
                                : title}
                        </h5>
                        <p className='card-text mt-3'>{MoneyFormat(price)}</p>
                        <hr />
                        <a
                            href={`https://api.whatsapp.com/send?phone=${phone}&text=Halo%20kak%2C%20saya%20ingin%20pesan%20%3A%20${title}`}
                            className='btn btn-primary w-100'
                            target='_blank'
                            rel='noreferrer'
                        >
                            <i className='fa-brands fa-whatsapp'></i> Beli
                            Sekarang
                        </a>
                    </div>
                </div>
            </Link>
        </div>
    );
}

CardProduct.propTypes = {
    key: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
};
