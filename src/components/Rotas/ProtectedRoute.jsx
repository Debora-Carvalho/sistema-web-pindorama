import React from 'react';
import { useAuth } from '../../contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';
import Loading from '../Loading/Loading';

const ProtectedRoute = () => {
  const { id, loading } = useAuth();

  // Implementar container de carregamento aqui:
  if (loading) {
    return <Loading />;
  }

  if (id) {

    return <Outlet />;
  } else {

    return <Navigate to="/inicio" replace />;
  }
};

export default ProtectedRoute;