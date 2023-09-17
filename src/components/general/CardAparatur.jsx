import PropTypes from 'prop-types';

export default function CardAparatur({ key, image, name, role }) {
    return (
        <div className='col-md-4 mb-4'>
            <div
                className='card border-0 shadow-sm rounded-3 text-center text-uppercase'
                key={key}
            >
                <div className='card-body mt-2'>
                    <div className='text-center mb-3'>
                        <img src={image} className='w-50 rounded-pill' />
                    </div>
                    <h5>{name}</h5>
                    <hr />
                    <h6>
                        <i>{role}</i>
                    </h6>
                </div>
            </div>
        </div>
    );
}

CardAparatur.propTypes = {
    key: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
};
