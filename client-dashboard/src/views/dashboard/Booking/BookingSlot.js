import React, { useEffect, useState } from 'react'
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import '@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { Card, Divider, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { Button } from '@mui/material';
import ChildCard from '../../../components/shared/ChildCard';
import { Link, useNavigate } from 'react-router-dom';
import { useFrappeCreateDoc, useFrappeGetDoc, useFrappeGetDocList } from 'frappe-react-sdk';
import { useDispatch, useSelector } from 'react-redux';
import Slots from './Slots';
//Toastify 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setSelectedSlotsStore, setDate } from '../../../store/apps/bookings/BookingsSlice';
import { useMemo } from 'react';
import { Stack } from '@mui/system';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function BookingSlot() {

    // const [filterDate, setFilterDate] = useState(`${String(new Date().getDate()).padStart(2, '0')}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${new Date().getFullYear()}`)
    const [filterDate, setFilterDate] = useState(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`)
    const [selectedSlots, setSelectedSlots] = useState([]);
    // const [slotsInterval, setSlotsInterval] = useState(30);
    const [dates, setDates] = useState([]);
    const [dayName, setDayName] = useState('');
    const roomName = useSelector((state) => state.bookingsSliceReducer.roomName);
    const roomType = useSelector((state) => state.bookingsSliceReducer.roomCategory);
    const location = useSelector((state) => state.bookingsSliceReducer.bookingLocation);
    const accounType = useSelector((state) => state.novelprofileReducer.account_type);
    const companyName = useSelector((state) => state.novelprofileReducer.companyName);
    const leadsID = useSelector((state) => state.novelprofileReducer.leadsID);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let slotsInterval = 30;
    let advanceBookingDays = 7;

    //Price Calculation
    let price = useSelector((state) => state.bookingsSliceReducer.price) / 2;
    const totalPrice = price * selectedSlots.length;
    const gst = totalPrice * (18 / 100);
    const grandTotal = totalPrice + gst;

    useEffect(() => {
        const datesArray = [];
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        for (let i = 0; i < advanceBookingDays; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            const formattedDay = `${String(date.getDate()).padStart(2, '0')}-${monthNames[date.getMonth()]}`;
            const dayOfWeek = dayNames[date.getDay()];
            datesArray.push({ date: formattedDate, day: dayOfWeek, formattedDate: formattedDay });
        }
        setDates(datesArray);
        setDayName(datesArray[0].day);
    }, [advanceBookingDays]);

    const notifyWarn = (msg) => toast.warn(msg, { toastId: "warn" });

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
            to: '/bookingslot',
            title: 'Booking Slots',
        },
    ];

    //--------------------------------------------------------Fetch Dynamic Slots------------------------------------------------------//
    let fromTime = '';
    let toTime = '';
    let intervals = [];

    const { data, mutate } = useFrappeGetDocList('Room Bookings', {
        fields: ['name', 'location', 'booking_timings', 'booking_date', 'room', 'qr_code'],
        // filters :[['booking_date', '=', '2024-02-05']],
        filters: [['booking_date', '=', filterDate], ['room', '=', roomName]],
        limit_start: 0,
        limit: 2000,
    });

    // const { data: bookingSettings } = useFrappeGetDoc(
    //     'Room Booking Settings', 'Room Booking Settings'
    // );

    /**
    * ! -----------------------------------------------Delete This later-----------------------------------------------------
    * ? Delete This later 
    * TODO Delete This later 
    * @param data gives only one doc data
    */
    // if(data){
    //     let childArray = [];
    //     childArray = data.forEach((booking)=>{
    //         const { data: allData } = useFrappeGetDoc(
    //             'Room Bookings', `${booking.name}`
    //         );
    //         console.log('allData = ', allData?.booked_timings);
    //     })
    // }
    /** 
     * ! -----------------------------------------------Delete This later-----------------------------------------------------
     */


    if (dates.length !== 0) {
        let slotsDuration = bookingSettings?.availability_of_slots.find((el) => el.day_of_week == dayName);
        fromTime = slotsDuration?.from_time;
        toTime = slotsDuration?.to_time;
        if (toTime === '23:59:59') {
            toTime = '24:00:00';
        }

        //-------------------------- Do not Delete ----------------------------------------------
        // If you want to make interval and advance booking days Dynamic then uncomment the below code 

        // slotsInterval = bookingSettings?.appointment_duration;
        // advanceBookingDays = bookingSettings?.advance_booking_days;

        //-------------------------- Do not Delete ----------------------------------------------
    }

    if (fromTime !== undefined && toTime !== undefined) {

        // Function to convert time string to minutes
        const timeToMinutes = (time) => {
            const [hours, minutes] = time?.split(':')?.map(Number);
            return hours * 60 + minutes;
        };

        // Function to convert minutes back to time string
        const minutesToTime = (minutes) => {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
        };

        // Convert fromTime and toTime to minutes
        const fromTimeInMinutes = timeToMinutes(fromTime);
        const toTimeInMinutes = timeToMinutes(toTime);

        // Calculate the number of intervals
        const difference = toTimeInMinutes - fromTimeInMinutes;
        const numberOfIntervals = Math.floor(difference / slotsInterval);

        // Create an array of intervals
        for (let i = 0; i < numberOfIntervals; i++) {
            const start = fromTimeInMinutes + i * slotsInterval;
            const end = start + slotsInterval;
            intervals.push(`${minutesToTime(start)} - ${minutesToTime(end)}`);
        }

        // console.log('Number of intervals:', numberOfIntervals);
        // console.log('Intervals:', intervals);
    }

    //--------------------------------------------------------Getting Dates------------------------------------------------------//

    const handleDateChange = (selectedDate) => {
        setSelectedSlots([]);
        setFilterDate(selectedDate.date);
        setDayName(selectedDate.day);
    }

    //--------------------------------------------------------Book slots------------------------------------------------------//
    const { createDoc, isCompleted, } = useFrappeCreateDoc();

    const bookSlot = () => {

        let selectedSlotsString = `${selectedSlots}`;
        let leadsString = `${leadsID}`;
        let [day, month, year] = filterDate.split('-');
        // let formattedDate = `${year}-${month}-${day}`;
        let formattedDate = `${day}-${month}-${year}`;

        let bookingData = {
            booking_status: 'Blocked Temporarily',
            location,
            room: roomName,
            price: grandTotal,
            room_type: roomType,
            customer: companyName,
            client_type: accounType,
            booking_date: formattedDate,
            customer_lead_id: leadsString,
            booking_timings: selectedSlotsString,
        }

        if (selectedSlots.length !== 0) {
            createDoc('Room Bookings', bookingData)
                .then(() => {
                    // console.log('Booking created Successfully');
                    dispatch(setSelectedSlotsStore(selectedSlots));
                    dispatch(setDate(formattedDate));
                    setSelectedSlots([]);
                    mutate();
                    navigate("/payment_summary");
                }).catch((err) => {
                    console.log("inside catch " + JSON.stringify(err.message));
                })
        } else {
            notifyWarn('Please Select any slot to continue');
        }
    }

    //-----------------------------------------------------------Formatted Price---------------------------------------------------------//
    function formatPrice(price) {
        // Check if the number has a decimal part
        if (!Number.isInteger(price)) {
            // Format numbers with decimals
            return new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(price);
        } else {
            // Format whole numbers without decimals
            let priceStr = price.toString();
            return priceStr.length > 3 ? priceStr.slice(0, -3) + ',' + priceStr.slice(-3) : priceStr;
        }
    }

    //-----------------------------------------------------------END---------------------------------------------------------//

    return (
        <PageContainer title="Book Slots - Novel Office">
            <Breadcrumb title="Booking Slots" items={BCrumb} />
            {/* <Typography variant='h5' style={{marginBottom:"1rem"}}>
                Please select Date and time:- 
            </Typography>
            <DateTimeRangePicker onChange={onChange} value={value} /> */}
            {/* {
                timeSlots?.images.map((image)=>{
                    return(
                        <img src={image.link_image}/>
                    )
                })
            } */}

            <FormControl sx={{ minWidth: 130, mb: 2, mr: 4 }}>
                <InputLabel id="demo-simple-select-label">Select Date</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filterDate}
                    label='Select Date'
                // onChange={(e) => handleDateChange(e.target.value) }
                >
                    {dates?.map((el) => {
                        return (<MenuItem value={el.date} key={el.date} onClick={() => handleDateChange(el)} >{el.formattedDate}</MenuItem>)
                    })}
                </Select>
            </FormControl>
            {/* //--------------------------------------------------------Slots------------------------------------------------------// */}

            {data && <Slots
                slotsData={data}
                selectedSlots={selectedSlots}
                setSelectedSlots={setSelectedSlots}
                intervals={intervals}
            />}

            {/* //--------------------------------------------------------Proceed------------------------------------------------------// */}
            <Grid item xs={12} lg={6} display="flex" alignItems="stretch" mt={2}>
                <ChildCard title="">
                    <Button variant="contained" color="primary" onClick={bookSlot} >
                        Proceed
                    </Button>
                </ChildCard>
                <ChildCard title="">
                    <Stack>
                        <Typography variant='h4' mb={0.5}>
                            Price : &#x20B9; {formatPrice(totalPrice)}
                        </Typography>
                        <Typography variant='h6' color="primary">
                            (* GST not included)
                        </Typography>
                    </Stack>
                </ChildCard>
            </Grid>

            {/* //--------------------------------------------------------Toast------------------------------------------------------// */}
            <ToastContainer
                position="top-center"
                autoClose={1000}
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
