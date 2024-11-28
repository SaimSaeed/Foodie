import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet,Navigate } from "react-router-dom";


function AdminRoutes() {

    const {user} = useSelector(state=>state.auth)
  return user && user?.isAdmin ? <Outlet/> : <Navigate to={"/"}/>
}

export default AdminRoutes