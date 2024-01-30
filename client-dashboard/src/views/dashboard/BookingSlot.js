import React, { useState } from 'react'
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import '@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { Card, Divider, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker'
import { Button } from '@mui/material';
import ChildCard from '../../components/shared/ChildCard';
import ParentCard from '../../components/shared/ParentCard';
import { Link } from 'react-router-dom';

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
    // const [value, onChange] = useState([new Date(), new Date()]);
    const [value, setValue] = useState(new Date());
    const [value2, setValue2] = useState(new Date());

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
            to: '/bookings',
            title: 'Bookings',
        },
        {
            to: '/bookingslot',
            title: 'Booking Slots',
        },
    ];

    return (
        <PageContainer title="Book Slots">
            <Breadcrumb title="Booking Slots" items={BCrumb} />
            {/* <Typography variant='h5' style={{marginBottom:"1rem"}}>
                Please select Date and time:- 
            </Typography>
            <DateTimeRangePicker onChange={onChange} value={value} /> */}
            <ParentCard title="Please select Date and time ">
                <Grid container spacing={4}>
                    {/* ------------------------------------------------------------------- */}
                    {/* Basic */}
                    {/* ------------------------------------------------------------------- */}
                    <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
                        <ChildCard title="From">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <MobileDateTimePicker
                                    placeholder="Start date"
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(inputProps) => (
                                        <CustomTextField
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            inputProps={{ 'aria-label': 'basic date picker' }}
                                            {...inputProps}
                                        />
                                    )}
                                    value={value}
                                />
                            </LocalizationProvider>
                        </ChildCard>
                    </Grid>
                    {/* ------------------------------------------------------------------- */}
                    {/* Basic */}
                    {/* ------------------------------------------------------------------- */}
                    <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
                        <ChildCard title="To">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <MobileDateTimePicker
                                    placeholder="End date"
                                    onChange={(newValue) => {
                                        setValue2(newValue);
                                    }}
                                    renderInput={(inputProps) => (
                                        <CustomTextField
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            inputProps={{ 'aria-label': 'basic date picker' }}
                                            {...inputProps}
                                        />
                                    )}
                                    value2={value2}
                                />
                            </LocalizationProvider>
                        </ChildCard>
                    </Grid>
                    <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
                        <ChildCard title="Check for availability and submit">
                            <Button variant="contained" color="primary" component={Link} to="/dashboards/checkout">
                                Check / Submit
                            </Button>
                        </ChildCard>
                    </Grid>
                </Grid>
            </ParentCard>
        </PageContainer>
    )
}
