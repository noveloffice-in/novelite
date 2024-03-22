import React from 'react';
import { Box, IconButton, useMediaQuery, Link } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconWorld
} from '@tabler/icons';
import XIcon from '@mui/icons-material/X';

const SocialIcons = [
  {
    name: 'Facebook',
    icon: <IconBrandFacebook size="18" color="#1877F2" />,
    link: "https://www.facebook.com/NovelOfficeIND/?utm_source=Ticket_Booking&utm_medium=App"
  },
  {
    name: 'Website',
    icon: <IconWorld size="18" color="#4dbbea" />,
    link: "https://noveloffice.in/?utm_source=Ticket_Booking&utm_medium=App"
  },
  {
    name: 'Instagram',
    icon: <IconBrandInstagram size="18" color="#D7336D" />,
    link: "https://www.instagram.com/noveloffice.in?igsh=cGwxdjVrcnh6dzRp&utm_source=Ticket_Booking&utm_medium=App"
  },
  {
    name: 'Twitter',
    icon: <XIcon sx={{fontSize:'medium'}} color="secondary" />,
    link: "https://twitter.com/Novel_Office?utm_source=Ticket_Booking&utm_medium=App"
  },
  {
    name: 'LinkedIn',
    icon: <IconBrandLinkedin size="18" color="#006097" />,
    link: "https://www.linkedin.com/company/novel-office-india/?utm_source=Ticket_Booking&utm_medium=App"
  }
];

export const Profile = () => {
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';

  return (
    <Box
      display={'flex'}
      alignItems="center"
      justifyContent="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >
      {!hideMenu ? (
        <>
          <Box>
            {SocialIcons.map((sicon) => {
              return <IconButton key={sicon.name}> <Link href={sicon.link} target="_blank">{sicon.icon}</Link> </IconButton>;
            })}
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
    // <></>
  );
};
