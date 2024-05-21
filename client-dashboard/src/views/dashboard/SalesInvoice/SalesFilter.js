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
    const [pending, setPending] = useState([]);
    const [paid, setPaid] = useState([]);
    const [creditNote, setCreditNote] = useState([]);

    //-----------------------------------------------------------Filtering the Invoices-----------------------------------------------//
    useEffect(() => {
        setPending(salesInvoiceData?.filter((element) => {
            return element.new_status === 'Pending'
        }))
        setPaid(salesInvoiceData?.filter((element) => {
            return element.new_status === 'Paid'
        }))
        setCreditNote(salesInvoiceData?.filter((element) => {
            return element.new_status === 'Credit Note'
        }))
    }, [])

    return (
        <Box mb={2}>
            <Grid container spacing={3} textAlign="center">
                <Grid item xs={6} sm={6} lg={3}>
                    <BoxStyled
                        onClick={salesInvoiceData.length !== 0 ? () => setStatusFilter('ALL') : undefined}
                        sx={{ backgroundColor: 'primary.light', color: 'primary.main', cursor: salesInvoiceData.length !== 0 ? 'pointer' : 'default' }}
                    >
                        <Typography variant="h3">{salesInvoiceData.length}</Typography>
                        <Typography variant="h6">ALL</Typography>
                    </BoxStyled>
                </Grid>
                <Grid item xs={6} sm={6} lg={3}>
                    <BoxStyled
                        onClick={pending.length !== 0 ? () => setStatusFilter('Pending') : undefined}
                        sx={{ backgroundColor: 'warning.light', color: 'warning.main', cursor: pending.length !== 0 ? 'pointer' : 'default' }}
                    >
                        <Typography variant="h3">{pending.length}</Typography>
                        <Typography variant="h6">Pending</Typography>
                    </BoxStyled>
                </Grid>
                <Grid item xs={6} sm={6} lg={3}>
                    <BoxStyled
                        onClick={paid.length !== 0 ? () => setStatusFilter('Paid') : undefined}
                        sx={{ backgroundColor: 'success.light', color: 'success.main', cursor: paid.length !== 0 ? 'pointer' : 'default' }}
                    >
                        <Typography variant="h3">{paid.length}</Typography>
                        <Typography variant="h6">Paid</Typography>
                    </BoxStyled>
                </Grid>
                <Grid item xs={6} sm={6} lg={3}>
                    <BoxStyled
                        onClick={creditNote.length !== 0 ? () => setStatusFilter('Credit Note') : undefined}
                        sx={{ backgroundColor: 'error.light', color: 'error.main', cursor: creditNote.length !== 0 ? 'pointer' : 'default' }}
                    >
                        <Typography variant="h3">{creditNote.length}</Typography>
                        <Typography variant="h6">Credit Note</Typography>
                    </BoxStyled>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SalesFilter;
