import React, { useEffect, useState } from 'react'
import PageContainer from '../../../components/container/PageContainer'
import { Grid } from '@mui/material'
import Banner from './Banner'
import { useSelector } from 'react-redux';
import { useFrappeGetDoc } from 'frappe-react-sdk';
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
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

export default function UsersList() {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [usersList, setUsersList] = useState([]);
    const [pending, setPending] = useState(true);
    const userEmail = useSelector((state) => state.novelprofileReducer.userEmail);

    useEffect(() => {
        axios.post('/api/method/novelite.api.api.get_user_permissions_by_email', { user_email: userEmail })
            .then((res) => {
                setUsersList(res.data.message);
                setPending(false);
                console.log(res.data.message);
            })
    }, [])

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - usersList?.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <PageContainer title="User - Novel Office" description="this is User Profile page">
            <Grid p={1}>
                <Grid item sm={12}>
                    <Banner />
                </Grid>

                <Box pt={1}>
                {!pending && <Paper variant="outlined">

                    <TableContainer>

                        <Table
                            aria-label="custom sales invoice"
                            sx={{
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="h6">User</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h6">Permissions</Typography>
                                    </TableCell>

                                    {/* <TableCell>
                                        <Typography variant="h6">Due Date</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h6">Location</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h6">Status</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h6">Download</Typography>
                                    </TableCell> */}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {(rowsPerPage > 0
                                    ? usersList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : usersList
                                )?.map((row) => (
                                    <TableRow key={row.username}>
                                        <TableCell>
                                            <Typography variant="h6">{row.username}</Typography>
                                        </TableCell>

                                        <TableCell>
                                            {
                                                row.permissions.map((permission) => {
                                                    return (
                                                        <Typography color="textSecondary" variant="h6" fontWeight="400" key={permission.permittedComponent}>
                                                            {permission.permittedComponent}
                                                        </Typography>
                                                    )
                                                })
                                            }
                                        </TableCell>

                                        {/* <TableCell>
                                            <Typography variant="h6">{row.due_date}</Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6" fontWeight="400">
                                                {row.location === null ? "----" : row.location}
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Chip color={statusFilter === 'Paid' ? 'success' : statusFilter === 'Credit Note' ? 'error' : statusFilter === 'Pending' ? 'primary' : 'secondary'}
                                                sx={{
                                                    borderRadius: '6px',
                                                }}
                                                size="small"
                                                label={statusFilter === 'All' ? (row.status === "Credit Note Issued" ? "Paid" : row.status === "Return" ? "Credit Note" : row.status) : statusFilter}
                                            />
                                        </TableCell>

                                        <TableCell >
                                            <Box color='secondary' marginLeft='1.5rem' component={Link} target='_blank' href={`http://${window.location.hostname}/api/method/frappe.utils.print_format.download_pdf?doctype=Sales Invoice&name=${row.name}&format=Business Center&no_letterhead=1&letterhead=No Letterhead &settings={}&_lang=en-US`}>
                                                <FileDownloadOutlinedIcon />
                                            </Box>
                                        </TableCell> */}
                                    </TableRow>
                                ))}

                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>

                            <TableFooter>
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
                            </TableFooter>

                        </Table>

                    </TableContainer>
                </Paper>}
                </Box>

            </Grid>
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