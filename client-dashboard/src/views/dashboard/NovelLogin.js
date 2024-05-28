import React, { useRef, useState } from 'react';
import PageContainer from '../../components/container/PageContainer';
import { Box, Stack } from '@mui/system';
import CustomFormLabel from '../../components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import { Card, Divider, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Logo from '../../layouts/full/shared/logo/Logo';
import { useDispatch } from 'react-redux';
import { setUser, setUserEmail } from '../../store/apps/userProfile/NovelProfileSlice';
import Modal from '@mui/material/Modal';
import axios from 'axios';


//Frappe imports
import { useFrappeAuth, useFrappeGetDoc } from 'frappe-react-sdk'

//Toastify 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//For password
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CustomOutlinedInput from '../../components/forms/theme-elements/CustomOutlinedInput';
import { IconEye, IconEyeOff } from '@tabler/icons';

//Notification Sounds
import SuccessSound from '../../notificationSounds/SuccessSound.wav'
import WarnSound from '../../notificationSounds/WarningSound.wav'
import ErrorSound from '../../notificationSounds/ErrorSound.wav'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    width: '400px'
};

export default function NovelLogin() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        currentUser,
        isValidating,
        isLoading,
        login,
        logout,
        error,
        updateCurrentUser,
        getUserCookie,
    } = useFrappeAuth();

    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState({
        userEmail: "",
        password: ""
    })
    const [guestUserData, setGuestUserData] = useState({
        userName: "",
        email: "",
        phoneNumber: ""
    })

    //Notification
    const notifySuccess = (msg) => toast.success(msg, { toastId: "success" });
    const notifyError = (msg) => toast.error(msg, { toastId: "error" });
    const notifyWarn = (msg) => toast.warn(msg, { toastId: "warn" });
    const successAudio = useRef(null);
    const warnAudio = useRef(null);
    const errorAudio = useRef(null);

    const handleOpen = () => setOpen(!open);

    const [email, setEmail] = React.useState('');


    //--------------------------------------------------------For Customer Login-----------------------------------------//
    const handleLoginChange = (e) => {
        const name = e.target.id;
        const value = e.target.value.trim();
        setUserData({ ...userData, [name]: value });
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const { userEmail, password } = userData;

        if (userEmail !== "" && password !== "") {

            login(userEmail, password).then((response) => {
                notifySuccess('Logged in sucessfully');
                successAudio.current.play();
                dispatch(setUser(response.full_name));
                console.log("Login User Name = ", response.full_name);
                dispatch(setUserEmail(userEmail));
                if (window.ReactNativeWebView) {
                    window.ReactNativeWebView.postMessage(JSON.stringify({ email: userEmail }));
                }

                console.log("inside then " + JSON.stringify(response));

                setTimeout(() => {
                    navigate("/dashboard");
                }, 1500);
            }).catch((err) => {
                console.log("inside catch " + JSON.stringify(err.message));
                notifyError(err.message);
                errorAudio.current.play();
            })
        } else {
            notifyWarn("Please fill all the details");
            warnAudio.current.play();
        }
    }

    //--------------------------------------------------------For Guest Login-----------------------------------------//
    const handleGuestLoginChange = (e) => {
        const name = e.target.id;
        const value = e.target.value.trim();
        setGuestUserData({ ...guestUserData, [name]: value });
    }

    const guestLogin = () => {
        // For Phone number check
        var regex = "^[0-9]+$";
        const { userName, email, phoneNumber } = guestUserData;

        if (userName !== "" && email !== "" && phoneNumber !== "") {
            if (phoneNumber.length !== 10) {
                notifyWarn("Phone Number must contain 10 numbers");
            } else if (!phoneNumber.match(regex)) {
                notifyWarn("Please enter a valid phone number");
            } else {
                let guest = {
                    name: "Guest",
                    email: 'guest@mail.com'
                };
                dispatch(setUser(guest.name));
                dispatch(setUserEmail(guest.email));
                notifySuccess('Logging in as Guest');
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1500);
            }
        } else {
            notifyWarn("Please fill all the details");
        }
    }

    const resetPassword = () => {
        console.log("Email = ", email);
        axios.post('/api/method/novelite.api.api.sendResetPasswordMailToUser', { userEmail: email })
            .then((res) => {
                notifySuccess("Please check the email for reset password Link");
                handleOpen();
                console.log("Res = ", res);
            })
            .catch((err) => {
                notifyError(err);
                console.log("Err = ", err);
            })
    }

    //----------------------------------------------------------END----------------------------------------------------//

    return (
        <PageContainer title="Login - Novel Office" description="this is Login page">
            <Box
                sx={{
                    position: 'relative',
                    '&:before': {
                        content: '""',
                        background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
                        backgroundSize: '400% 400%',
                        animation: 'gradient 15s ease infinite',
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        opacity: '0.3',
                    },
                }}
            >
                <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        lg={5}
                        xl={4}
                        display="flex"
                        justifyContent="center"
                        alignItems={{ xs: 'start', md: 'center', lg: 'center' }}
                    >
                        <Card elevation={24} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: { xs: '350px', md: '350px', lg: '450px' }, marginTop: { xs: '20%', md: '0px', lg: '0px' } }}>
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <Logo />
                            </Box>
                            <>
                                <Typography fontWeight="700" variant="h3" mb={1}>
                                </Typography>

                                {/* <Box>
                                    <Button
                                        color="primary"
                                        variant="outlined"
                                        size="large"
                                        fullWidth
                                        type="submit"
                                        onClick={handleOpen}
                                    >
                                        {open ? "Sign in as Customer" : "Sign In As Guest"}
                                    </Button>
                                </Box>
                                <Box mt={3}>
                                    <Divider>
                                        <Typography
                                            component="span"
                                            color="textSecondary"
                                            variant="h6"
                                            fontWeight="400"
                                            position="relative"
                                            px={2}
                                        >
                                            or sign in with
                                        </Typography>
                                    </Divider>
                                </Box> */}
                                {
                                    open ? (
                                        <Box>
                                            <Stack>
                                                <Box>
                                                    <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                                                    <CustomTextField id="email" type="email" variant="outlined" fullWidth autoComplete="email" onChange={(e) => { setEmail(e.target.value) }} />
                                                </Box>
                                            </Stack>
                                            <Box mt={3}>
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    size="large"
                                                    fullWidth
                                                    onClick={resetPassword}
                                                    type="submit"
                                                >
                                                    Reset Password
                                                </Button>
                                            </Box>
                                            <Box mt={3}>
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    size="large"
                                                    fullWidth
                                                    onClick={handleOpen}
                                                    type="submit"
                                                >
                                                    Go Back
                                                </Button>
                                            </Box>
                                        </Box>
                                    ) : (
                                        <form>
                                            <Stack>
                                                <Box>
                                                    <CustomFormLabel htmlFor="userEmail">Email</CustomFormLabel>
                                                    <CustomTextField id="userEmail" variant="outlined" autoComplete="userEmail" placeholder="example@gmail.com" fullWidth onChange={handleLoginChange} />
                                                </Box>
                                                <Box>
                                                    <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                                                    <CustomOutlinedInput
                                                        type={showPassword ? 'text' : 'password'}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={() => { setShowPassword(!showPassword) }}
                                                                    edge="end"
                                                                >
                                                                    {showPassword ? <IconEyeOff size="20" /> : <IconEye size="20" />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                        id="password"
                                                        onChange={handleLoginChange}
                                                        placeholder="*******"
                                                        fullWidth
                                                    />
                                                </Box>
                                            </Stack>
                                            <Box mt={3}>
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    size="large"
                                                    fullWidth
                                                    onClick={handleLogin}
                                                    type="submit"
                                                >
                                                    Sign In
                                                </Button>
                                            </Box>
                                                <Typography variant='p' sx={{float:'right', textDecoration: 'underline', cursor:'pointer'}} pt={1} onClick={handleOpen}>Reset Password</Typography>
                                        </form>
                                    )
                                }

                            </>
                        </Card>
                    </Grid>
                </Grid>
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
            </Box>
            <audio ref={successAudio} src={SuccessSound} />
            <audio ref={warnAudio} src={WarnSound} />
            <audio ref={errorAudio} src={ErrorSound} />
        </PageContainer>
    )
}
