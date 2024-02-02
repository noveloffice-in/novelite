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

//For Accordion
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';


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

    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };


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

    //-----------------------------------------------------------Accordion---------------------------------------------------------//
    const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&::before': {
            display: 'none',
        },
    }));

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
            {...props}
        />
    ))(({ theme }) => ({
        backgroundColor:
            theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, .05)'
                : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
        },
    }));

    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        padding: theme.spacing(2),
        borderTop: '1px solid rgba(0, 0, 0, .125)',
    }));

    function CustomizedAccordions() {
        const [expanded, setExpanded] = React.useState('panel1');

        const handleChange = (panel) => (event, newExpanded) => {
            setExpanded(newExpanded ? panel : false);
        };
    }
    //-----------------------------------------------------------END---------------------------------------------------------//
    return (
        <PageContainer title="Payment Summary - Novel Office">
            <Breadcrumb title="Payment Summary" items={BCrumb} />

            <Box my={3}>
                <ChildCard>
                    <PaymentDetails price={price} selectedSlots={selectedSlots} />
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
            {/* //-----------------------------------------------------------Accordion---------------------------------------------------------// */}
            <Box>
                <ChildCard>
                    <div>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography>Collapsible Group Item #1</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                                    sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                                <Typography>Collapsible Group Item #2</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                                    sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                                <Typography>Collapsible Group Item #3</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                                    sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </ChildCard>
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
