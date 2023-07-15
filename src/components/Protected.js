import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
export default function Protected({children}) {
    const {user} = UserAuth();
    if(!user){
      return <Navigate to='/signin'/>
    }
  return children;
}
