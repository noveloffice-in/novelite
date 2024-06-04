import React, { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  Button,
  Avatar,
  Stack,
  CardMedia,
  styled,
  Fab,
  Skeleton,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import profilecover from 'src/assets/images/backgrounds/profilebg.jpg';
import userimg from 'src/assets/images/profile/user-1.jpg';
import {
  IconBrandDribbble,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandYoutube,
  IconFileDescription,
  IconUserCheck,
  IconUserCircle,
} from '@tabler/icons';
import BlankCard from '../../../components/shared/BlankCard';
import ProfileTabs from './ProfileTabs';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

//Toastify 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Dialouge
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';

import { useFrappeCreateDoc, useFrappeGetDoc, useFrappeUpdateDoc } from 'frappe-react-sdk';
import axios from 'axios';
import AddNewUser from './AddNewUser';

const Banner = () => {
  const ProfileImage = styled(Box)(() => ({
    backgroundImage: 'linear-gradient(#50b2fc,#f44c66)',
    borderRadius: '50%',
    width: '110px',
    height: '110px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
  }));

  const userEmail = useSelector((state) => state.novelprofileReducer.userEmail);
  const companyName = useSelector((state) => state.novelprofileReducer.companyName);
  const fullName = useSelector((state) => state.novelprofileReducer.fullName);
  const userImage = useSelector((state) => state.novelprofileReducer.userImage);
  const adminStatus = useSelector((state) => state.novelprofileReducer.adminStatus);

  const [disableSubmit, setDisableSubmit] = React.useState(false);
  const navigate = useNavigate();

  //-----------------------------------------------------------Toast functions--------------------------------------------------//
  const notifySuccess = (msg) => toast.success(msg, { toastId: "success" });
  const notifyError = (msg) => toast.error(msg, { toastId: "error" });
  const notifyWarn = (msg) => toast.warn(msg, { toastId: "error" });

  //-----------------------------------------------------------Dialouge-----------------------------------------------//
  //Dialouge component
  const [open1, setOpen1] = React.useState(false);
  const [errorField, setErrorField] = React.useState('');

  //Dialog for rise ticket
  const handleClickOpen = () => {
    setOpen1(true);
    setDisableSubmit(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  //Password
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickConfirmShowPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  //-----------------------------------------------------------User creation form-----------------------------------------------//
  let permissions = [];

  const handleCheckboxChange = (component) => {
    permissions.push(component);
    console.log("permissions =", permissions);
  }

  const [userData, setUserData] = useState({
    app_user_type: 'Property Customer',
    customer: companyName,
    email: '',
    first_name: '',
    last_name: ''
  })

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const createUser = () => {
    const { email, first_name, last_name } = userData;

    setDisableSubmit(true);
    // getUserData(email);

    if (first_name === '') {
      setErrorField('first_name');
      setDisableSubmit(false);
    } else if (last_name === '') {
      setErrorField('last_name');
      setDisableSubmit(false);
    } else if (email === '') {
      setErrorField('email');
      setDisableSubmit(false);
    } else {

      //Checking if user aleardy exists
      axios.post('/api/method/novelite.api.user_creation.check_user', { userEmail: email })
        .then((res) => {
          if (res.data.message) {
            notifyError("User already exists");
            setDisableSubmit(false);
          } else {
            const newPermissions = permissions;
            const userDataWithPermissions = { permissions: newPermissions, name: userData.email };

            //Creating User
            axios.post('/api/method/novelite.api.user_creation.create_user', userData)
              .then((res) => {
                notifySuccess("User created sucessfully");

                //Adding permissions to app user
                axios.post('/api/method/novelite.api.user_creation.modify_app_user_permission', userDataWithPermissions)
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((error) => {
                    console.log(error);
                  })

                setTimeout(() => {
                  setOpen1(false);
                  setDisableSubmit(false);
                  navigate('/users-list');
                }, 2000);
              })
              .catch((err) => {
                notifyError(err);
                setDisableSubmit(false);
                console.log("Error = ", err.response.data._server_messages);
              })
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }


  return (
    <>
      <BlankCard>
        <CardMedia component="img" image={profilecover} alt={profilecover} width="100%" height={90} />
        <Grid container spacing={0} justifyContent="center" alignItems="center">
          {/* Post | Followers | Following */}
          <Grid
            item
            lg={4}
            sm={12}
            md={5}
            xs={12}
            sx={{
              order: {
                xs: '2',
                sm: '2',
                lg: '1',
              },
            }}
          >
            <Stack direction="row" textAlign="center" justifyContent="center" gap={6} m={3}>
              {/* <Box>
                <Typography color="text.secondary">
                  <IconFileDescription width="20" />
                </Typography>
                <Typography variant="h4" fontWeight="600">
                  938
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                  Posts
                </Typography>
              </Box>
              <Box>
                <Typography color="text.secondary">
                  <IconUserCircle width="20" />
                </Typography>
                <Typography variant="h4" fontWeight="600">
                  3,586
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                  Followers
                </Typography>
              </Box> */}
              <Box>
                <Button color="primary" variant="contained" component={Link} to={`/dashboard`}>
                  Go to Dashboard
                </Button>
                {/* <Typography color="text.secondary">
                  <IconUserCheck width="20" />
                </Typography>
                <Typography variant="h4" fontWeight="600">
                  2,659
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                  users
                </Typography> */}
              </Box>
            </Stack>
          </Grid>
          {/* about profile */}
          <Grid
            item
            lg={4}
            sm={12}
            xs={12}
            sx={{
              order: {
                xs: '1',
                sm: '1',
                lg: '2',
              },
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              textAlign="center"
              justifyContent="center"
              sx={{
                mt: '-85px',
              }}
            >
              <Box>
                <ProfileImage>
                  <Avatar
                    src={userImage !== '' ? userImage : userimg}
                    alt={userImage !== '' ? userImage : userimg}
                    sx={{
                      borderRadius: '50%',
                      width: '100px',
                      height: '100px',
                      border: '4px solid #fff',
                    }}
                  />
                </ProfileImage>
                <Box my={1.5}>
                  <Typography fontWeight={600} variant="h5">
                    {fullName}
                  </Typography>
                  <Typography color="textSecondary" variant="h6" fontWeight={400}>
                    {userEmail}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          {/* friends following buttons */}
          <Grid
            item
            lg={4}
            sm={12}
            xs={12}
            sx={{
              order: {
                xs: '3',
                sm: '3',
                lg: '3',
              },
            }}
          >
            {adminStatus === 'Admin' && <Stack direction={'row'} gap={2} alignItems="center" justifyContent="center" my={2}>
              {/* <Fab size="small" color="primary" sx={{ backgroundColor: '#1877F2' }}>
                <IconBrandFacebook size="16" />
              </Fab>
              <Fab size="small" color="primary" sx={{ backgroundColor: '#1DA1F2' }}>
                <IconBrandTwitter size="18" />
              </Fab>
              <Fab size="small" color="error" sx={{ backgroundColor: '#EA4C89' }}>
                <IconBrandDribbble size="18" />
              </Fab>
              <Fab size="small" color="error" sx={{ backgroundColor: '#CD201F' }}>
                <IconBrandYoutube size="18" />
              </Fab> */}
              <Button color="primary" variant="contained" onClick={handleClickOpen}>
                Add User
              </Button>
              {/* <Box>
                <Typography variant="h4" fontWeight="600">
                  2,659
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                  users
                </Typography>
              </Box> */}
            </Stack>}

          </Grid>
        </Grid>
        {/**TabbingPart**/}
        <ProfileTabs />

        {/* ---------------------------------------Add User Dialog Start---------------------------------- */}
        <Dialog
          fullWidth
          maxWidth='sm'
          open={open1}
          onClose={handleClose1}
        >
          <DialogTitle>
            <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
              <Typography variant='h5'>Add User</Typography>
              <IconButton onClick={handleClose1} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Stack>
          </DialogTitle>
          <DialogContent>
            {/* Add user Form  */}
            <AddNewUser errorField={errorField} handleInput={handleInput} handleCheckboxChange={handleCheckboxChange} />
          </DialogContent>
          <DialogActions>
            <Box display='flex' justifyContent='center' alignItems='center' height='100%' width='100%' p={1}>
              <Button variant="outlined" type='submit' onClick={createUser} disabled={disableSubmit}>
                {disableSubmit ? <CircularProgress color="inherit" size={26} /> : "Submit"}
              </Button>
            </Box>
          </DialogActions>
          {/* ---------------------------------------------Toast------------------------------------------- */}
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
        </Dialog>
      </BlankCard>
    </>
  );
};

export default Banner;
