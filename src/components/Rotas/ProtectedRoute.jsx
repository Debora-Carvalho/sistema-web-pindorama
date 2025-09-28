import React from 'react';
import { useAuth } from '../../contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { id, loading } = useAuth();

  // Implementar container de carregamento aqui:
  if (loading) {
    return <div>Carregando...</div>;
  }

  if (id) {

    return <Outlet />;
  } else {

    return <Navigate to="/inicio" replace />;
  }
};

export default ProtectedRoute;