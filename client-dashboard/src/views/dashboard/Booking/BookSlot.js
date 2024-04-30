import React, { useState } from 'react'
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { useSelector } from 'react-redux';
import { Box, Stack } from '@mui/system';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

//Date
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//Time
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { Button, CircularProgress, TextField } from '@mui/material';
import ChildCard from '../../../components/shared/ChildCard';
import { useFrappeCreateDoc } from 'frappe-react-sdk';

//Toastify 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';


export default function BookSlot() {

    const roomName = useSelector((state) => state.bookingsSliceReducer.roomName);
    const roomType = useSelector((state) => state.bookingsSliceReducer.roomCategory);
    const location = useSelector((state) => state.bookingsSliceReducer.bookingLocation);
    const userEmail = useSelector((state) => state.novelprofileReducer.userEmail);
    const companyName = useSelector((state) => state.novelprofileReducer.companyName);
    const accounType = useSelector((state) => state.novelprofileReducer.account_type);
    const leadsID = useSelector((state) => state.novelprofileReducer.leadsID);
    const confirmed_location = useSelector((state) => state.novelprofileReducer.location);

    const BCrumb = [
        {
            to: '/dashboard',
            title: 'Home',
        },
        {
            to: '/location',
            title: 'Location',
        },
        {
            to: '/category',
            title: 'Category',
        },
        {
            to: '/bookings',
            title: roomName,
        },
        {
            to: '/bookslot',
            title: 'Book Slots',
        },
    ];

    const [date, setDate] = useState();
    const [fromTime, setFromTime] = useState();
    const [toTime, setToTime] = useState();
    const [disbleBtn, setDisableBtn] = useState(true);
    const navigate = useNavigate();

    //-----------------------------------------------------------Toast functions--------------------------------------------------//
    const notifySuccess = (msg) => toast.success(msg, { toastId: "success" });
    const notifyError = (msg) => toast.error(msg, { toastId: "error" });
    const notifyWarn = (msg) => toast.warn(msg, { toastId: "error" });

    //Date change
    const handleDateChange = (newValue) => {
        const date = new Date(newValue);
        const selectedDate = dayjs(newValue);
        const today = dayjs();

        console.log('selectedDate = ', selectedDate);
        console.log('today = ', today);

        if (selectedDate.isBefore(today, 'day')) {
            notifyWarn('You cannot select a time for a past date.');
            setDate();
            return;
        } else {
            const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
            setDate(formattedDate);
            setDisableBtn(false);
        }
    };

    //Time Change
    const handleTimeChange = (newValue, change) => {
        const date = new Date(newValue);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedTime = `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
        if (change === 'from') {
            setFromTime(formattedTime);
        } else {
            setToTime(formattedTime);
        }
    };

    //Submit
    const { createDoc, loading } = useFrappeCreateDoc();
    const handleSubmit = (e) => {
        e.preventDefault();
        setDisableBtn(true);

        let form = new FormData(e.target);
        let formObj = Object.fromEntries(form.entries());

        const boookingData = {
            customer: companyName,
            location: location,
            room_type: roomType,
            email_cc: userEmail,
            room: roomName,
            booking_date: date,
            from_time: fromTime,
            to_time: toTime,
            description: formObj.description,
        }

        console.log('boookingData = ', boookingData);
        if (date !== '' && fromTime !== '' && toTime !== '') {
            createDoc('Room slots booking', boookingData)
                .then(() => {
                    notifySuccess("Your request was received successfully");
                    setTimeout(() => {
                        navigate('/location');
                    }, 5000);
                }).catch((err) => {
                    console.log("inside catch " + JSON.stringify(err.message));
                    console.err(err.message);
                    notifyError(err);
                })
        } else {
            notifyWarn("Please Fill all the details");
        }

        // console.log(formObj);
        // console.log("Date = ", date);
        // console.log("From time = ", fromTime);
        // console.log("toTime = ", toTime);
    }

    return (
        <PageContainer title="Book Slots - Novel Office">
            <Breadcrumb title="Booking Slots" items={BCrumb} />
            <ChildCard justifyContent='center' alignItems='center' width='100%'>
                <Stack width='100%' justifyContent='center' alignItems='center'>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']} >
                                <DatePicker label="Plesase select date" onChange={(newValue) => { handleDateChange(newValue.$d) }} />
                            </DemoContainer>
                        </LocalizationProvider>


                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']} >
                                <TimePicker label="From" onChange={(newValue) => { handleTimeChange(newValue, 'from') }} />
                            </DemoContainer>
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']} >
                                <TimePicker label="To" onChange={(newValue) => { handleTimeChange(newValue, 'to') }} />
                            </DemoContainer>
                        </LocalizationProvider>

                        <Box >
                            <TextField
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                rows={2}
                                style={{ width: '14.5rem' }}
                                name="description"
                            />
                        </Box>

                        <Button type='submit' variant="contained" disabled={disbleBtn}>
                            {loading ? <CircularProgress color="inherit" size={26} /> : "Submit"}
                        </Button>
                    </form>

                </Stack>
            </ChildCard>
            {/* ---------------------------------------Toast Container Starts------------------------------------ */}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </PageContainer>
    )
}
