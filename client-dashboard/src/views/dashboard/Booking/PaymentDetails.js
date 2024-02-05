import React from 'react'
import { Box, Stack } from '@mui/system';
import { Typography } from '@mui/material';

export default function PaymentDetails({ price, selectedSlots, tittle }) {

    price = price / 2;
    const totalPrice = price * selectedSlots?.length;
    const gst = totalPrice * (18 / 100);
    const slots = selectedSlots.map((slot) => slot.split(','));

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
        <Box p={2}>
            <Typography variant="h5" fontWeight={600} mb={3}>
                {tittle}
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
            <hr />
            <Stack direction="row" justifyContent="space-between" mb={1} mt={2}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h5" color="success">
                    &#x20B9; {formatPrice(totalPrice)}
                </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" mb={1}>
                <Typography variant="h6">GST (18%)</Typography>
                <Typography variant="h5" color="success">
                    &#x20B9; {formatPrice(gst)}
                </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" mb={1}>
                <Typography variant="h6">Grand Total </Typography>
                <Typography variant="h5" color="success">
                    &#x20B9; {formatPrice(totalPrice + gst)}
                </Typography>
            </Stack>
        </Box>
    )
}
