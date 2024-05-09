import React, { useEffect, useState } from 'react';
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
import { useFrappeGetDoc } from 'frappe-react-sdk';

const SidebarItems = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const userEmail = useSelector((state) => state.novelprofileReducer.userEmail);
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  const [menuChanged, setMenuChanged] = useState(false);

  useEffect(() => {
    fetchData();
  }, [])

   //-------------------------------------------------Fetching App Users and permissions-----------------------------------------//
  const fetchData = () => {
    axios.post('/api/method/novelite.api.user_permissions.get_document_by_email', { user_email: userEmail })
      .then((res) => {
        res.data.message.permissions.forEach((element) => {
          Menuitems.forEach((component) => {
            if (component.name === element.permissions) {
              component.permission = 1;
            }
          })
        })
        setMenuChanged(true)
      })
  }

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
