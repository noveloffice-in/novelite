import { Box, Grid, Typography, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setVisibilityFilter } from '../../../store/apps/tickets/TicketSlice';
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

const SalesFilter = ({ data, statusFilter, setStatusFilter  }) => {
    const dispatch = useDispatch();
    const [pending, setPending] = useState([]);
    const [paid, setPaid] = useState([]);
    const [creditNote, setCreditNote] = useState([]);

    const counter = useSelector((state) => state.ticketReducer.tickets);

    useEffect(() => {
        setPending(data?.filter((element) => {
            return element.status === 'Overdue' ||
                element.status === 'Unpaid' ||
                element.status === 'Partly Paid' ||
                element.status === 'Unpaid and Discounted' ||
                element.status === 'Overdue and Discounted' ||
                element.status === 'Partly Paid and Discounted'
        }))
        setPaid(data?.filter((element) => {
            return element.status === 'Paid' ||
                element.status === 'Credit Note Issued'
        }))
        setCreditNote(data?.filter((element) => {
            return element.status === 'Return'
        }))
    }, [])

    const pendingC = counter.filter((t) => t.Status === 'Pending').length;
    const openC = counter.filter((t) => t.Status === 'Open').length;
    const closeC = counter.filter((t) => t.Status === 'Closed').length;
    return (
        <Box mb={2}>
            <Grid container spacing={3} textAlign="center">
                <Grid item xs={12} sm={6} lg={3}>
                    <BoxStyled
                        onClick={() => setStatusFilter('ALL')}
                        sx={{ backgroundColor: 'primary.light', color: 'primary.main' }}
                        >
                        <Typography variant="h3">{data.length}</Typography>
                        <Typography variant="h6">ALL</Typography>
                    </BoxStyled>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <BoxStyled
                        onClick={() => setStatusFilter('Pending')}
                        sx={{ backgroundColor: 'warning.light', color: 'warning.main' }}
                        >
                        <Typography variant="h3">{pending.length}</Typography>
                        <Typography variant="h6">Pending</Typography>
                    </BoxStyled>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <BoxStyled
                        onClick={() => setStatusFilter('Paid')}
                        sx={{ backgroundColor: 'success.light', color: 'success.main' }}
                        >
                        <Typography variant="h3">{paid.length}</Typography>
                        <Typography variant="h6">Paid</Typography>
                    </BoxStyled>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <BoxStyled
                        onClick={() => setStatusFilter('Credit Note')}
                        sx={{ backgroundColor: 'error.light', color: 'error.main' }}
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
