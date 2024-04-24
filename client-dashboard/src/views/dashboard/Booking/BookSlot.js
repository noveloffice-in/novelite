import React from 'react'
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
import { TextField } from '@mui/material';


export default function BookSlot() {

    const roomName = useSelector((state) => state.bookingsSliceReducer.roomName);
    const roomType = useSelector((state) => state.bookingsSliceReducer.roomCategory);
    const location = useSelector((state) => state.bookingsSliceReducer.bookingLocation);
    const accounType = useSelector((state) => state.novelprofileReducer.account_type);
    const companyName = useSelector((state) => state.novelprofileReducer.companyName);
    const confirmed_location = useSelector((state) => state.novelprofileReducer.location);
    const leadsID = useSelector((state) => state.novelprofileReducer.leadsID);

    const [value, setValue] = React.useState(() => [
        dayjs('2022-04-17T15:30'),
        dayjs('2022-04-17T18:30'),
    ]);

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

    return (
        <PageContainer title="Book Slots - Novel Office">
            <Breadcrumb title="Booking Slots" items={BCrumb} />
            <Stack justifyContent='center' alignItems='center' width='100%'>
                {/* <Box width='500px'> */}
                    <Stack width='100%' justifyContent='center' alignItems='center'>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="Plesase select date" />
                            </DemoContainer>
                        </LocalizationProvider>


                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker label="Basic time picker" />
                            </DemoContainer>
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker label="Basic time picker" />
                            </DemoContainer>
                        </LocalizationProvider>



                        <Box sx={{ mt: 2 }} >
                            <TextField
                                id="outlined-multiline-static"
                                label="Ticket Description"
                                multiline
                                rows={2}
                                style={{ maxWidth: '100%' }}
                                name="description"
                            // value={ticketData.description}
                            // onChange={handleTicketDataChange}
                            />
                        </Box>
                    </Stack>
                {/* </Box> */}
            </Stack>
        </PageContainer>
    )
}
