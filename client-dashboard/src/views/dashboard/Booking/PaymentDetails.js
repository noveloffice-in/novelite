import React from 'react'
import { Box, Stack } from '@mui/system';
import { Typography } from '@mui/material';

export default function PaymentDetails({price, selectedSlots}) {

    price = price / 2;
    let totalPrice = price * selectedSlots?.length;
    let gst = totalPrice * (18 / 100);
    let slots = selectedSlots.map((slot) => slot.split(','));

    return (
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
                        slots?.map((time, index) => {
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
                    <hr style={{ width: "200px" }} />
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
    )
}
