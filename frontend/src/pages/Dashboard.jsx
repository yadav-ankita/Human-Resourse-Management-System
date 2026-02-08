import React from 'react'
import { useGlobalContext } from '../context/AppContext'
import { Navigate } from 'react-router';
import { Nav } from 'react-bootstrap';

const Dashboard = () => {
   const {userData}=useGlobalContext();
   console.log("the user data in dashboard is",userData);
   const {role}=userData;
  return (
    <>
       {
          role=="admin" ? <Navigate to="/admin/dashboard"/> : <Navigate to="/emp/dashboard"/>
       }
    
    </>
  )
}

export default Dashboard
