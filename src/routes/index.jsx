import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';

//======================================================
// view admin
//======================================================

import Login from '../views/Auth/Login';
import Forbidden from '../views/Auth/Forbidden';
import Dashboard from '../views/Admin/Dashboard/Index';

export default function RoutesIndex() {
    return (
        <Routes>
            {/* route "/login" */}
            <Route path='/login' element={<Login />} />

            {/* route "/forbidden" */}
            <Route path='/forbidden' element={<Forbidden />} />

            {/* private route "/admin/dashboard" */}
            <Route
                path='/admin/dashboard'
                element={
                    <PrivateRoutes>
                        <Dashboard />
                    </PrivateRoutes>
                }
            />
        </Routes>
    );
}
