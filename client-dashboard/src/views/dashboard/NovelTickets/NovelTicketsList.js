import React, { useEffect, useRef, useState } from 'react';
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
  IconButton,
  CircularProgress,
  Rating,
} from '@mui/material';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import AddIcon from '@mui/icons-material/Add';
import CommentsDisabledOutlinedIcon from '@mui/icons-material/CommentsDisabledOutlined';
import { SearchTicket, getTickets, setIssueType } from '../../../store/apps/tickets/TicketSlice';

//Dialouge
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

//For Modal
import { useFrappeGetDocList, useFrappeUpdateDoc } from 'frappe-react-sdk';
import CloseIcon from '@mui/icons-material/Close';

//For Client Location
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

//ToolTip
import Zoom from '@mui/material/Zoom';
import { Link } from 'react-router-dom';
import { setLocation } from '../../../store/apps/userProfile/NovelProfileSlice';
import RiseTicket from './RiseTicket';
import { Stack } from '@mui/system';

//Ratiog
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';

//Toastify 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NovelTicketsList = ({ userEmail, totalPages, confirmedLocations, setFilterLocation, filterLocation }) => {
  const dispatch = useDispatch();

  //Dialouge component
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [toolTip, setToolTip] = useState(false);
  const [start, setStart] = useState(0);
  const [submitTicket, setSubmitTicket] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  //rating
  const [rating, setRating] = useState(0);
  const [ticketId, setTicketId] = useState(0);
  const [ticketRatingSubject, setTicketRatingSubject] = useState('');
  const [ratingDescription, setRatingDescription] = useState('');

  const isFirstRender = useRef(true);

  //-----------------------------------------------------------Toast functions--------------------------------------------------//
  const notifySuccess = (msg) => toast.success(msg, { toastId: "success" });
  const notifyError = (msg) => toast.error(msg, { toastId: "error" });

  //-----------------------------------------------------------Pagination--------------------------------------------------//
  const pageChange = (e, currentPage) => {
    currentPage = currentPage - 1;
    setStart(currentPage * 10);
  }

  //-----------------------------------------------------------Fetch Tickets for Review Pop up-----------------------------------------------//
  const { data: closedTicketData } = useFrappeGetDocList('Issue', {
    fields: ['subject', 'creation', 'status', 'raised_by', 'name', 'description', 'review_show_popup', 'rating'],
    filters: [['raised_by', '=', userEmail], ['status', '=', 'Closed']],
    limit_start: 0,
    limit: 10,
    orderBy: {
      field: 'modified',
      order: 'desc',
    },
  });

  //For outer submit btn trigger
  useEffect(() => {
    if (!isFirstRender.current) {
      if (closedTicketData?.length > 0) {
        console.log("closedTicketData = ", closedTicketData);
        if (closedTicketData[0].review_show_popup === 0) {
          setTicketId(closedTicketData[0].name);
          handleClickOpen2(closedTicketData[0].name, closedTicketData[0].subject);
          // alert("show")
        }
      }
    } else {
      isFirstRender.current = false;
    }
  }, [closedTicketData])


  //--------------------------------------------------------Fetch Lead's Locations-----------------------------------------//

  const handleChange = (event) => {
    let changedLocation = event.target.value;
    setFilterLocation(changedLocation);
    dispatch(setLocation(changedLocation));
    console.log("Location = ", changedLocation);
    if (event.target.value !== 'Property Location') {
      localStorage.setItem('location', changedLocation);
    }
    mutate();
  };

  //-----------------------------------------------------------Fetch Tickets-----------------------------------------------//
  const { data, error, isValidating, mutate } = useFrappeGetDocList('Issue', {
    fields: ['subject', 'creation', 'status', 'raised_by', 'name', 'description', 'review_show_popup', 'location', 'rating'],
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
    tickets = data;
    dispatch(getTickets(data));
  }

  //For updating Issue
  const { updateDoc: updateDocRating } = useFrappeUpdateDoc();

  //----------------------------------------------------------Issue types and subtypes fetch-----------------------------------------------//

  const { data: issueTypesArray } = useFrappeGetDocList('Issue Type', {
    fields: ['name'],
    orderBy: {
      field: 'name',
      order: 'asc',
    },
  });
  if (issueTypesArray) {
    dispatch(setIssueType(issueTypesArray[0].name));
  }

  //------------------------------------------------------Dialog, Tooltip-----------------------------------------------//

  //Dialog for rise ticket
  const handleClickOpen = () => {
    setOpen1(true);
    setSubmitTicket(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  //For Rating
  const handleClickOpen2 = (id, subject) => {
    setOpen2(true);
    setTicketId(id);
    setRating(0);
    setTicketRatingSubject(subject);
  };

  const handleClose2 = () => {
    setOpen2(false);
    if (ticketId) {
      updateDocRating('Issue', ticketId, { review_show_popup: 1 })
        .then((res) => {
          console.log("review_show_popup updated to 1");
        })
        .catch((err) => {
          console.log(err);
        })
    }
  };

  //ToolTip
  const handleTooltipClose = () => {
    setToolTip(false);
  };

  const handleTooltipOpen = () => {
    setToolTip(true);
  };

  //Submit btn trigger inside modal
  const handleSubmit = () => {
    setSubmitTicket(!submitTicket);
  }

  //------------------------------------------------------Rating-----------------------------------------------//
  const { updateDoc, loading, isCompleted } = useFrappeUpdateDoc();
  const sendRating = () => {
    updateDoc('Issue', ticketId, { rating: rating, rating_description: ratingDescription, review_show_popup: 1 })
      .then((res) => {
        notifySuccess("Rated Successfully");
        console.log(res);
        setTimeout(() => {
          handleClose2();
          mutate();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        notifyError(err);
      })
  }

  //------------------------------------------------------Filtering-----------------------------------------------//
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

        case 'In-Progress':
          return tickets.filter(
            (c) =>
              c.status === 'In-Progress' &&
              c.subject?.toLocaleLowerCase().includes(ticketSearch),
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

  if (data) {
    return (
      <Box mt={4}>

        {/* --------------------------------All Tickets Button and Dropdown---------------------------------  */}
        <Box display="flex" justifyContent={{ xs: 'center', md: 'end', ls: 'end' }} alignItems={'center'}>
          {/* <Box>
          </Box> */}
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
                      <MenuItem key={location.shortName + index} value={location.shortName}>{location.fullName}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>) :
              (<Typography variant='h4'>This customer is not linked to any Location</Typography>)
            }
          </Box>
        </Box>

        {/* --------------------------------If no Data---------------------------------  */}
        {
          data.length === 0 && <Stack alignItems='center' justifyContent='center' p={4}>
            <Typography variant='h4' pb={2}>There are no tickets</Typography>
            <Button variant="contained" onClick={handleClickOpen} sx={{ ml: 1 }}>
              New &nbsp;
              <AddIcon />
            </Button>
          </Stack>
        }

        {/* --------------------------------New Ticket Button and Search---------------------------------  */}
        {data.length !== 0 && <Box display="flex" justifyContent={'space-between'} alignItems={'center'} >
          <Box>
            <Button variant="contained" onClick={handleClickOpen} sx={{ ml: 1 }}>
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
        </Box>}

        {/* ---------------------------------------Table Start---------------------------------  */}
        {data.length !== 0 && <TableContainer>
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
                  <Typography variant="h6">Rating</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets && tickets.map((ticket) => (
                <TableRow key={ticket.name} hover>
                  <TableCell component={Link} to={`/ticket_details/${ticket.name}`}>
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
                  <TableCell component={Link} to={`/ticket_details/${ticket.name}`}>
                    <Box>
                      <Typography variant="h6" fontWeight="500" wrap >
                        {ticket.subject}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell component={Link} to={`/ticket_details/${ticket.name}`}>
                    <Chip
                      sx={{
                        backgroundColor:
                          ticket.status === 'In-Progress'
                            ? (theme) => theme.palette.success.light
                            : ticket.status === 'Closed'
                              ? (theme) => theme.palette.error.light
                              : ticket.status === 'Pending'
                                ? (theme) => theme.palette.warning.light
                                : ticket.status === 'Pending',
                      }}
                      size="small"
                      label={ticket.status}
                    />
                  </TableCell>
                  {/* <TableCell>
                    <Typography>{ticket.creation.split(" ")[0]}</Typography>
                  </TableCell> */}
                  <TableCell >
                    {/* <Badge color="secondary" badgeContent={0}> */}
                    {ticket.rating > 0 ? <Rating
                      name="read-only"
                      value={ticket.rating}
                      readOnly
                    /> : <Button variant='outlined' disabled={ticket.status !== 'Closed'} onClick={() => { handleClickOpen2(ticket.name, ticket.subject) }} >
                      <Stack flexDirection='row' alignItems='center' gap={0.5}>
                        Rate  <StarBorderPurple500Icon />
                      </Stack>
                    </Button>}
                    {/* <CommentsDisabledOutlinedIcon /> */}
                    {/* </Badge> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>}
        {/* ---------------------------------------Table Ends---------------------------------  */}
        <Box my={3} display="flex" justifyContent={'center'}>
          <Pagination count={totalPages} color="primary" onChange={pageChange} />
        </Box>

        {/* ---------------------------------------Raise Dialog Start---------------------------------- */}
        <Dialog
          fullWidth
          maxWidth='sm'
          open={open1}
          onClose={handleClose1}
        >
          <DialogTitle>
            <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
              <Typography variant='h5'>Raise a Ticket</Typography>
              <IconButton onClick={handleClose1} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Stack>
          </DialogTitle>
          <DialogContent>
            {issueTypesArray &&
              <RiseTicket
                confirmedLocations={confirmedLocations}
                filterLocation={filterLocation}
                setFilterLocation={setFilterLocation}
                setOpen1={setOpen1}
                mutate={mutate}
                submitTicket={submitTicket}
                setShowLoading={setShowLoading}
                issueTypesArray={issueTypesArray}
              />}
          </DialogContent>
          <DialogActions>
            <Box display='flex' justifyContent='center' alignItems='center' height='100%' width='100%' p={1}>
              <Button variant="contained" onClick={handleSubmit} disabled={confirmedLocations?.length === 1 || showLoading}>
                {showLoading ? <CircularProgress color="inherit" size={26} /> : "Submit"}
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
        {/* ---------------------------------------Raise Dialog Ends------------------------------------ */}

        {/* ---------------------------------------Rating Dialog Start---------------------------------- */}
        <Dialog
          fullWidth
          maxWidth='sm'
          open={open2}
          onClose={handleClose2}
        >
          <DialogTitle>
            <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
              <Typography variant='h5'>{ticketId}</Typography>
              <IconButton onClick={handleClose2} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Stack>
          </DialogTitle>
          <DialogContent>
            {/* ---------------------------------------Toast Container Starts------------------------------------ */}
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
            {/* ---------------------------------------Toast Container Ends------------------------------------ */}
            <Stack >
              {/* <Typography variant='p'>{ticketId}</Typography> */}
              <Typography variant='p' pb={2}>{ticketRatingSubject}</Typography>
              {/* <Typography component="legend">Rate us</Typography> */}
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
              <Box sx={{ mt: 2 }} >
                <TextField
                  id="outlined-multiline-static"
                  label="Feedback"
                  multiline
                  rows={2}
                  style={{ width: '100%' }}
                  name="description"
                  value={ratingDescription}
                  onChange={(e) => { setRatingDescription(e.target.value) }}
                />
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Box display='flex' justifyContent='center' alignItems='center' height='100%' width='100%' p={1}>
              <Button variant="outlined" onClick={sendRating} disabled={rating === 0} >
                Submit
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
        {/* ---------------------------------------Rating Dialog Ends------------------------------------ */}
      </Box>
    );
  }

};

export default NovelTicketsList;
