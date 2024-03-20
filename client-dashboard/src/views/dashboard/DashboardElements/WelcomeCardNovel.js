import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconCircle } from '@tabler/icons';
import { Breadcrumbs, Grid, Link } from '@mui/material';
import { Box, Avatar, Typography } from '@mui/material';
import userImg from 'src/assets/images/profile/user-1.jpg';
import welcomeImg from 'src/assets/images/backgrounds/welcome-bg.svg';

const WelcomeCardNovel = ({ subtitle, items, title, children }) => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: 'primary.light',
        borderRadius: (theme) => theme.shape.borderRadius / 4,
        p: '40px 0px 0px 20px',
        marginBottom: '10px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Grid item xs={12} sm={6} lg={8} mb={1}>
        <Box
          gap="16px" mb={5}
          sx={{
            display: {
              xs: 'flex',
              sm: 'flex',
            },
            alignItems: 'center',
          }}
        >
          <Avatar src={userImg} alt="img" sx={{ width: {xs:30, sm:30, lg:40}, height: {xs:30, sm:30, lg:40} }} />
          <Typography variant="h5" whiteSpace="nowrap" sx={{textWrap:"pretty"}}>
            Welcome&nbsp; back&nbsp; {title}
          </Typography>
        </Box>
        <Typography color="textSecondary" variant="h6" fontWeight={400} mt={0.8} mb={0}>
          {subtitle}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} display="flex" alignItems="flex-end">
        <Box
          sx={{
            display: { xs: 'none', md: 'block', lg: 'flex' },
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%',
          }}
        >
          {children ? (
            <Box sx={{ top: '0px', position: 'absolute' }}>{children}</Box>
          ) : (
            <>
              <Box sx={{ top: '0px', position: 'absolute' }}>
                <img src={welcomeImg} alt={welcomeImg} width={'250px'} />
              </Box>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default WelcomeCardNovel;
