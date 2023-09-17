import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all.js';
import PropTypes from 'prop-types';

export default function Auth({ children }) {
    return (
        <div
            style={{
                backgroundImage: 'url(/images/bg.png)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: '100vh',
            }}
        >
            <div className='container'>
                <div className='d-flex justify-content-center h-100'>
                    {children}
                </div>
            </div>
        </div>
    );
}

Auth.propTypes = {
    children: PropTypes.element,
};
