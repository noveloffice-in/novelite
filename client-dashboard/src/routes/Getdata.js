import { useFrappeAuth, useFrappeGetDoc, useFrappeGetDocList } from 'frappe-react-sdk';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setAccountType, setAdminStatus, setCompanyName, setLeadsID, setUserImage } from '../store/apps/userProfile/NovelProfileSlice';

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

    //Getting data from App user to set wheather user is Admin / Non-Admin
    const { data: appUserData } = useFrappeGetDoc('App Users', userEmail);
    if (appUserData) {
        dispatch(setAdminStatus(appUserData.user_type));
    }

    //Getting the user ndetails using the cookies
    let c = Cookies.set(getUserCookie);
    console.log(" Cookie inside login ", Cookies.get('user_id'));

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

    // console.log(fullName);


    if (fullName !== 'Guest') {
        const getUserData = () => {
            const { data, error, isValidating, mutate } = useFrappeGetDoc(
                'User',
                `${userEmail}`
            );
            return data ? data : error;
        }

        const userData = getUserData();

        const acc_type = userData?.app_user_type;
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
        // console.log("DATA = ", userData);

        //Getting leads and setting only lead Ids in store
        const getLeadID = () => {
            const { data: customerData } = useFrappeGetDoc(
                'Customer', `${userData?.customer}`
            );
            return customerData?.leads;
        }

        const leadsIDs = getLeadID()?.map((lead) => {
            return lead.leads
        });

        dispatch(setLeadsID(leadsIDs))
        // console.log(leadsIDs);
    }


    return (
        <Component />
    )
}
