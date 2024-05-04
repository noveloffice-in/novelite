import React, { useState } from 'react';
import Menuitems from './MenuItems';
import { useLocation } from 'react-router';
import { Box, List, useMediaQuery } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMobileSidebar } from 'src/store/customizer/CustomizerSlice';
import NavItem from './NavItem';
import NavCollapse from './NavCollapse';
import NavGroup from './NavGroup/NavGroup';
import { uniqueId } from 'lodash';
import { IconFileDollar, IconTicket } from '@tabler/icons';
import axios from 'axios';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  const dispatch = useDispatch();

  const [menuChanged, setMenuChanged] = useState(false);

  const fetchData = () => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        res.data.forEach(element => {
          if (element.id === 2) {
            Menuitems.forEach(ele => {
              if (ele.name !== 'Invoice' && ele.name !==  "Tickets" && ele.name !== 'Bookings') {
                ele.permission = 1;
                console.log("inside ", ele.name);
              }
            })
          }
        });
        setMenuChanged(true)
      })
  }

  fetchData();
  console.log("Fetch data = ", Menuitems);


  // if(fullName === "Guest"){
  //   Menuitems.splice(3,1);
  // } else {
  //   Menuitems.splice(3,1, {
  //     id: uniqueId(),
  //     title: 'Tickets',
  //     icon: IconTicket,
  //     href: '/tickets',
  //   });
  // }

  return (
    <Box style={{ paddingLeft: "20px", paddingRight: "24px" }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {menuChanged && Menuitems.map((item, index) => {
          // {/********SubHeader**********/}
          if (item.permission !== 0) {
            if (item.subheader) {
              return <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />;

              // {/********If Sub Menu**********/}
              /* eslint no-else-return: "off" */
            } else if (item.children) {
              return (
                <NavCollapse
                  menu={item}
                  pathDirect={pathDirect}
                  hideMenu={hideMenu}
                  pathWithoutLastPart={pathWithoutLastPart}
                  level={1}
                  key={item.id}
                  onClick={() => dispatch(toggleMobileSidebar())}
                />
              );

              // {/********If Sub No Menu**********/}
            } else {
              return (
                <NavItem
                  item={item}
                  key={item.id}
                  pathDirect={pathDirect}
                  hideMenu={hideMenu}
                  onClick={() => dispatch(toggleMobileSidebar())}
                />
              );
            }
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
