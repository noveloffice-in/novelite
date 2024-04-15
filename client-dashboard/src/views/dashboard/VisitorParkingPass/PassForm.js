import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, DialogTitle, Divider, Button, CircularProgress } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useSelector } from 'react-redux';
import axios from 'axios';
//Toastify 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Date 
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateField } from '@mui/x-date-pickers/DateField';
//Time
import { TimeField } from '@mui/x-date-pickers/TimeField';

export default function PassForm({ billingLocation, setOpen1, mutate }) {
    const customerName = useSelector((state) => state.novelprofileReducer.fullName);
    const customerEmailId = useSelector((state) => state.novelprofileReducer.userEmail);
    const [userData, setUserData] = useState({
        customer: customerName,
        customerEmail: customerEmailId,
        visitorName: '',
        vehicleNumber: '',
        vehicleType: '',
        visitorEmail: '',
        visitLocation: '',
        billingLead: billingLocation.length > 0 ? billingLocation[0].leadId : '',
        billingLoc: billingLocation.length > 0 ? billingLocation[0].location : '',
        visitingDate: dayjs(),
        visitingTime: dayjs()
    });
    const [showLoading, setShowLoading] = useState(false);

    const allLocations = [
        { location: 'Novel Office WorkHub - Whitefield' },
        { location: 'Novel Office Brigade' },
        { location: 'Novel Tech Park - Kudlu Gate' },
        { location: 'Novel Office Brigade - Whitefield' },
        { location: 'Novel Office Central - MG Road' },
        { location: 'Novel Business Park - Adugodi' },
        { location: 'Novel Office Marathahalli' },
        { location: 'Novel Office Queens - Queens Road' }
    ];

    const vehicleTypes = [
        { type: "Car" },
        { type: "Bike" }
    ]

    const notifySuccess = (msg) => toast.success(msg, { toastId: "success" });
    const notifyError = (msg) => toast.error(msg, { toastId: "error" });
    const notifyWarn = (msg) => toast.warn(msg, { toastId: "warn" });

    const handleBillingLocation = (element) => {
        setUserData(prev => ({
            ...prev,
            billingLead: element.leadId,
            billingLoc: element.location
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleVisitLocationChange = (e) => {
        const { value } = e.target;
        setUserData(prev => ({
            ...prev,
            visitLocation: value
        }));
    };

    const handleDateChange = (newValue) => {
        const date = new Date(newValue);
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        setUserData(prev => ({
            ...prev,
            visitingDate: formattedDate
        }));
    };

    const handleTimeChange = (newValue) => {
        const date = new Date(newValue);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedTime = `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
        setUserData(prev => ({
            ...prev,
            visitingTime: formattedTime
        }));
    };

    const handleSubmit = () => {
        setShowLoading(true);
        const { customer, customerEmail, visitorName, vehicleNumber, vehicleType, visitorEmail, visitLocation, billingLead, billingLoc, visitingDate, visitingTime } = userData;

        if (!(customer || customerEmail || visitorName || vehicleNumber || vehicleType || visitorEmail || visitLocation || billingLead || billingLoc || visitingDate || visitingTime)) {
            notifyWarn("Please Fill all the details");
            setShowLoading(false);
        } else {
            axios.post('/api/method/novelite.api.api.addDataToleadsAndVisitorParking', userData)
                .then((res) => {
                    console.log(res);
                    notifySuccess("Booking succesfull");
                    setTimeout(() => {
                        setShowLoading(false);
                        setOpen1(false);
                        mutate();
                    }, 1000);
                })
                .catch((err) => {
                    notifyError(err.message);
                    setShowLoading(false);
                    console.log(err);
                })
        }
    }

    return (
        <Box>
            <Box noValidate component="form" sx={{ display: 'flex', flexDirection: 'column', m: 'auto', width: '90%' }}>
                <Box>
                    <FormControl fullWidth variant="standard">
                        <InputLabel required id="demo-simple-select-helper-label">Billing Location</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={billingLocation.length > 0 ? billingLocation[0] : ''}
                            label="Billing Location"
                            onChange={(e) => handleBillingLocation(e.target.value)}
                            disabled={billingLocation.length === 1}
                        >
                            {billingLocation.map((element, index) => (
                                <MenuItem key={index} value={element}>{element.location}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField label="Your Email" variant="standard" required style={{ width: '100%', marginTop: '8px' }} name="customerEmail" value={userData.customerEmail} onChange={handleInputChange} />
                </Box>
                <Divider />
                <DialogTitle sx={{ ml: "-2.2em", mb: "-1rem" }}>Visitor Details</DialogTitle>
                <Box sx={{ display: 'flex', flexDirection: { xs: "column", md: "row", ls: "row" }, gap: 2 }}>
                    <Box >
                        <TextField label="Visitor Name" variant="standard" value={userData.visitorName} onChange={handleInputChange} required style={{ width: '100%', marginTop: '16px' }} name="visitorName" />
                        <TextField label="Vehicle Number" variant="standard" value={userData.vehicleNumber} onChange={handleInputChange} required style={{ width: '100%', marginTop: '16px' }} name="vehicleNumber" />
                    </Box>
                    <Box >
                        <TextField label="Visitor Email" variant="standard" value={userData.visitorEmail} onChange={handleInputChange} required style={{ width: '100%', marginTop: '16px' }} name="visitorEmail" />
                        <FormControl variant="standard" fullWidth sx={{ mt: 2 }} >
                            <InputLabel id="visit-location-label">Visit Location</InputLabel>
                            <Select
                                labelId="visit-location-label"
                                id="visit-location-select"
                                value={userData.visitLocation}
                                label="Visit Location"
                                onChange={handleVisitLocationChange}
                            >
                                {allLocations.map((element) => (
                                    <MenuItem key={element.location} value={element.location}>{element.location}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <FormControl variant="standard" fullWidth sx={{ mt: 2 }} >
                    <InputLabel id="vehicle-type-label">Vehicle Type</InputLabel>
                    <Select
                        labelId="vehicle-type-label"
                        id="vehicle-type-select"
                        value={userData.vehicleType}
                        label="Vehicle Type"
                        name="vehicleType"
                        onChange={handleInputChange}
                    >
                        {vehicleTypes.map((element) => (
                            <MenuItem key={element.type} value={element.type}>{element.type}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ display: 'flex', flexDirection: { xs: "column", md: "row", ls: "row" }, justifyContent: 'space-between', gap: 2, mt: 2 }}>
                    <Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
                                <TimeField
                                    label="Format with meridiem"
                                    defaultValue={userData.visitingDate}
                                    format="hh:mm a"
                                    onChange={(value) => { handleTimeChange(value.$d) }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                    <Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateField', 'DateField']}>
                                <DateField
                                    label="Dash separator"
                                    defaultValue={userData.visitingDate}
                                    format="DD-MM-YYYY"
                                    onChange={(newValue) => handleDateChange(newValue.$d)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                </Box>
                <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit} disabled={showLoading}>
                    {showLoading ? <CircularProgress color="inherit" size={26} /> : "Submit"}
                </Button>
            </Box>
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
        </Box>
    );
}
