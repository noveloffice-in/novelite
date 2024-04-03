import { Box } from '@mui/system'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React from 'react';
import { DialogTitle, Divider, TextField } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';


export default function PassForm() {
    const [location, setLocation] = React.useState('');
    const [billingLocation, setBillingLocation] = React.useState('');
    const [userData, setUserData] = React.useState({
        visitorName: '',
        vehicleNumber: '',
        visitorEmail: '',
        bilLoc: ''
    });

    const allLocations = [{ location: 'NTP' }, { location: 'NBP' }, { location: 'NOW' }, { location: 'NOB' }];

    const handleChange = (event) => {
        setLocation(event.target.value);
    };
    return (
        <Box>
            <Box noValidate
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: 'auto',
                    width: '90%',
                }}>
                <Box>
                    <FormControl fullWidth variant="standard">
                        <InputLabel id="demo-simple-select-helper-label">Billing Location</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={billingLocation}
                            label="Billing Location"
                            onChange={(e) => { setBillingLocation(e.target.value) }}
                        >
                            <MenuItem value='NTP'>NTP</MenuItem>
                            <MenuItem value='NOM'>NOM</MenuItem>
                            <MenuItem value='NBP'>NBP</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField label="Your Email" variant="standard" required style={{ width: '100%', marginTop: '8px' }} name="visitorEmail" />
                </Box>
                <Divider />
                <DialogTitle sx={{ ml: "-2.2em", mb: "-1rem" }}>Visitor Details</DialogTitle>
                <Box sx={{ display: 'flex', flexDirection: { xs: "column", md: "row", ls: "row" }, gap: 2 }}>
                    <Box >
                        <TextField label="Visitor Name" variant="standard" value={setUserData.visitorName} onChange={() => { setUserData((prev) => { }) }} required style={{ width: '100%', marginTop: '16px' }} name="visitorName" />
                        <TextField label="Vehicle Number" variant="standard" value={setUserData.vehicleNumber} onChange={() => { setUserData((prev) => { }) }} required style={{ width: '100%', marginTop: '16px' }} name="vehicleNumber" />
                    </Box>
                    <Box >
                        <TextField label="Visitor Email" variant="standard" value={setUserData.visitorEmail} onChange={() => { setUserData((prev) => { }) }} required style={{ width: '100%', marginTop: '16px' }} name="visitorEmail" />
                        <FormControl variant="standard" fullWidth sx={{ mt: 2 }} >
                            <InputLabel id="demo-simple-select-standard-label">Visit Location</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={location}
                                label="Visit Location"
                                onChange={handleChange}
                            >
                                {allLocations.map((element) => {
                                    return (
                                        <MenuItem key={element.location} value={element.location}> {element.location} </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: "column", md: "row", ls: "row" }, justifyContent:'space-between', gap: 2, mt: 2 }}>
                    <Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker label="Basic time picker" />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                    <Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="Basic date picker" />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
