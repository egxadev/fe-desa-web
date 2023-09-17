import PropTypes from 'prop-types';

export default function CardPhoto({ key, image, caption }) {
    return (
        <div className='col-md-4 mb-4'>
            <div
                className='card border-0 shadow-sm rounded-3 text-center'
                key={key}
            >
                <div className='card-body mt-2'>
                    <div className='text-center mb-3'>
                        <img src={image} className='w-100 rounded' />
                    </div>
                    <hr />
                    <h6>
                        <i>{caption}</i>
                    </h6>
                </div>
            </div>
        </div>
    );
}

CardPhoto.propTypes = {
    key: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
};
