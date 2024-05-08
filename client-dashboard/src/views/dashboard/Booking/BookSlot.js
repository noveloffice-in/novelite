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

    // Helper function to convert time to minutes for comparison
    const convertTimeToMinutes = (time) => {
        if (fromTime && toTime) {
            const [hourStr, minuteStr, ampm] = time.split(/:| /);
            let hours = parseInt(hourStr, 10);
            const minutes = parseInt(minuteStr, 10);
            if (ampm === 'PM' && hours !== 12) {
                hours += 12;
            } else if (ampm === 'AM' && hours === 12) {
                hours = 0;
            }
            return hours * 60 + minutes;
        }
    };

    // Time Change
    const handleTimeChange = (newValue, change) => {
        const date = new Date(newValue);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedTime = `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;

        // Determine the source of change (from or to)
        const sourceTime = change === 'from' ? fromTime : toTime;
        const targetTime = change === 'from' ? formattedTime : fromTime;

        const sourceTimeInMinutes = convertTimeToMinutes(sourceTime);
        const targetTimeInMinutes = convertTimeToMinutes(targetTime);

        // Check if target time is greater than source time
        if (targetTimeInMinutes > sourceTimeInMinutes) {
            setDisableBtn(false);
            change === 'from' ? setFromTime(formattedTime) : setToTime(formattedTime);
        } else {
            // Revert to previous value or set a default value
            change === 'from' ? setFromTime(sourceTime) : setToTime(sourceTime);
            setDisableBtn(true);
            notifyWarn(change === 'from' ? 'From time must be less than to time' : 'To time must be greater than from time');
        }
    };


    //Submit
    const { createDoc, loading } = useFrappeCreateDoc();
    const handleSubmit = (e) => {s
        e.preventDefault();
        setDisableBtn(true);

        let form = new FormData(e.target);
        let formObj = Object.fromEntries(form.entries());

        // Check if toTime is lesser or equal to fromTime
        // const fromTimeMinutes = dayjs(fromTime, 'hh:mm A').hour() * 60 + dayjs(fromTime, 'hh:mm A').minute();
        // const toTimeMinutes = dayjs(toTime, 'hh:mm A').hour() * 60 + dayjs(toTime, 'hh:mm A').minute();

        // if (toTimeMinutes <= fromTimeMinutes) {
        //     notifyWarn('To time must be greater than from time.');
        //     setDisableBtn(false);
        //     return;
        // }
        
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
        
        // console.log('toTimeMinutes = ', toTimeMinutes);
        // console.log('fromTimeMinutes = ', fromTimeMinutes);
        // console.log('boookingData = ', boookingData);
        setDisableBtn(false);
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
                                <TimePicker label="From" />
                            </DemoContainer>
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']} >
                                <TimePicker label="To" />
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
