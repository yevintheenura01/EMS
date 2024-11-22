import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ForgotPassword from './components/ForgotPwd/ForgotPassword';
import ResetPassword from './components/ForgotPwd/ResetPassword';
import EmployeesDashboard from './components/Dashboard/EmployeesDashboard';
import AddEmployee from './components/Dashboard/AddEmployee';
import UpdateEmployee from './components/Dashboard/UpdateEmployee';
import AddDepartment from './components/Dashboard/AddDepartment';

const App=() =>{

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/empDashboard" element={<EmployeesDashboard />} />
        <Route path="/addEmployee" element={<AddEmployee />} />
        <Route path="/updateEmployee/:id" element={<UpdateEmployee />} />
        <Route path='/addDepartment' element={<AddDepartment />} />

      </Routes>
    </Router>
  );
};

export default App
