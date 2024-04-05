import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, DialogTitle, Divider } from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function PassForm({ billingLocation }) {
    const [location, setLocation] = useState('');
    const [userData, setUserData] = useState({
        visitorName: '',
        vehicleNumber: '',
        visitorEmail: '',
        billingLead: billingLocation.length > 0 ? billingLocation[0].leadId : '',
        billingLoc: billingLocation.length > 0 ? billingLocation[0].location : ''
    });

    const allLocations = [{ location: 'NTP' }, { location: 'NBP' }, { location: 'NOW' }, { location: 'NOB' }];

    console.log("User Data = ", userData);
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

    return (
        <Box>
            <Box noValidate component="form" sx={{ display: 'flex', flexDirection: 'column', m: 'auto', width: '90%' }}>
                <Box>
                    <FormControl fullWidth variant="standard">
                        <InputLabel id="demo-simple-select-helper-label">Billing Location</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            // value={userData.billingLoc}
                            label="Billing Location"
                            onChange={(e) => handleBillingLocation(e.target.value)}
                        >
                            {billingLocation.map((element, index) => (
                                <MenuItem key={index} value={element}>{element.location}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField label="Your Email" variant="standard" required style={{ width: '100%', marginTop: '8px' }} name="visitorEmail" value={userData.visitorEmail} onChange={handleInputChange} />
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
                            <InputLabel id="demo-simple-select-standard-label">Visit Location</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={location}
                                label="Visit Location"
                                onChange={(e) => setLocation(e.target.value)}
                            >
                                {allLocations.map((element) => (
                                    <MenuItem key={element.location} value={element.location}>{element.location}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: "column", md: "row", ls: "row" }, justifyContent: 'space-between', gap: 2, mt: 2 }}>
                    <Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker label="Basic time picker" renderInput={(params) => <TextField {...params} />} />
                        </LocalizationProvider>
                    </Box>
                    <Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Basic date picker" renderInput={(params) => <TextField {...params} />} />
                        </LocalizationProvider>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
