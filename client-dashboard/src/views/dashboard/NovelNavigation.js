import React, { useEffect, useState } from 'react'
import { Button, Chip, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useDispatch, useSelector } from 'react-redux';
import { useFrappeGetDoc } from 'frappe-react-sdk';
import { Box, Stack, width } from '@mui/system';

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
  const fullName = useSelector((state) => state.novelprofileReducer.fullName);

  //--------------------------------------------------------Select----------------------------------------------------------//
  const theme = useTheme();

  //--------------------------------------------------------END-----------------------------------------------------------//

  return (
    <>
    </>
  )
}
