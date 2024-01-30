import React from 'react'
import { useSelector } from 'react-redux';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { Box, Stack } from '@mui/system';
import ChildCard from '../../../components/shared/ChildCard';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function PaymentSummary() {
    const roomName = useSelector((state) => state.bookingsSliceReducer.roomName);
    const roomType = useSelector((state) => state.bookingsSliceReducer.roomCategory);
    const location = useSelector((state) => state.bookingsSliceReducer.bookingLocation);
    const selectedSlots = useSelector((state) => state.bookingsSliceReducer.selectedSlots);
    let price = useSelector((state) => state.bookingsSliceReducer.price);
    price = price / 2;
    let totalPrice = price * selectedSlots?.length;
    let gst = totalPrice * (18 / 100);
    let slots = selectedSlots.map((slot) => slot.split(','));


    const BCrumb = [
        {
            to: '/dashboard',
            title: 'Home',
        },
        {
            to: '/location',
            title: location,
        },
        {
            to: '/category',
            title: roomType,
        },
        {
            to: '/bookings',
            title: roomName,
        },
        {
            to: '/bookingslot',
            title: 'Booking Slots',
        },
        {
            to: '/payment_summary',
            title: 'Payment Summary',
        },
    ];

    return (
        <PageContainer title="Payment Summary - Novel Office">
            <Breadcrumb title="Booking Slots" items={BCrumb} />

            <Box my={3}>
                <ChildCard>
                    <Box p={2}>
                        <Typography variant="h5" fontWeight={600} mb={3}>
                            Payment Summary
                        </Typography>
                        <Stack direction="row" justifyContent="space-between" mb={3}>
                            <Typography variant="h6" fontWeight={400}>
                                Number of slots
                            </Typography>
                            <Typography variant="h6">{selectedSlots?.length}</Typography>
                        </Stack>
                        {/* Sub Total */}
                        <Stack direction="row" justifyContent="space-between" mb={3}>
                            <Typography variant="h6" fontWeight={400}>
                                Total hours
                            </Typography>
                            <Typography variant="h6">{(selectedSlots?.length / 2)} hr</Typography>
                        </Stack>
                        {/* Discount */}
                        <Stack direction="row" justifyContent="space-between" mb={3}>
                            <Typography variant="h6" fontWeight={400}>
                                Slots textimings
                            </Typography>
                            <Stack justifyContent="space-between">
                                {
                                    slots.map((time, index) => {
                                        return (
                                            <Typography variant="h6" color="primary" key={time + index} mb={0.5}>
                                                {time}
                                            </Typography>
                                        )
                                    })
                                }
                            </Stack>
                        </Stack>
                        {/* Sub Total */}
                        <Stack direction="row" justifyContent="space-between">
                            <Box></Box>
                            <Box>
                                <hr style={{width: "200px"}}/>
                            </Box>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" mb={1} mt={2}>
                            <Typography variant="h6">Total</Typography>
                            <Typography variant="h5" color="success">
                                &#x20B9; {totalPrice}
                            </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" mb={1}>
                            <Typography variant="h6">GST (18%)</Typography>
                            <Typography variant="h5" color="success">
                                &#x20B9; {gst}
                            </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" mb={1}>
                            <Typography variant="h6">Grand Total </Typography>
                            <Typography variant="h5" color="success">
                                &#x20B9; {totalPrice + gst}
                            </Typography>
                        </Stack>
                    </Box>
                </ChildCard>
            </Box>

            <Box>
                <ChildCard>
                    <Stack direction="row" justifyContent="space-between" mb={3}>
                        <Typography variant="h6" fontWeight={400}>
                            Payment Type
                        </Typography>
                        <Button variant="contained" >
                            Add to Invoice
                        </Button>
                        <Button variant="contained" >
                            Pay Now
                        </Button>
                    </Stack>
                </ChildCard>
            </Box>

            <Stack direction={'row'} justifyContent="space-between">
                <Button
                    color="secondary"
                    variant="contained"
                    component={Link} to="/bookingslot"
                >
                    Back
                </Button>
            </Stack>


        </PageContainer>
    )
}
