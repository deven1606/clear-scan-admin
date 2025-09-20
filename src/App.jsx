import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminLayout from './components/AdminLayout.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Users from './pages/Users.jsx';
import AddUser from './pages/AddUser.jsx';
import EditUser from './pages/EditUser.jsx';
import MRIServices from './pages/MRIServices.jsx';
import AddMRIService from './pages/AddMRIService.jsx';
import EditMRIService from './pages/EditMRIService.jsx';
import Settings from './pages/Settings.jsx';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="users/add" element={<AddUser />} />
          <Route path="users/edit/:id" element={<EditUser />} />
          <Route path="mri-services" element={<MRIServices />} />
          <Route path="mri-services/add" element={<AddMRIService />} />
          <Route path="mri-services/edit/:id" element={<EditMRIService />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
