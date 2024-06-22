import React, { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';

interface AuthRouteProps {
    children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
    const token = localStorage.getItem('token');
    const alertRef = useRef(false);

    useEffect(() => {
        if (!token && !alertRef.current) {
            alert('You are not logged in! Please log in');
            alertRef.current = true;
        }
    }, [token]);

    if (!token) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default AuthRoute;
