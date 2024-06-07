import React, { useEffect, useState } from 'react'
import PageContainer from '../../../components/container/PageContainer'
import { Button, FormControlLabel, Grid, TextField } from '@mui/material'
import Banner from './Banner'
import { useSelector } from 'react-redux';
import { useFrappeGetDoc, useFrappePostCall } from 'frappe-react-sdk';
import axios from 'axios';

//Table 
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
    Typography,
    TableHead,
    Chip,
    Box,
    Table,
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
    TableFooter,
    IconButton,
    Paper,
    TableContainer,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Link,
} from '@mui/material';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Checkbox from '@mui/material/Checkbox';

//Dialouge
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

//Toastify 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Actions icon
import EditIcon from '@mui/icons-material/Edit';
import PersonOffIcon from '@mui/icons-material/PersonOff';

//Tooptip icon
import HelpIcon from '@mui/icons-material/Help';
import { styled } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

//Custom tooltip
const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 300,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

export default function UsersList() {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [usersList, setUsersList] = useState([]);
    const [pending, setPending] = useState(true);
    const [permissionChange, setPermissionChange] = useState(false);
    const userEmail = useSelector((state) => state.novelprofileReducer.userEmail);
    const companyName = useSelector((state) => state.novelprofileReducer.companyName);
    const [user, setUser] = useState('');

    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [userType, setUserType] = useState('Non Admin');
    const [permissionList, setPermissionList] = useState([
        { permittedComponent: 'Invoice' },
        { permittedComponent: 'Bookings' },
        { permittedComponent: 'Expansion/Downsize' },
    ]);
    const [openToolTip, setOpenToolTip] = useState(false);

    //-----------------------------------------------------------Toast functions--------------------------------------------------//
    const notifySuccess = (msg) => toast.success(msg, { toastId: "success" });
    const notifyError = (msg) => toast.error(msg, { toastId: "error" });
    const notifyWarn = (msg) => toast.warn(msg, { toastId: "error" });

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    useEffect(() => {
        fetchPermissions();
    }, [])
    //-----------------------------------------------------------Fetching user permission-----------------------------------------------//
    const fetchPermissions = () => {
        axios.post('/api/method/novelite.api.user_permissions.get_user_permissions_by_email', { user_email: userEmail, company_name: companyName })
            .then((res) => {
                setUsersList(res.data.message);
                console.log(res.data.message);
                setPending(false);
            })
    }

    //-----------------------------------------------------------Permission changes-----------------------------------------------//
    const handleCheckboxChange = (event, permission) => {
        const isChecked = event.target.checked;
        setPermissionChange(true);
        if (isChecked) {
            // If checkbox is checked, add permission to selectedPermissions
            setSelectedPermissions(prevPermissions => [...prevPermissions, { permittedComponent: permission }]);
        } else {
            // If checkbox is unchecked, remove permission from selectedPermissions
            setSelectedPermissions(prevPermissions => prevPermissions.filter(item => item.permittedComponent !== permission));
        }
    };

    //Permisson Changes
    const handlePermissionSubmit = () => {
        let sendingData = { user_email: user, permissions_array: selectedPermissions, user_type: userType }
        console.log("selectedPermissions = ", selectedPermissions);
        axios.post('/api/method/novelite.api.user_permissions.update_permissions', sendingData)
            .then((res) => {
                notifySuccess(res.data.message);
                handleClose1();
                fetchPermissions();
                console.log(res.data.message);
            })
    }

    //-----------------------------------------------------------Dialouge-----------------------------------------------//
    //Dialouge component
    const [openEditUser, setOpenEditUser] = useState(false);
    const [openDisableUser, setOpenDisableUser] = useState(false);

    //Dialog for rise ticket
    const handleEdit = (permissionsArr, username, role) => {
        console.log("User name  = ", username);
        setOpenEditUser(true);
        setUser(username);
        setUserType(role);
        setPermissionChange(false);
        setSelectedPermissions(permissionsArr);
    };

    const handleClose1 = () => {
        setOpenEditUser(false);
    };

    //Dialog for diable user
    const disableUserOpen = () => {
        setOpenDisableUser(true);
    };

    const disableUserClose = () => {
        setOpenDisableUser(false);
    };

    //-----------------------------------------------------------Pagination-----------------------------------------------//
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - usersList?.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    //-----------------------------------------------------------Disable User-----------------------------------------------//

    const handleDisableUser = () => {
        disableUserClose();
    }

    return (
        <PageContainer title="User - Novel Office" description="this is User Profile page">
            <Grid>
                <Grid item sm={12}>
                    <Banner />
                </Grid>

                {usersList.length !== 0 ? <Box pt={1}>
                    {!pending && <Paper variant="outlined">
                        <TableContainer>
                            <Table
                                aria-label="User"
                                sx={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h6">Name</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">Email</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">Role</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">Permissions</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">Status</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">Actions</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? usersList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : usersList
                                    )?.map((row) => (
                                        <TableRow key={row.username}>
                                            <TableCell>
                                                <Typography variant="h6">{row.user_name}</Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography variant="h6">{row.user}</Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography variant="h6" color="textSecondary">{row.user_type}</Typography>
                                            </TableCell>

                                            <TableCell>
                                                {
                                                    row.permissions.map((permission, index) => {
                                                        return (
                                                            <>
                                                                <Typography color="textSecondary" variant="h6" fontWeight="400" key={permission.permittedComponent + index}>
                                                                    {permission.permittedComponent}
                                                                </Typography>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </TableCell>

                                            <TableCell>
                                                <Typography variant="h6" color="textSecondary">{row.user_status === "1" ? "Active" : "In-active"}</Typography>
                                            </TableCell>

                                            {row.user_status === "1" &&
                                                <TableCell>
                                                    <Stack flexDirection="row" gap={1}>
                                                        {/* <Button variant='outlined' onClick={() => { handleEdit(row.permissions, row.user, row.user_type) }}>Edit</Button> */}
                                                        <IconButton color="primary" label="Edit" onClick={() => { handleEdit(row.permissions, row.user, row.user_type) }} >
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton color="primary" label="Disable User" onClick={disableUserOpen}>
                                                            <PersonOffIcon />
                                                        </IconButton>
                                                    </Stack>
                                                </TableCell>}

                                            { row.user_status === "0" &&
                                                <TableCell>
                                                    <Button variant="outlined" >Enable User</Button>
                                                </TableCell>
                                            }

                                        </TableRow>
                                    ))}

                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>

                                {usersList.length > 5 && <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                            colSpan={6}
                                            count={usersList?.length}
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
                                </TableFooter>}

                            </Table>

                        </TableContainer>
                    </Paper>}
                </Box> :
                    <Stack pt={4} alignItems='center' justifyContent='center' width='100%'>
                        <Typography variant='p'>No users</Typography>
                    </Stack>
                }

            </Grid>
            {/* ---------------------------------------Edit User Dialog Start---------------------------------- */}
            <Dialog
                fullWidth
                maxWidth='sm'
                open={openEditUser}
                onClose={handleClose1}
            >
                <DialogTitle>
                    <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant='h5'>Edit Permissions</Typography>
                        <IconButton onClick={handleClose1} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </DialogTitle>
                <DialogContent>

                    <Stack flexDirection='row' alignItems='center' justifyContent='space-beetween' gap={2}>
                        <Box maxWidth='8rem' py={1}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={userType}
                                    label="User Type"
                                    onChange={(e) => { setUserType(e.target.value); setPermissionChange(true) }}
                                >
                                    <MenuItem value="Admin">Admin</MenuItem>
                                    <MenuItem value="Non Admin">Non Admin</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <HtmlTooltip placement="bottom" TransitionComponent={Zoom} sx={{ transform: 'translate(-14px, 51px)' }}
                            PopperProps={{
                                disablePortal: true,
                            }}
                            onClose={() => { setOpenToolTip(stubFalse) }}
                            open={openToolTip}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            title={
                                <>
                                    <Typography variant='p'>The administrator will possess complete permissions, including the ability to add users and disable users.</Typography>
                                </>
                            }>
                            <HelpIcon onClick={() => { setOpenToolTip(!openToolTip) }} />
                        </HtmlTooltip>
                    </Stack>

                    {permissionList.map((element) => {
                        const isChecked = selectedPermissions.some((ele) => ele.permittedComponent === element.permittedComponent);
                        return (
                            <FormControlLabel
                                key={element.permittedComponent}
                                control={<Checkbox checked={isChecked} />}
                                label={element.permittedComponent}
                                onChange={(event) => handleCheckboxChange(event, element.permittedComponent)}
                            />
                        );
                    })}

                </DialogContent>
                <DialogActions>
                    <Box display='flex' justifyContent='center' alignItems='center' height='100%' width='100%' p={1}>
                        <Button variant="outlined" onClick={handlePermissionSubmit} disabled={!permissionChange}>
                            Submit
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
            {/* ---------------------------------------Edit User Dialog END---------------------------------- */}

            {/* ---------------------------------------Disable User Dialog Start---------------------------------- */}
            <Dialog
                fullWidth
                maxWidth='sm'
                open={openDisableUser}
                onClose={disableUserClose}
            >
                <DialogTitle>
                    <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant='h5'>Are you sure want to disable user?</Typography>
                        <IconButton onClick={disableUserClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </DialogTitle>
                <DialogContent>

                    <Stack>
                        {/* <Typography variant='p'>Are you sure want to disable user?</Typography> */}
                        <Typography variant='caption' color='grey'>Click <b>YES</b> to disable the user. This will not delete the user permanently. If you want to enable this user click on "Enable User" button. </Typography>
                    </Stack>

                </DialogContent>
                <DialogActions>
                    <Box display='flex' justifyContent='center' alignItems='center' gap={2} height='100%' width='100%' p={1}>
                        <Button variant="outlined" color="error" onClick={handleDisableUser}>
                            Yes
                        </Button>
                        <Button variant="outlined" color="success" onClick={disableUserClose}>
                            Cancel
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
            {/* ---------------------------------------Disable User Dialog END---------------------------------- */}

            {/* ---------------------------------------Toast Container Starts------------------------------------ */}
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </PageContainer>
    )
}


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

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};