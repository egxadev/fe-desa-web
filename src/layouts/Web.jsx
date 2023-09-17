import '../assets/admin/css/styles.css';
import '../assets/web/css/custom.css';
import '../assets/admin/js/bootstrap.bundle.min.js';
import Navbar from '../components/web/Navbar';
import Footer from '../components/web/Footer';
import PropTypes from 'prop-types';

export default function Web({ children }) {
    return (
        <>
            <Navbar />

            {children}

            <Footer />
        </>
    );
}

Web.propTypes = {
    children: PropTypes.element,
};
