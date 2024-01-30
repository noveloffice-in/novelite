import { useFrappeAuth, useFrappeGetDoc } from 'frappe-react-sdk';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setAccountType, setCompanyName, setUserImage } from '../store/apps/userProfile/NovelProfileSlice';

export default function Getdata(props) {
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
    const userEmail = useSelector((state) => state.novelprofileReducer.userEmail);

    const dispatch = useDispatch();

    //Getting the user ndetails using the cookies
    let c = Cookies.set(getUserCookie);
    // console.log(Cookies.get('user_id'));

    useEffect(() => {
        if (fullName === 'Guest') {
            naviagate('/dashboard');
            return;
        } else {
            if (Cookies.get('user_id') == undefined) {
                // console.log("This is user = ", Cookies.get('user_id'));
                naviagate('/');
            } else {

            }
        }
    }, [])

    if (fullName !== 'Guest') {
        const getUserData = () => {
            const { data, error, isValidating, mutate } = useFrappeGetDoc(
                'User',
                `${userEmail}`
            );
            return data ? data : error;
        }

        const userData = getUserData();

        const acc_type = userData?.account_type;
        dispatch(setCompanyName(userData?.customer));
        // console.log("Customer = ", getUserData()?.customer);
        dispatch(setAccountType(acc_type))

        if (userData?.user_image !== undefined) {
            const userImage = userData?.user_image;
            console.log("userImage = ", userData?.user_image);
            dispatch(setUserImage(userImage))
        } else {
            dispatch(setUserImage(""))
        }
        console.log("DATA = ", userData);
    }


    return (
        <Component />
    )
}
