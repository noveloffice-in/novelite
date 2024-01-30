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
  Chip,
  Tooltip,
  TextField,
  Pagination,
  TableContainer,
  Button,
  Badge,
  FormControl,
} from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AddIcon from '@mui/icons-material/Add';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
import { SearchTicket, getTickets } from '../../../store/apps/tickets/TicketSlice';

//Dialouge
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

//For Modal
import Modal from '@mui/material/Modal';
import { useFrappeCreateDoc, useFrappeGetDocList } from 'frappe-react-sdk';

//Toastify 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//For Client Location
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

//ToolTip
import Zoom from '@mui/material/Zoom';
import { Link } from 'react-router-dom';
import { setLocation } from '../../../store/apps/userProfile/NovelProfileSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
};
const style1 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  maxWidth: 500
};

const NovelTicketsList = ({ userEmail, totalPages, confirmedLocations, setFilterLocation, filterLocation }) => {
  const dispatch = useDispatch();

  //Dialouge component
  const [open1, setOpen1] = useState(false);
  const [open, setOpen] = useState(false);
  const [toolTip, setToolTip] = useState(false);
  const [start, setStart] = useState(0);
  const [tittle, setTittle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [clientLocation, setClientLocation] = useState("");
  const [ticketData, setTicketData] = useState({
    subject: "",
    description: "",
    location: filterLocation
  });

  //-----------------------------------------------------------Pagination--------------------------------------------------//
  const pageChange = (e, currentPage) => {
    currentPage = currentPage - 1;
    setStart(currentPage * 10);
  }

  //--------------------------------------------------------Fetch Lead's Locations-----------------------------------------//

  const handleChange = (event) => {
    setFilterLocation(event.target.value);
    dispatch(setLocation(event.target.value));
    ticketData.location = event.target.value;
    setTicketData({ ...ticketData });
    console.log("Location = ", event.target.value);
    if (event.target.value !== 'Property Location') {
      localStorage.setItem('location', event.target.value);
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

  //------------------------------------------------------Modal, Dialog, Tooltip-----------------------------------------------//

  //Dialog
  const handleClickOpen = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  //Modal
  const handleOpen = (tittle, description, status) => {
    setOpen(true);
    setTittle(tittle);
    setDescription(description);
    setStatus(status);
  }

  const handleClose = () => setOpen(false);

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

  //----------------------------------------------------------Rise a Ticket-----------------------------------------------//
  const { createDoc, isCompleted, } = useFrappeCreateDoc();
  const notifySuccess = (msg) => toast.success(msg, { toastId: "success" });
  const notifyWarn = (msg) => toast.warn(msg, { toastId: "warn" });

  const handleTicketDataChange = (e) => {
    const ticketTittle = document.querySelector('#standard-basic')?.value.trim();
    const ticketDescription = document.querySelector('#outlined-multiline-static')?.value.trim();

    if (ticketTittle !== "" && ticketDescription !== "") {
      ticketData.subject = ticketTittle;
      ticketData.description = ticketDescription;
      setTicketData({ ...ticketData });
    }
  }

  const riseTicket = () => {
    if (ticketData.subject === "" || ticketData.description === "") {
      notifyWarn("Please fill the details");
    } else if (ticketData.location === 'ALL' || ticketData.location === '') {
      notifyWarn("Please Select the Location");
    } else {
      const create = createDoc('Issue', ticketData).then(() => {
        notifySuccess('Ticket created Successfully');
        setOpen1(false);
        mutate();
      }).catch((err) => {
        console.log("inside catch " + JSON.stringify(err.message));
        notifyError(err.message);
      })
    }
  }

  //-----------------------------------------------------------END---------------------------------------------------------//

  return (
    <Box mt={4}>
      {/* --------------------------------All Tickets Button and Dropdown---------------------------------  */}
      <Box display="flex" justifyContent={'space-between'} alignItems={'center'}>
        <Box>
        </Box>
        <Box sx={{ mb: 2 }} >
          {confirmedLocations?.length >= 2 ?
            (<FormControl sx={{ m: 1, minWidth: 170 }}>
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
                    <MenuItem key={location.shortName+index} value={location.shortName}>{location.fullName}</MenuItem>
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
          <Button variant="contained" onClick={handleClickOpen}>
            New &nbsp;
            <AddIcon />
          </Button>
        </Box>
        <Box sx={{ ml: 'auto' }} display="flex" justifyContent={'space-between'} alignItems={'center'}>
          <TextField
            size="small"
            label="Search"
            fullWidth
            onChange={(e) => dispatch(SearchTicket(e.target.value))}
          />
        </Box>
      </Box>

      {/* ---------------------------------------Table Start---------------------------------  */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>
                <Typography variant="h6">S No</Typography>
              </TableCell> */}
              <TableCell>
                <Typography variant="h6">Ticket</Typography>
              </TableCell>
              {/* <TableCell>
                <Typography variant="h6">Assigned To</Typography>
              </TableCell> */}
              <TableCell>
                <Typography variant="h6">Status</Typography>
              </TableCell>
              {/* <TableCell>
                <Typography variant="h6">Date</Typography>
              </TableCell> */}
              <TableCell>
                <Typography variant="h6">Chat</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets && tickets.map((ticket) => (
              <TableRow key={ticket.subject} hover>
                {/* <TableCell>{index + 1}</TableCell> */}
                <TableCell onClick={() => { handleOpen(ticket.subject, ticket.description, ticket.status) }} style={{ cursor: "pointer" }}>
                  <Box>
                    <Typography variant="h6" fontWeight="500" wrap>
                      {ticket.subject}
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
                {/* <TableCell>
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
                </TableCell> */}
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
                      <SpeakerNotesOffIcon />
                    </Badge>
                  </TableCell>)
                  :
                  (<TableCell component={Link} to={`/tickets_chat/${ticket.name}/${ticket.subject}`} >
                    <Badge color="secondary" badgeContent={0}>
                      <ChatBubbleOutlineIcon />
                    </Badge>
                  </TableCell>)
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* ---------------------------------------Table Ends---------------------------------  */}
      <Box my={3} display="flex" justifyContent={'center'}>
        <Pagination count={totalPages} color="primary" onChange={pageChange} />
      </Box>

      {/* ---------------------------------------Modal Start---------------------------------  */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textDecoration: 'underline' }}>
              Ticket Name:
            </Typography>
            <Typography id="modal-modal-title">
              {tittle}
            </Typography>
          </Box>
          <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textDecoration: 'underline', marginTop: '0.5rem' }}>
              Ticket Description:
            </Typography>
            <Typography id="modal-modal-description" >
              {description ? description : "No Description"}
            </Typography>
          </Box>
          <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textDecoration: 'underline', marginTop: '0.5rem' }}>
              Ticket Status:
            </Typography>
            <Typography id="modal-modal-description">
              {status}
            </Typography>
          </Box>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Box>
      </Modal>
      {/* ---------------------------------------Modal Ends----------------------------------- */}


      {/* ---------------------------------------Dialog Start---------------------------------- */}
      <Dialog
        fullWidth
        maxWidth='sm'
        open={open1}
        onClose={handleClose1}
      >
        <DialogTitle>Raise a Ticket</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            {description}
          </DialogContentText> */}
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: '90%',
            }}
          >
            <Box >
              <TextField id="standard-basic" label="Ticket Title" variant="standard" style={{ width: '100%' }} onChange={(e) => { handleTicketDataChange(e) }} />
            </Box>
            <Box sx={{ mt: 3 }} >
              <TextField
                id="outlined-multiline-static"
                label="Ticket Description"
                multiline
                rows={4}
                style={{ width: '100%' }}
                onChange={(e) => { handleTicketDataChange(e) }}
              />
            </Box>
            <Tooltip disableFocusListener disableTouchListener placement="right-end" TransitionComponent={Zoom} title="Property for which you want to rise ticket">
              {confirmedLocations?.length >= 2 ?
              (<Box>
                <FormControl fullWidth sx={{ mt: 3 }} >
                  <InputLabel id="demo-simple-select-label">Property Location</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filterLocation}
                    label="Property Location"
                    onChange={handleChange}
                  >
                    {confirmedLocations?.map((location) => {
                      return (
                        <MenuItem key={location.shortName} value={location.shortName}>{location.fullName}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Box>) :
              (<Typography variant='h4' sx={{ mt: 3 }}>This customer is not linked to any Location</Typography>)
              }
            </Tooltip>
            <Button variant="contained" sx={{ mt: 3 }} onClick={riseTicket} disabled={confirmedLocations?.length === 1}>
              Submit
            </Button>
          </Box>

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
