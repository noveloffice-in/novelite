import { useFrappeAuth, useFrappeGetDoc, useFrappeGetDocList } from 'frappe-react-sdk';
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

    console.log(fullName);


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
        console.log("DATA = ", userData);

        const getLeadID = () => {
            const { data: customerData } = useFrappeGetDoc(
                'Customer', `${userData?.customer}`
            );
            return customerData?.leads;
        }

        // const leadsIdArray = getLeadID()?.map((lead) => {
        //     return lead.leads
        // });

        // console.log("Leads array = ", getLeadID());
        dispatch(setLeads(getLeadID()));

        // leadsIdArray?.forEach(leadID => {
        //     const { data } = useFrappeGetDoc(
        //         'Leads', `${leadID}`
        //     );
        //     if(data){
        //         dispatch(setLocation(data?.confirmed_location)) 
        //         dispatch(setCR(data?.complementary_table[0].cr)) 
        //         dispatch(setMR(data?.complementary_table[0].mr)) 
        //         dispatch(setMRandCR(data?.complementary_table[0].mr_and_cr)) 

        //         console.log("datas = ", data?.complementary_table[0].mr_and_cr);
        //     }

        // });

        // console.log("customerData = ", leadsIdArray);
    }


    return (
        <Component />
    )
}
