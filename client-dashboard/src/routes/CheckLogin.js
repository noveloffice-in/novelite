import { useFrappeAuth } from 'frappe-react-sdk';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

export default function CheckLogin(props) {
  const { Component } = props;
  const naviagate = useNavigate();

  const {
    currentUser,
    isValidating,
    isLoading,
    login,
    logout,
    error,
    updateCurrentUser,
    getUserCookie,
  } = useFrappeAuth();

  let c = Cookies.set(getUserCookie);
  console.log(" Cookie ", Cookies.get('user_id'));

  useEffect(() => {

    const handleBackButton = (event) => {
      if (Cookies.get('user_id') !== 'Guest') {
        naviagate('/dashboard');
      } else {
        naviagate('/login');
      }
    };

    if (Cookies.get('user_id') !== 'Guest') {
      naviagate('/dashboard');
    } else {
      naviagate('/login');
    }

    window.addEventListener('popstate', handleBackButton);

    // Cleanup when component unmounts
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [])


  return (
    <Component />
  )
}
