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
import { Link } from 'react-router-dom';
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

import { useFrappeCreateDoc, useFrappeUpdateDoc } from 'frappe-react-sdk';
import axios from 'axios';

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

  const [disableSubmit, setDisable] = React.useState(false);

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
  const [userData, setUserData] = useState({
    app_user_type: 'Property Customer',
    customer: companyName,
    email: '',
    first_name: '',
    new_password: '',
    confirmPassword: ''
  })

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const { createDoc } = useFrappeCreateDoc();
  const { updateDoc } = useFrappeUpdateDoc();
  const createUser = () => {
    setDisable(true);
    const { email, first_name, new_password, confirmPassword } = userData;

    if (first_name === '') {
      setErrorField('first_name');
      setDisable(false);
    } else if (email === '') {
      setErrorField('email');
      setDisable(false);
    } else if (new_password === '') {
      setErrorField('new_password');
      setDisable(false);
    } else if (confirmPassword === '') {
      setErrorField('confirmPassword');
      setDisable(false);
    } else if (new_password !== confirmPassword) {
      setErrorField('confirmPassword');
      setDisable(false);
    } else {
      axios.post('/api/method/novelite.api.user_creation.create_user', userData)
        .then((res) => {
          console.log("res = ", res);
          notifySuccess("User created sucessfully");
          setDisable(false);
          setTimeout(() => {
            handleClose1();
          }, 2000);
        })
        .catch((err) => {
          notifyError(err);
          setDisable(false);
          console.log("Error = ", err);
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
                    src={userimg}
                    alt={userimg}
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
            <Box
              component="form"
            >
              <Box>
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                  <TextField
                    label="Name"
                    id="outlined-required"
                    name='first_name'
                    required
                    onChange={handleInput}
                    error={errorField === 'first_name'}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                  <TextField
                    label="Email"
                    id="outlined-required"
                    name='email'
                    required
                    onChange={handleInput}
                    error={errorField === 'email'}
                  />
                </FormControl>
              </Box>
              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" required >Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  name='new_password'
                  onChange={handleInput}
                  error={errorField === 'new_password'}
                />
              </FormControl>

              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" required >Confirm Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickConfirmShowPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  name='confirmPassword'
                  onChange={handleInput}
                  error={errorField === 'confirmPassword'}
                />
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Box display='flex' justifyContent='center' alignItems='center' height='100%' width='100%' p={1}>
              <Button variant="outlined" type='submit' onClick={createUser} disabled={disableSubmit}>
                Submit
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
