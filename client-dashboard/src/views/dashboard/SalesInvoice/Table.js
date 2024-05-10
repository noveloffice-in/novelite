import React from 'react'
import { useState, useEffect } from 'react';
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

import { Stack } from '@mui/system';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

export default function Table1({ statusFilter, salesInvoiceData }) {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filterData, setFilterData] = useState(salesInvoiceData);

    useEffect(() => {
        if (statusFilter !== "ALL") {
            setFilterData(salesInvoiceData?.filter((element) => {
                return element.new_status === statusFilter
            }))
        } else {
            setFilterData(salesInvoiceData);
        }
    }, [statusFilter])

    //-----------------------------------------------------------Pagination-----------------------------------------------//
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filterData?.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    //-----------------------------------------------------------Component Start-----------------------------------------------//
    return (
        <Stack>
            <Paper variant="outlined">
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
                                    <Typography variant="h6">Invoice No.</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Invoice Amount</Typography>
                                </TableCell>

                                <TableCell>
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
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {(rowsPerPage > 0
                                ? filterData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : filterData
                            )?.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell>
                                        <Typography variant="h6">{row.name}</Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6" fontWeight="400">
                                            ₹ {row.rounded_total}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography variant="h6">{row.due_date}</Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6" fontWeight="400">
                                            {row.location === null ? "----" : row.location}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Chip color={row.new_status === 'Paid' ? 'success' : row.new_status === 'Credit Note' ? 'error' : row.new_status === 'Pending' ? 'warning' : 'secondary'}
                                            sx={{
                                                borderRadius: '6px',
                                            }}
                                            size="small"
                                            label={row.new_status}
                                        />
                                    </TableCell>

                                    <TableCell >
                                        <Box color='secondary' marginLeft='1.5rem' component={Link} target='_blank' href={`http://${window.location.hostname}/api/method/frappe.utils.print_format.download_pdf?doctype=Sales Invoice&name=${row.name}&format=Business Center&no_letterhead=1&letterhead=No Letterhead &settings={}&_lang=en-US`}>
                                            <FileDownloadOutlinedIcon />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>

                        {<TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={6}
                                    count={filterData?.length}
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
            </Paper>
        </Stack>
    )
}

//-----------------------------------------------------------Table and Pagination-----------------------------------------------//

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
