import React from 'react'
import { useSelector } from 'react-redux';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { Box, Stack } from '@mui/system';
import ChildCard from '../../../components/shared/ChildCard';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PaymentDetails from './PaymentDetails';

//For Accordion
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

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

//-----------------------------------------------------------Main Function Start---------------------------------------------------------//

export default function PaymentSummary() {

    let price = useSelector((state) => state.bookingsSliceReducer.price);
    const roomName = useSelector((state) => state.bookingsSliceReducer.roomName);
    const roomType = useSelector((state) => state.bookingsSliceReducer.roomCategory);
    const location = useSelector((state) => state.bookingsSliceReducer.bookingLocation);
    const selectedSlots = useSelector((state) => state.bookingsSliceReducer.selectedSlots);

    //-----------------------------------------------------------Accordion---------------------------------------------------------//
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

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

    //-----------------------------------------------------------END---------------------------------------------------------//
    return (
        <PageContainer title="Payment Summary - Novel Office">
            <Breadcrumb title="Payment Summary" items={BCrumb} />

            <Box my={3}>
                <ChildCard>
                    {/* //-----------------------------------------------------------PaymentDetails---------------------------------------------------------// */}
                    <PaymentDetails price={price} selectedSlots={selectedSlots} tittle="Payment Summary" />
                </ChildCard>
            </Box>
            {/* //-----------------------------------------------------------Accordion---------------------------------------------------------// */}
            <Box>
                <ChildCard>
                    <Stack>
                        <Typography variant="h6" fontWeight={400} mb={2}>
                            Payment Type
                        </Typography>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography>Add to invoice</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography mb={2}>
                                    1)&nbsp; Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
                                    2)&nbsp; Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. <br />
                                    3)&nbsp; Suspendisse malesuada lacus ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </Typography>
                                <Button variant="contained" >
                                    Add to Invoice
                                </Button>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                                <Typography>Pay now</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography mb={2}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                                    sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                                <Button variant="contained" >
                                    Pay Now
                                </Button>
                            </AccordionDetails>
                        </Accordion>

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
