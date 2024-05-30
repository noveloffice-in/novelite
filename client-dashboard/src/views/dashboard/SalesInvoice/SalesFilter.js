import { Box, Grid, Typography, styled } from '@mui/material';
import { useEffect, useState } from 'react';

const BoxStyled = styled(Box)(() => ({
    padding: '30px',
    transition: '0.1s ease-in',
    cursor: 'pointer',
    color: 'inherit',
    '&:hover': {
        transform: 'scale(1.03)',
    },
}));

const SalesFilter = ({ salesInvoiceData, setStatusFilter, locationFilter }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('ALL');

    // Filtering the data based on location (if not "ALL")
    useEffect(() => {
        if (locationFilter === "ALL") {
            setFilteredData(salesInvoiceData);
        } else {
            setFilteredData(salesInvoiceData.filter(element => element.location === locationFilter));
        }
    }, [salesInvoiceData, locationFilter]);

    // Counting pending, paid, and credit note invoices
    const pendingCount = locationFilter === "ALL" ? salesInvoiceData.filter(element => element.new_status === 'Pending').length : filteredData.filter(element => element.new_status === 'Pending').length;
    const paidCount = locationFilter === "ALL" ? salesInvoiceData.filter(element => element.new_status === 'Paid').length : filteredData.filter(element => element.new_status === 'Paid').length;
    const creditNoteCount = locationFilter === "ALL" ? salesInvoiceData.filter(element => element.new_status === 'Credit Note').length : filteredData.filter(element => element.new_status === 'Credit Note').length;
    const totalCount = locationFilter === "ALL" ? salesInvoiceData.length : filteredData.length;

    return (
        <Box mb={2}>
            <Grid container spacing={3} textAlign="center">

                <Grid item xs={6} sm={6} lg={3}>
                    <BoxStyled
                        onClick={() => {setStatusFilter('ALL'); setSelectedFilter('ALL'); }}
                        sx={{ backgroundColor: 'primary.light', color: 'primary.main', cursor: totalCount !== 0 ? 'pointer' : 'default', border: selectedFilter === 'ALL' ? '2px solid skyBlue' : 'none' }}
                    >
                        <Typography variant="h3">{totalCount}</Typography>
                        <Typography variant="h6">ALL</Typography>
                    </BoxStyled>
                </Grid>

                <Grid item xs={6} sm={6} lg={3}>
                    <BoxStyled
                        onClick={paidCount !== 0 ? () => {setStatusFilter('Paid'); setSelectedFilter('Paid');}: undefined}
                        sx={{ backgroundColor: 'success.light', color: 'success.main', cursor: paidCount !== 0 ? 'pointer' : 'default', border: selectedFilter === 'Paid' ? '2px solid skyBlue' : 'none'  }}
                    >
                        <Typography variant="h3">{paidCount}</Typography>
                        <Typography variant="h6">Paid</Typography>
                    </BoxStyled>
                </Grid>
                <Grid item xs={6} sm={6} lg={3}>
                    <BoxStyled
                        onClick={pendingCount !== 0 ? () => {setStatusFilter('Pending'); setSelectedFilter('Pending');} : undefined}
                        sx={{ backgroundColor: 'warning.light', color: 'warning.main', cursor: pendingCount !== 0 ? 'pointer' : 'default', border: selectedFilter === 'Pending' ? '2px solid skyBlue' : 'none'  }}
                    >
                        <Typography variant="h3">{pendingCount}</Typography>
                        <Typography variant="h6">Pending</Typography>
                    </BoxStyled>
                </Grid>
                <Grid item xs={6} sm={6} lg={3}>
                    <BoxStyled
                        onClick={creditNoteCount !== 0 ? () => {setStatusFilter('Credit Note'); setSelectedFilter('Credit Note');}: undefined}
                        sx={{ backgroundColor: 'error.light', color: 'error.main', cursor: creditNoteCount !== 0 ? 'pointer' : 'default', border: selectedFilter === 'Credit Note' ? '2px solid skyBlue' : 'none'  }}
                    >
                        <Typography variant="h3">{creditNoteCount}</Typography>
                        <Typography variant="h6">Credit Note</Typography>
                    </BoxStyled>
                </Grid>

            </Grid>
        </Box>
    );
};

export default SalesFilter;
