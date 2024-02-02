import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { Box, Stack } from '@mui/system';
import ChildCard from '../../../components/shared/ChildCard';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

//QR Code
import QRCode from 'qrcode.react';
import CryptoJS from 'crypto-js';
import PaymentDetails from './PaymentDetails';


const secretKey = 'NovelOffice456';

const encryptData = (data) => {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
};

const decryptData = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};

export default function PaymentSummary() {
    const roomName = useSelector((state) => state.bookingsSliceReducer.roomName);
    const roomType = useSelector((state) => state.bookingsSliceReducer.roomCategory);
    const location = useSelector((state) => state.bookingsSliceReducer.bookingLocation);
    const selectedSlots = useSelector((state) => state.bookingsSliceReducer.selectedSlots);
    let price = useSelector((state) => state.bookingsSliceReducer.price);
    const qrRef = React.useRef();


    // let bookingData = {
    //     roomName: roomName,
    //     roomType: roomType,
    //     location: location,
    //     slots: slots,
    //     grandTotal: totalPrice + gst
    // }

    // let bookingArray = `${roomName}, ${roomType}, ${location}, ${slots}, ${totalPrice + gst}`;

    // const encryptedData = encryptData(bookingArray);
    // bookingData = JSON.stringify(bookingData)


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

    const sendQRCodeToAPI = async () => {

        // Assuming the first child of the div is the canvas
        const canvas = qrRef.current.getElementsByTagName('canvas')[0];
        if (!canvas) return; // Make sure the canvas exists

        const imageData = canvas.toDataURL('image/png');

        // Convert Base64 image to blob
        const response = await fetch(imageData);
        const blob = await response.blob();

        // Use FormData to send the image file
        const formData = new FormData();

        //For printing purpose only
        formData.append('file', blob, 'qrcode.png');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
    }

    // useEffect(() => {
    //     // Ensure qrRef.current is available
    //     if (qrRef.current) {
    //         sendQRCodeToAPI();
    //     }
    // }, []);


    return (
        <PageContainer title="Payment Summary - Novel Office">
            <Breadcrumb title="Payment Summary" items={BCrumb} />

            <Box my={3}>
                <ChildCard>
                    <PaymentDetails price={price} selectedSlots={selectedSlots}/>
                </ChildCard>
                <Stack direction="row" justifyContent="center">
                    <Box ref={qrRef}>
                        {/* <QRCode
                            // value={bookingData}
                            value={encryptedData}
                            size={256}
                            level="H"
                            bgColor="#ffffff"
                            fgColor="#000000"
                        /> */}
                    </Box>
                </Stack>
            </Box>

            <Box>
                <ChildCard>
                    <Stack direction={{ sm: "column", md: "row", lg: "row" }} justifyContent={{ sm: "center", md: "space-between", lg: "space-between" }} mb={2}>
                        <Typography variant="h6" fontWeight={400} mb={2}>
                            Payment Type
                        </Typography>
                        <Stack mb={2}>
                            <Button variant="contained" >
                                Add to Invoice
                            </Button>
                        </Stack>
                        <Stack>
                            <Button variant="contained" >
                                Pay Now
                            </Button>
                        </Stack>
                    </Stack>
                </ChildCard>
            </Box>

            <Stack direction='row' justifyContent="space-between" mt={2}>
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
