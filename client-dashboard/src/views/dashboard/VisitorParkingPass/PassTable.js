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
import { useFrappeGetDoc, useFrappeGetDocList } from 'frappe-react-sdk';
import { Link } from 'react-router-dom';

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

  //------------------------------------------------------Dialog-----------------------------------------------//
  //Dialog
  const handleClickOpen = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  //------------------------------------------------------Table Data-----------------------------------------------//
  const { data, mutate, isLoading } = useFrappeGetDocList('Visitor Parking Pass', {
    fields: ['name', 'visitor_name', 'vehicle_type', 'visit_location', 'visitor_email', 'vehicle_no', 'visit_date', 'visit_time'],
    filters: [['customer', '=', companyName]],
    orderBy: {
      field: 'creation',
      order: 'desc',
    },
  })

  console.log('Table Data = ', data);

  const getVisibleTickets = (tickets, filter, ticketSearch) => {
    if (tickets != undefined) {
      switch (filter) {
        case 'total_tickets':
          return tickets.filter(
            (c) => c.subject?.toLocaleLowerCase().includes(ticketSearch),
          );

        case 'Pending':
          return tickets.filter(
            (c) =>
              c.status === 'Pending' &&
              c.subject?.toLocaleLowerCase().includes(ticketSearch),
          );

        case 'Closed':
          return tickets.filter(
            (c) =>
              c.status === 'Closed' &&
              c.subject?.toLocaleLowerCase().includes(ticketSearch),
          );

        case 'Open':
          return tickets.filter(
            (c) =>
              c.status === 'Open' &&
              c.subject?.toLocaleLowerCase().includes(ticketSearch),
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
              <TableCell align="right">
                <Typography variant="h6">Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          {data && <TableBody>
            {data.map((element) => (
              <TableRow key={element.name} hover component={Link} to={`/visit_details/${element.name}`}>
                <TableCell>
                  <Typography variant="h6">{element.visitor_name}</Typography>
                </TableCell>
                <TableCell>
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
                <TableCell>
                  <Stack direction="row" gap="10px" alignItems="center">
                    <Typography variant="h6">{element.visit_time}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  {/* <Chip
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
                  /> */}
                  <Typography>{element.vehicle_no}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{element.visit_location}</Typography>
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
          </TableBody>}
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
          {billingLocation && <PassForm setOpen1={setOpen1} billingLocation={billingLocation} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PassTable;
