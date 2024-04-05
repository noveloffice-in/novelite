import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  IconButton,
  Chip,
  Stack,
  Avatar,
  Tooltip,
  TextField,
  Pagination,
  TableContainer,
  Button,
} from '@mui/material';
import { fetchTickets, DeleteTicket, SearchTicket } from '../../../store/apps/tickets/TicketSlice';
import { IconTrash } from '@tabler/icons';

//Dialouge
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PassForm from './PassForm';
import { useFrappeGetDoc } from 'frappe-react-sdk';

const PassTable = () => {
  const dispatch = useDispatch();
  const companyName = useSelector((state) => state.novelprofileReducer.companyName);

  //Getting leads and setting only lead Ids in store
  const getLeadID = () => {
    const { data: customerData } = useFrappeGetDoc(
      'Customer', `${companyName}`
    );
    return customerData?.leads.map((lead) => { return { "location": lead.confirmed_location, "leadId": lead.leads } });
  }

  const billingLocation = getLeadID();
  // console.log(getLeadID());

  //Dialouge component
  const [open1, setOpen1] = useState(false);

  //Dialog
  const handleClickOpen = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const getVisibleTickets = (tickets, filter, ticketSearch) => {
    if (tickets) {
      switch (filter) {
        case 'total_tickets':
          return tickets.filter(
            (c) => !c.deleted && c.ticketTitle?.toLocaleLowerCase().includes(ticketSearch),
          );

        case 'Pending':
          return tickets.filter(
            (c) =>
              !c.deleted &&
              c.Status === 'Pending' &&
              c.ticketTitle?.toLocaleLowerCase().includes(ticketSearch),
          );

        case 'Closed':
          return tickets.filter(
            (c) =>
              !c.deleted &&
              c.Status === 'Closed' &&
              c.ticketTitle?.toLocaleLowerCase().includes(ticketSearch),
          );

        case 'Open':
          return tickets.filter(
            (c) =>
              !c.deleted &&
              c.Status === 'Open' &&
              c.ticketTitle?.toLocaleLowerCase().includes(ticketSearch),
          );

        default:
          throw new Error(`Unknown filter: ${filter}`);
      }
    }
  };

  const tickets = useSelector((state) =>
    getVisibleTickets(
      state.ticketReducer.tickets,
      state.ticketReducer.currentFilter,
      state.ticketReducer.ticketSearch,
    ),
  );
  return (
    <Box mt={4}>
      <Box display="flex" justifyContent={'space-between'} alignItems={'center'}>
        <Box>
          <Button variant="contained" onClick={handleClickOpen} sx={{ ml: 1 }}>
            Book parking pass
          </Button>
        </Box>
        <Box sx={{ maxWidth: '260px', ml: 'auto' }} mb={3}>
          <TextField
            size="small"
            label="Search"
            fullWidth
            onChange={(e) => dispatch(SearchTicket(e.target.value))}
          />
        </Box>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Id</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Ticket</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Assigned To</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Status</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Date</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.Id} hover>
                <TableCell>{ticket.Id}</TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="h6" fontWeight="500" noWrap>
                      {ticket.ticketTitle}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      noWrap
                      sx={{ maxWidth: '250px' }}
                      variant="subtitle2"
                      fontWeight="400"
                    >
                      {ticket.ticketDescription}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Stack direction="row" gap="10px" alignItems="center">
                    <Avatar
                      src={ticket.thumb}
                      alt={ticket.thumb}
                      width="35"
                      sx={{
                        borderRadius: '100%',
                      }}
                    />
                    <Typography variant="h6">{ticket.AgentName}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      backgroundColor:
                        ticket.Status === 'Open'
                          ? (theme) => theme.palette.success.light
                          : ticket.Status === 'Closed'
                            ? (theme) => theme.palette.error.light
                            : ticket.Status === 'Pending'
                              ? (theme) => theme.palette.warning.light
                              : ticket.Status === 'Moderate',
                    }}
                    size="small"
                    label={ticket.Status}
                  />
                </TableCell>
                <TableCell>
                  <Typography>{ticket.Date}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Delete Ticket">
                    <IconButton onClick={() => dispatch(DeleteTicket(ticket.Id))}>
                      <IconTrash size="18" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box my={3} display="flex" justifyContent={'center'}>
        <Pagination count={10} color="primary" />
      </Box>
      {/* ---------------------------------------Dialog Start---------------------------------- */}
      <Dialog
        fullWidth
        maxWidth='sm'
        open={open1}
        onClose={handleClose1}
      >
        <DialogTitle>Book a pass</DialogTitle>
        <DialogContent>
          {billingLocation && <PassForm setOpen1={setOpen1} billingLocation={billingLocation}/>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PassTable;
