import React from 'react';
import { Drawer, useMediaQuery } from '@mui/material';
import ChatListing from '../../../../components/apps/chats/ChatListing';

const drawerWidth = 320;
export default function TicketChatSidebar({ isMobileSidebarOpen, onSidebarClose }) {
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  return (
    <Drawer
    open={isMobileSidebarOpen}
    onClose={onSidebarClose}
    variant={lgUp ? 'permanent' : 'temporary'}
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      zIndex: lgUp ? 0 : 1,
      [`& .MuiDrawer-paper`]: { position: 'relative' },
    }}
  >
    <ChatListing />
  </Drawer>
  )
}
