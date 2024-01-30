import { useFrappeAuth, useFrappeGetDoc } from 'frappe-react-sdk';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

export default function Protected(props) {
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

    const fullName = useSelector((state) => state.novelprofileReducer.fullName);

    //Getting the user ndetails using the cookies
    let c = Cookies.set(getUserCookie);
    // console.log(Cookies.get('user_id'));

    useEffect(()=>{
        if (fullName === 'Guest') {
            naviagate('/dashboard');
            return;
        } else {
            if (Cookies.get('user_id') == undefined) {
                // console.log("This is user = ", Cookies.get('user_id'));
                naviagate('/');
            }
        }
    },[])

    return (
        <Component />
    )
}
