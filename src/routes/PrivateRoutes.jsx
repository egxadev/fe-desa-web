import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoutes({ children }) {
    const token = Cookies.get('token');

    if (!token) {
        return <Navigate to='/login' replace />;
    }

    return children;
}

PrivateRoutes.propTypes = {
    children: PropTypes.element,
};

export default PrivateRoutes;
