// SidebarItems.js
import React from 'react';
import { useSelector } from 'react-redux';
import MenuItems from './MenuItems';
// Other imports...

const SidebarItems = () => {
  // Other logic...

  const notificationCount = useSelector((state) => state.novelprofileReducer.notificationCount);

  // Use MenuItems function and pass notificationCount
  const menuItemsWithNotification = MenuItems(notificationCount);

  return (
    <Box style={{ paddingLeft: "20px", paddingRight: "24px" }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {menuItemsWithNotification.map((item, index) => {
          // Render logic for each item...
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;
