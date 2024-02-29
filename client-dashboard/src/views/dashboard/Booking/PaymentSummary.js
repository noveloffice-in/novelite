import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { Box, Stack } from '@mui/system';
import ChildCard from '../../../components/shared/ChildCard';
import { Button, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PaymentDetails from './PaymentDetails';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

//For Accordion
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { useFrappeDocumentEventListener, useFrappeEventListener, useFrappeGetDocList, useFrappeUpdateDoc } from 'frappe-react-sdk';
import axios from 'axios';
import { setDocTypeId } from '../../../store/apps/bookings/BookingsSlice';

//For Modal
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
};

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
    const date = useSelector((state) => state.bookingsSliceReducer.date);
    const roomName = useSelector((state) => state.bookingsSliceReducer.roomName);
    const roomType = useSelector((state) => state.bookingsSliceReducer.roomCategory);
    const location = useSelector((state) => state.bookingsSliceReducer.bookingLocation);
    const selectedSlots = useSelector((state) => state.bookingsSliceReducer.selectedSlots);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [timeLeft, setTimeLeft] = useState(0);
    const [checkBox, setCheckBox] = useState(false);
    const { updateDoc, error } = useFrappeUpdateDoc();

    //-----------------------------------------------------------BCrumb---------------------------------------------------------//
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
    //-----------------------------------------------------------Getting Booking Data---------------------------------------------------------//
    const { data: bookingData } = useFrappeGetDocList('Room Bookings', {
        fields: ['location', 'booking_timings', 'booking_date', 'name'],
        filters: [['booking_date', '=', date], ['room', '=', roomName]],
        limit_start: 0,
        limit: 2000,
    });

    const handleTodoUpdate = () => {
        console.log('ToDo updated:');
    };

    useFrappeEventListener('todo_update', handleTodoUpdate);

    useEffect(() => {
        // Function to check if two sets are equal
        function areSetsEqual(set1, set2) {
            if (set1.size !== set2.size) return false;
            for (let item of set1) {
                if (!set2.has(item)) return false;
            }
            return true;
        }

        // Convert selectedSlots to a Set for comparison
        const selectedSlotsSet = new Set(selectedSlots);

        // Find the matching object
        const matchingObject = bookingData?.find(item => {
            // Convert booking_timings string into an array and then to a Set
            const timingsSet = new Set(item.booking_timings.split(','));
            // Compare the two sets
            return areSetsEqual(timingsSet, selectedSlotsSet);
        });

        if (matchingObject) {
            let docTypeId = matchingObject.name;
            dispatch(setDocTypeId(docTypeId));
            axios.post('/api/method/novelite.api.api.create_qr_codes', { data: `{"id":"${docTypeId}", "location":"${location}", "booking_date":"${date}", "booking_timings":"${selectedSlots}", "room_type":"${roomType}", "room":"${roomName}"}` })
                .then((res) => {
                    updateDoc('Room Bookings', docTypeId, { qr_code: `data:image/png;base64,${res.data.message}` })
                        .then(() => {
                            console.log("Added QR code to Doc");
                        }).catch((error) => {
                            console.log(error);
                        })
                })
        }

        //* -----For timer------
        // Calculate the end time if not already set, or retrieve it from localStorage
        let endTime = localStorage.getItem('endTime');
        if (!endTime) {
            endTime = new Date().getTime() + 10 * 60 * 1000; // 10 minutes from now
            localStorage.setItem('endTime', endTime);
        }

        // Update timer every second
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = endTime - now;

            if (distance < 0) {
                clearInterval(interval);
                localStorage.removeItem('endTime'); // Clear endTime if the timer is over
                setTimeLeft(0);
            } else {
                setTimeLeft(distance);
            }
        }, 1000);

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, [bookingData, selectedSlots])

    // Format timeLeft into minutes and seconds
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    //-----------------------------------------------------------Accordion---------------------------------------------------------//
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    //-----------------------------------------------------------Modal---------------------------------------------------------//
    const handleOpen = () => setOpen(true)

    const handleClose = () => { setOpen(false); setCheckBox(false) };

    //-----------------------------------------------------------CheckBox---------------------------------------------------------//
    const handleCheckBox = (e) => setCheckBox(e.target.checked)

    const handleConfirmBookings = () => {
        console.log(checkBox);
    }

    //-----------------------------------------------------------END---------------------------------------------------------//
    return (
        <PageContainer title="Payment Summary - Novel Office">
            <Breadcrumb title="Payment Summary" items={BCrumb} />
            <Box bgcolor={'warning' + '.light'} textAlign="center">
                <Stack justifyContent='center' alignItems='center' flexDirection='row'>
                    <Box color={'warning' + '.main'}>
                        <WarningAmberOutlinedIcon sx={{ marginRight: "0.5rem", marginBottom: "-0.4rem" }} />
                    </Box>
                    <Typography
                        color={'warning' + '.main'}
                        m={1}
                        variant="h5"
                        fontWeight={600}
                    >
                        Selected Slots will be blocked for {minutes.toLocaleString('en-US', { minimumIntegerDigits: 2 })}:{seconds.toLocaleString('en-US', { minimumIntegerDigits: 2 })} mins
                    </Typography>
                </Stack>
            </Box>
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
                                <Button variant="contained" onClick={handleOpen}>
                                    Add to Invoice
                                </Button>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                                <Typography>Pay now (Coming Soon)</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography mb={2}>
                                    Comming Soon
                                </Typography>
                                <Button variant="contained" disabled>
                                    Pay Now
                                </Button>
                            </AccordionDetails>
                        </Accordion>

                    </Stack>
                </ChildCard>
                {/* ---------------------------------------Modal Start---------------------------------  */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography mb={2}>
                            1)&nbsp; Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
                            2)&nbsp; Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. <br />
                            3)&nbsp; Suspendisse malesuada lacus ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            <FormControlLabel required control={<Checkbox onChange={(e) => { handleCheckBox(e) }} />} label="I agree to terms and conditions" />
                        </Typography>
                        <Button variant="contained" onClick={handleConfirmBookings} disabled={!checkBox}>
                            Confirm Bookings
                        </Button>
                    </Box>
                </Modal>
                {/* ---------------------------------------Modal Ends---------------------------------  */}
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
