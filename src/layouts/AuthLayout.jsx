import React from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import myStore from '@/store';

const AuthLayout = () => {
  const { setToken, addToken } = myStore();
  const navigate = useNavigate()
  console.log("tokenyha bhi",setToken);

useEffect(()=>{
  if(setToken){
    navigate("/dashboard/home")
 }

},[])


  return (
    <>
    <Outlet/>
    </>
  )
}

export default AuthLayout