import React, { useEffect } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { IconHeart, IconPhoto, IconUserCircle } from '@tabler/icons';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProfileTabs = () => {
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);
  const adminStatus = useSelector((state) => state.novelprofileReducer.adminStatus);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const ProfileTabs = [
    {
      label: 'Profile',
      icon: <IconUserCircle size="20" />,
      to: '/customer-profile',
    },
  ];

  if (adminStatus === 'Admin') {
    let usersOption = {
      label: 'Users',
      icon: <IconUserCircle size="20" />,
      to: '/users-list',
    }
    ProfileTabs.push(usersOption);
  }


  return (
    <Box sx={{ backgroundColor: (theme) => theme.palette.grey[100] }}>
      <Box justifyContent={'center'} display="flex" sx={{ overflow: 'auto', width: { xs: '333px', sm: 'auto' } }}>
        <Tabs value={value} onChange={handleChange} aria-label="scrollable prevent tabs example" variant="scrollable"
          scrollButtons="auto">
          {ProfileTabs.map((tab) => {
            return (
              <Tab
                iconPosition="start"
                label={tab.label}
                sx={{ minHeight: '50px' }}
                icon={tab.icon}
                component={Link}
                to={tab.to}
                value={tab.to}
                key={tab.label}
              />
            );
          })}
        </Tabs>
      </Box>
    </Box>
  );
};

export default ProfileTabs;
