import React from 'react';
import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import img1 from 'src/assets/images/profile/user-1.jpg';
import { IconPower } from '@tabler/icons';
import {Link, useNavigate} from "react-router-dom";
import { useFrappeAuth } from 'frappe-react-sdk';
import { setUser } from '../../../../../store/apps/userProfile/NovelProfileSlice';

export const Profile = () => {
  const customizer = useSelector((state) => state.customizer);
  const userImage = useSelector((state) => state.novelprofileReducer.userImage);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
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

  const fullName = useSelector((state) => state.novelprofileReducer.fullName);

  const handleLogout = ()=>{
    logout();
    dispatch(setUser(undefined));
    localStorage.clear();
    setTimeout(() => {
      navigate("/Login");
    }, 500);
  }

  return (
    // <Box
    //   display={'flex'}
    //   alignItems="center"
    //   gap={2}
    //   sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    // >
    //   {!hideMenu ? (
    //     <>
    //       <Avatar alt="Remy Sharp" src={userImage !== "" ? userImage : img1} />

    //       <Box>
    //         <Typography variant="h6"  color="textPrimary">{fullName.split(' ')[0]}</Typography>
    //         {/* <Typography variant="caption" color="textSecondary">Designer</Typography> */}
    //       </Box>
    //       <Box sx={{ ml: 'auto' }}>
    //         <Tooltip title="Logout" placement="top">
    //           <IconButton color="primary" onClick={handleLogout} aria-label="logout" size="small">
    //             <IconPower size="20" />
    //           </IconButton>
    //         </Tooltip>
    //       </Box>
    //     </>
    //   ) : (
    //     ''
    //   )}
    // </Box>
    <></>
  );
};
