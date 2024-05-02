import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Typography,
    TableBody,
    Stack,
    Tooltip,
    TextField,
    Pagination,
    TableContainer,
    Button,
    CircularProgress,
    IconButton,
    TableFooter,
    TablePagination,
} from '@mui/material';
import { IconTrash } from '@tabler/icons';
import axios from 'axios';
import BlockIcon from '@mui/icons-material/Block';

//Dialouge
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PassForm from './PassForm';
import { useFrappeGetDoc, useFrappeGetDocList } from 'frappe-react-sdk';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

//Toastify 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VisitorPassTable() {
    const dispatch = useDispatch();
    const [start, setStart] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const companyName = useSelector((state) => state.novelprofileReducer.companyName);
    //Pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    //Getting leads and setting only lead Ids in store
    const getLeadID = () => {
        const { data: customerData } = useFrappeGetDoc(
            'Customer', `${companyName}`
        );
        return customerData?.leads.map((lead) => { return { "location": lead.confirmed_location, "leadId": lead.leads } });
    }

    const billingLocation = getLeadID();

    //------------------------------------------------------Dialog-----------------------------------------------//
    //Dialouge component
    const [open1, setOpen1] = useState(false);

    //Dialog
    const handleClickOpen = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    //------------------------------------------------------Confirm Dialog-----------------------------------------------//
    //Confirm Dialog 
    const [open, setOpen] = useState(false);
    const [visitorId, setVisitorId] = useState('');

    const handleClickListItem = (id) => {
        setVisitorId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //------------------------------------------------------Table Data-----------------------------------------------//
    const { data, mutate, isLoading } = useFrappeGetDocList('Visitor Parking Pass', {
        fields: ['name', 'visitor_name', 'vehicle_type', 'visit_location', 'visitor_email', 'vehicle_no', 'visit_date', 'visit_time'],
        filters: [['customer', '=', companyName]],
        limit_start: start,
        orderBy: {
            field: 'creation',
            order: 'desc',
        },
    })

    //-----------------------------------------------------------Pagination--------------------------------------------------//

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tickets?.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Function to check if cancel button should be disabled
    const isCancelDisabled = (visitDate, visitTime) => {
        const currentDate = new Date();
        const [year, month, day] = visitDate.split('-').map(Number);
        const [time, period] = visitTime.split(' ');

        let [hours, minutes] = time.split(':').map(Number);
        if (period === 'PM' && hours !== 12) hours += 12;
        const visitDateTime = new Date(year, month - 1, day, hours, minutes);

        return visitDateTime < currentDate;
    };

    //-----------------------------------------------------------Search query--------------------------------------------------//
    const filteredData = data?.filter((element) =>
        element.visitor_name?.toLowerCase().includes(searchQuery?.toLowerCase())
    );

    if (data) {
        return (
            <Box mt={4}>
                {/* ---------------------------------------No Data---------------------------------- */}
                {
                    data.length === 0 && (<Stack alignItems='center' justifyContent='center' p={4}>
                        <Typography variant='h4' pb={2}>There are no Records to show</Typography>
                        <Box>
                            <Button variant="contained" onClick={handleClickOpen}>
                                Book parking pass
                            </Button>
                        </Box>
                    </Stack>)
                }

                {/* ---------------------------------------if Data starts---------------------------------- */}
                {data.length !== 0 && <Box display="flex" justifyContent={'space-between'} alignItems={'center'}>
                    <Box>
                        <Button variant="contained" onClick={handleClickOpen}>
                            Book parking pass
                        </Button>
                    </Box>
                    <Box sx={{ maxWidth: '100px', ml: 'auto' }}>
                        <TextField
                            size="small"
                            label="Search"
                            fullWidth
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Box>
                </Box>}
                {data.length !== 0 && (<TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6">Visitor Name</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Visit Date</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Visit Time</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Visitor Vehicle No</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Visitor Location</Typography>
                                </TableCell>
                                <TableCell align='center'>
                                    <Typography variant="h6">Action</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {filteredData && <TableBody>
                            {filteredData.map((element) => (
                                <TableRow key={element.name} hover>
                                    <TableCell component={Link} to={`/visit_details/${element.name}`} >
                                        <Typography variant="h6">{element.visitor_name}</Typography>
                                    </TableCell>
                                    <TableCell component={Link} to={`/visit_details/${element.name}`} >
                                        <Box>
                                            <Typography variant="h6" fontWeight="500" noWrap>
                                                {element.visit_date}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                noWrap
                                                sx={{ maxWidth: '250px' }}
                                                variant="subtitle2"
                                                fontWeight="400"
                                            >
                                                {element.visit_time}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell component={Link} to={`/visit_details/${element.name}`} >
                                        <Stack direction="row" gap="10px" alignItems="center">
                                            <Typography variant="h6">{element.visit_time}</Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell component={Link} to={`/visit_details/${element.name}`} >
                                        <Typography>{element.vehicle_no}</Typography>
                                    </TableCell>
                                    <TableCell component={Link} to={`/visit_details/${element.name}`} >
                                        <Typography>{element.visit_location}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title="Cancel Booking">
                                            <Button color="error" onClick={() => handleClickListItem(element.name)} disabled={isCancelDisabled(element.visit_date, element.visit_time)}>
                                                {isCancelDisabled(element.visit_date, element.visit_time) ? <BlockIcon /> : 'Cancel'}
                                            </Button>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>}
                        {/* ---------------------------------------Pagination---------------------------------  */}
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={6}
                                    count={data?.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputprops: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>)}

                {/* ---------------------------------------Dialog Start---------------------------------- */}
                <Dialog
                    fullWidth
                    maxWidth='sm'
                    open={open1}
                    onClose={handleClose1}
                >
                    <DialogTitle>
                        <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
                            <Typography variant='h5'>Book a pass</Typography>
                            <IconButton onClick={handleClose1} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                        </Stack>
                    </DialogTitle>
                    <DialogContent>
                        {billingLocation && <PassForm setOpen1={setOpen1} mutate={mutate} billingLocation={billingLocation} />}
                    </DialogContent>
                    <DialogActions>
                        {/* <Button onClick={handleClose1}>Close</Button> */}
                    </DialogActions>
                </Dialog>
                <ConfirmationDialogRaw
                    id="ringtone-menu"
                    keepMounted
                    open={open}
                    mutate={mutate}
                    onClose={handleClose}
                    visitorId={visitorId}
                />
            </Box>
        );
    }
};

//->  ------------------------------------------------Dialog component--------------------------------------------------
import PropTypes from 'prop-types';

function ConfirmationDialogRaw(props) {
    const { onClose, visitorId, open, mutate, ...other } = props;
    const radioGroupRef = React.useRef(null);
    const [showLoading, setShowLoading] = React.useState(false);

    const notifySuccess = (msg) => toast.success(msg, { toastId: "success" });
    const notifyError = (msg) => toast.error(msg, { toastId: "error" });

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        setShowLoading(true);

        if (visitorId) {
            axios.post('/api/method/novelite.api.api.removeDataFromLeadsAndVisitorParking', { vps_id: visitorId })
                .then((res) => {
                    console.log(res);
                    notifySuccess("Booking Cancelled succesfully");
                    setTimeout(() => {
                        onClose();
                        mutate();
                        setShowLoading(false);
                    }, 1000);
                })
                .catch((err) => {
                    notifyError(err.message);
                    setShowLoading(false);
                    console.log(err);
                })
        }
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            TransitionProps={{ onEntering: handleEntering }}
            open={open}
            {...other}
        >
            <DialogTitle>Cancel Visitor parking pass?</DialogTitle>
            <DialogContent dividers>
                Do you want to cancel Visitor parking pass?
            </DialogContent>
            <DialogActions>
                {!showLoading && <Button autoFocus onClick={handleCancel}>
                    Cancel
                </Button>}
                <Button onClick={handleOk} disabled={showLoading}>{showLoading ? <CircularProgress color="inherit" size={24} /> : "Ok"}</Button>
            </DialogActions>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Dialog>
    );
}

ConfirmationDialogRaw.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    visitorId: PropTypes.string.isRequired,
};

{/* ---------------------------------------Main Component Ends------------------------------------ */ }
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from '@emotion/react';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}
