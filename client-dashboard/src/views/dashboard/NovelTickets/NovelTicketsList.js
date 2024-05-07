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
  Paper,
  TableFooter,
  TablePagination,
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

//Notification sounds
import closedTicketSound from '../../../notificationSounds/TicketClosedSound.wav'


const NovelTicketsList = ({ userEmail, confirmedLocations, setFilterLocation, filterLocation, unReadMessages }) => {
  const dispatch = useDispatch();

  //Dialouge component
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [toolTip, setToolTip] = useState(false);
  const [submitTicket, setSubmitTicket] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  //rating
  const [rating, setRating] = useState(0);
  const [ticketId, setTicketId] = useState(0);
  const [ticketRatingSubject, setTicketRatingSubject] = useState('');
  const [ratingDescription, setRatingDescription] = useState('');
  //Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //For Closed tickets Notification
  const isFirstRender = useRef(true);
  const closedTicketAudio = useRef(null);

  //-----------------------------------------------------------Toast functions--------------------------------------------------//
  const notifySuccess = (msg) => toast.success(msg, { toastId: "success" });
  const notifyError = (msg) => toast.error(msg, { toastId: "error" });

  //-----------------------------------------------------------Fetch Tickets for Review Pop up-----------------------------------------------//
  const { data: closedTicketData } = useFrappeGetDocList('Issue', {
    fields: ['subject', 'creation', 'status', 'raised_by', 'name', 'description', 'review_show_popup', 'rating'],
    filters: [['raised_by', '=', userEmail], ['status', '=', 'Closed']],
    limit_start: 0,
    limit: 1,
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
          closedTicketAudio?.current.play();
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
  let { data, error, isValidating, mutate } = useFrappeGetDocList('Issue', {
    fields: ['subject', 'creation', 'status', 'raised_by', 'name', 'description', 'review_show_popup', 'location', 'rating'],
    filters: filterLocation === "ALL" ? [['raised_by', '=', userEmail]] : [['raised_by', '=', userEmail], ['location', '=', filterLocation]],
    limit_start: 0,
    limit: 100000,
    orderBy: {
      field: 'creation',
      order: 'desc',
    },
  });

  var tickets = [];
  if (data) {
    // tickets = data;
    tickets = data.map(ticket => {
      console.log("unReadMessages = ", unReadMessages);
      const matchingUnreadMessage = unReadMessages?.find(message => message.ticket_id === ticket.name);
      if (matchingUnreadMessage) {
        return { ...ticket, unread_messages: matchingUnreadMessage.unread_messages };
      } else {
        return { ...ticket, unread_messages: 0 };
      }
    });

    dispatch(getTickets(data));
  }

  // console.log("tickets = ", tickets);

  //For updating Issue
  const { updateDoc: updateDocRating } = useFrappeUpdateDoc();

  //----------------------------------------------------------Issue types and subtypes fetch-----------------------------------------------//

  let { data: issueTypesArray } = useFrappeGetDocList('Issue Type', {
    fields: ['name'],
    orderBy: {
      field: 'name',
      order: 'asc',
    },
  });

  if (issueTypesArray) {

    const otherItems = issueTypesArray.filter(item => item.name === 'Other');

    // Filter the items without name 'Other'
    const nonOtherItems = issueTypesArray.filter(item => item.name !== 'Other');

    // Concatenate the nonOtherItems array with otherItems array
    issueTypesArray = [...nonOtherItems, ...otherItems];
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

  //-----------------------------------------------------------Pagination--------------------------------------------------//

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tickets?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


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
        {data?.length !== 0 &&
          <Paper variant="outlined" sx={{ mt: 2 }}>
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
                      <Typography variant="h6">Ticket ID</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Ticket Name</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Status</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Chat</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Rating</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {(rowsPerPage > 0
                    ? tickets?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : tickets
                  )?.map((ticket) => (
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
                            {ticket.subject.slice(0, 30)}...
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
                                    : ticket.status === 'Re-Open'
                                      ? (theme) => theme.palette.primary.light
                                      : ticket.status === 'Re-Open',
                          }}
                          size="small"
                          label={ticket.status}
                        />
                      </TableCell>
                      <TableCell component={Link} to={`/ticket_details/${ticket.name}`}>
                        {ticket.status === 'Closed' ?
                          <CommentsDisabledOutlinedIcon />
                          :
                          <Badge color="secondary" badgeContent={ticket.unread_messages}>
                            <CommentOutlinedIcon />
                          </Badge>
                        }
                        {/* <Typography>{ticket.creation.split(" ")[0]}</Typography> */}
                      </TableCell>
                      <TableCell >
                        {/* <Badge color="secondary" badgeContent={0}> */}
                        {ticket.rating > 0 ? <Rating
                          name="read-only size-small"
                          value={ticket.rating}
                          size="small"
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

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {/* ---------------------------------------Pagination---------------------------------  */}
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                      colSpan={6}
                      count={data?.length}
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
        {/* ---------------------------------------Table Ends---------------------------------  */}

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
        <audio ref={closedTicketAudio} src={closedTicketSound} />
      </Box>
    );
  }

};

export default NovelTicketsList;

{/* ---------------------------------------Main Component Ends------------------------------------ */ }

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from '@emotion/react';

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