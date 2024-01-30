import { useFrappeAuth } from 'frappe-react-sdk';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

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

    useEffect(()=>{
        if (currentUser != undefined) {
            naviagate('/dashboard');
        } else {
            naviagate('/login');
        }
    },[])


    return (
        <Component />
    )
}
