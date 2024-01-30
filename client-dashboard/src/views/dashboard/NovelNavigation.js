import React, { useState } from 'react'
import { Button, Chip, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useDispatch, useSelector } from 'react-redux';
import { useFrappeGetDoc } from 'frappe-react-sdk';
import { Box, width } from '@mui/system';

//For select
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { setLocation } from '../../store/apps/userProfile/NovelProfileSlice';

import Sun from '@mui/icons-material/LightMode';

//For Select
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

//For Select
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function NovelNavigation() {

  const dispatch = useDispatch();
  const [globalLocation, setGlobalLocation] = useState("Property Location");

  const fullName = useSelector((state) => state.novelprofileReducer.fullName);

  //--------------------------------------------------------Fetch Lead's Locations-----------------------------------------//
  // const getLeadsId = () => {
  //   if (userName !== 'Guest') {
  //     const { data, error, isValidating, mutate } = useFrappeGetDoc(
  //       'Customer',
  //       `${userName}`
  //     );
  //     return data?.leads.map(lead => lead.confirmed_location);
  //   }
  //   return [];
  // }

  // var confirmedLocations = getLeadsId();
  // if (confirmedLocations !== undefined) {
  //   if (confirmedLocations.length !== 0) {
  //     let userLocation = confirmedLocations[0];
  //     dispatch(setLocation(userLocation));
  //   }
  // }
  // console.log("confirmedLocations = ", confirmedLocations);


  //--------------------------------------------------------Select----------------------------------------------------------//
  const theme = useTheme();

  // const handleChange = (event) => {
  //   const { target: { value }, } = event;
  //   localStorage.setItem('location', value);
  //   setGlobalLocation(value);
  //   if (globalLocation !== "Property Location") {
  //     dispatch(setLocation(value));
  //     console.log("value = ", value);
  //     console.log("globalLocation = ", globalLocation);
  //   }
  //   // setPersonName(
  //   //   // On autofill we get a stringified value.
  //   //   typeof value === 'string' ? value.split(',') : value,
  //   // );
  // };

  //--------------------------------------------------------END-----------------------------------------------------------//

  return (
    <>
      {/* <Button variant="outlined" color="primary">
        beta
      </Button> */}

      {/* Select  */}
      {/* {(userName !== 'Guest' && confirmedLocations !== undefined) &&
        <Box>
          {confirmedLocations?.length === 1 ?
            <Typography variant='h6'>Property Location: {confirmedLocations[0]}</Typography>
            :
            <FormControl sx={{ m: 1, width: 200 }}>
              <Select
                displayEmpty
                value={globalLocation}
                onChange={handleChange}
                input={<OutlinedInput />}
                // MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{ height: 30 }}
              >
                <MenuItem value="Property Location"> Property Location </MenuItem>
                {confirmedLocations?.map((location, index) => (
                  <MenuItem
                    key={index}
                    value={location}
                  // style={getStyles(location, personName, theme)}
                  >
                    {location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>}
        </Box>} */}
    </>
  )
}
