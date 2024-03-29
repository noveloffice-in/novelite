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
  Chip,
  Tooltip,
  TextField,
  Pagination,
  TableContainer,
  Button,
  Badge,
  FormControl,
} from '@mui/material';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import AddIcon from '@mui/icons-material/Add';
import CommentsDisabledOutlinedIcon from '@mui/icons-material/CommentsDisabledOutlined';
import { SearchTicket, getTickets } from '../../../store/apps/tickets/TicketSlice';

//Dialouge
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

//For Modal
import { useFrappeGetDocList } from 'frappe-react-sdk';

//For Client Location
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

//ToolTip
import Zoom from '@mui/material/Zoom';
import { Link } from 'react-router-dom';
import { setLocation } from '../../../store/apps/userProfile/NovelProfileSlice';
import RiseTicket from './RiseTicket';


const NovelTicketsList = ({ userEmail, totalPages, confirmedLocations, setFilterLocation, filterLocation }) => {
  const dispatch = useDispatch();

  //Dialouge component
  const [open1, setOpen1] = useState(false);
  const [toolTip, setToolTip] = useState(false);
  const [start, setStart] = useState(0);
  const [ticketLocation, setTicketlocation] = useState(filterLocation);

  useEffect(() => {
    if (confirmedLocations?.length == 2) {
      setFilterLocation(confirmedLocations[1].shortName);
      setTicketlocation(confirmedLocations[1].shortName);
      console.log("Locations = ", confirmedLocations[1]);
    }
  }, [])

  //-----------------------------------------------------------Pagination--------------------------------------------------//
  const pageChange = (e, currentPage) => {
    currentPage = currentPage - 1;
    setStart(currentPage * 10);
  }

  //--------------------------------------------------------Fetch Lead's Locations-----------------------------------------//

  const handleChange = (event) => {
    let changedLocation = event.target.value;
    setFilterLocation(changedLocation);
    dispatch(setLocation(changedLocation));
    setTicketlocation(changedLocation);
    console.log("Location = ", changedLocation);
    if (event.target.value !== 'Property Location') {
      localStorage.setItem('location', changedLocation);
    }
  };

  //-----------------------------------------------------------Fetch Tickets-----------------------------------------------//
  const { data, error, isValidating, mutate } = useFrappeGetDocList('Issue', {
    fields: ['subject', 'creation', 'status', 'raised_by', 'name', 'description', 'location'],
    filters: filterLocation === "ALL" ? [['raised_by', '=', userEmail]] : [['raised_by', '=', userEmail], ['location', '=', filterLocation]],
    limit_start: start,
    limit: 10,
    orderBy: {
      field: 'creation',
      order: 'desc',
    },
  });

  var tickets = [];
  if (data) {
    dispatch(getTickets(data));
    tickets = data;
  }

  //------------------------------------------------------Dialog, Tooltip-----------------------------------------------//

  //Dialog
  const handleClickOpen = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  //ToolTip
  const handleTooltipClose = () => {
    setToolTip(false);
  };

  const handleTooltipOpen = () => {
    setToolTip(true);
  };


  const getVisibleTickets = (tickets, filter, ticketSearch) => {
    if (tickets != undefined) {
      switch (filter) {
        case 'total_tickets':
          return tickets.filter(
            (c) => c.subject.toLocaleLowerCase().includes(ticketSearch),
          );

        case 'On Hold':
          return tickets.filter(
            (c) =>
              c.status === 'On Hold' &&
              c.subject.toLocaleLowerCase().includes(ticketSearch),
          );

        case 'Closed':
          return tickets.filter(
            (c) =>
              c.status === 'Closed' &&
              c.subject.toLocaleLowerCase().includes(ticketSearch),
          );

        case 'Open':
          return tickets.filter(
            (c) =>
              c.status === 'Open' &&
              c.subject.toLocaleLowerCase().includes(ticketSearch),
          );

        default:
          throw new Error(`Unknown filter: ${filter}`);
      }
    }
  };

  if (tickets != undefined) {
    tickets = useSelector((state) =>
      getVisibleTickets(
        state.ticketReducer.tickets,
        state.ticketReducer.currentFilter,
        state.ticketReducer.ticketSearch,
      ),
    );
  }

  //-----------------------------------------------------------END---------------------------------------------------------//

  return (
    <Box mt={4}>
      {/* --------------------------------All Tickets Button and Dropdown---------------------------------  */}
      <Box display="flex" justifyContent={{ xs: 'center', md: 'end', ls: 'end' }} alignItems={'center'}>
        {/* <Box>
        </Box> */}
        <Box sx={{ mb: 2 }} >
          {confirmedLocations?.length >= 2 ?
            confirmedLocations?.length === 2 ?
              "" : (<FormControl sx={{ m: 1, minWidth: 170 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Property Location</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={filterLocation}
                  label="Property Location"
                  onChange={handleChange}
                >
                  {confirmedLocations?.map((location, index) => {
                    return (
                      <MenuItem key={location.shortName + index} value={location.shortName}>{location.fullName}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>) :
            (<Typography variant='h4'>This customer is not linked to any Location</Typography>)
          }
        </Box>
      </Box>

      {/* --------------------------------New Ticket Button and Search---------------------------------  */}
      <Box display="flex" justifyContent={'space-between'} alignItems={'center'} >
        <Box>
          <Button variant="contained" onClick={handleClickOpen} sx={{ml:1}}>
            New &nbsp;
            <AddIcon />
          </Button>
        </Box>
        <Box sx={{ ml: 'auto', width: { xs: "8rem", md: "12rem", ls: "12rem" } }} display="flex" justifyContent={'space-between'} alignItems={'center'}>
          <TextField
            size="small"
            label="Search"
            // fullWidth
            onChange={(e) => dispatch(SearchTicket(e.target.value))}
          />
        </Box>
      </Box>

      {/* ---------------------------------------Table Start---------------------------------  */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Ticket ID</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Ticket Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Status</Typography>
              </TableCell>
              {/* <TableCell>
                <Typography variant="h6">Date</Typography>
              </TableCell> */}
              <TableCell>
                <Typography variant="h6">Updates</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets && tickets.map((ticket) => (
              <Tooltip disableFocusListener disableTouchListener placement="top-end" TransitionComponent={Zoom} title="Click to view updates">
                <TableRow key={ticket.subject} hover component={Link} to={`/ticket_details/${ticket.name}/${ticket.subject}/${ticket.status}/${ticket.description}`}>
                  <TableCell>
                    <Box>
                      <Typography variant="h6" fontWeight="500" wrap>
                        {ticket.name}
                      </Typography>

                      {/* <Typography
                      color="textSecondary"
                      noWrap
                      sx={{ maxWidth: '250px' }}
                      variant="subtitle2"
                      fontWeight="400"
                    >
                      {ticket.ticketDescription}
                    </Typography> */}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="h6" fontWeight="500" wrap >
                        {ticket.subject}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        backgroundColor:
                          ticket.status === 'Open'
                            ? (theme) => theme.palette.success.light
                            : ticket.status === 'Closed'
                              ? (theme) => theme.palette.error.light
                              : ticket.status === 'On Hold'
                                ? (theme) => theme.palette.warning.light
                                : ticket.status === 'Pending',
                      }}
                      size="small"
                      label={ticket.status === 'Open' ? 'New' : `${ticket.status}`}
                    />
                  </TableCell>
                  {/* <TableCell>
                  <Typography>{ticket.creation.split(" ")[0]}</Typography>
                </TableCell> */}
                  {ticket.status === 'Closed' ?
                    (<TableCell >
                      <Badge color="secondary" badgeContent={0}>
                        <CommentsDisabledOutlinedIcon />
                      </Badge>
                    </TableCell>)
                    :
                    (<TableCell >
                      <Badge color="secondary" badgeContent={0}>
                        <CommentOutlinedIcon />
                      </Badge>
                    </TableCell>)
                  }
                </TableRow>
              </Tooltip>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* ---------------------------------------Table Ends---------------------------------  */}
      <Box my={3} display="flex" justifyContent={'center'}>
        <Pagination count={totalPages} color="primary" onChange={pageChange} />
      </Box>

      {/* ---------------------------------------Dialog Start---------------------------------- */}
      <Dialog
        fullWidth
        maxWidth='sm'
        open={open1}
        onClose={handleClose1}
      >
        <DialogTitle>Raise a Ticket</DialogTitle>
        <DialogContent>
          <RiseTicket confirmedLocations={confirmedLocations} ticketLocation={ticketLocation} handleChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* ---------------------------------------Dialog Ends------------------------------------ */}
    </Box>
  );
};

export default NovelTicketsList;
