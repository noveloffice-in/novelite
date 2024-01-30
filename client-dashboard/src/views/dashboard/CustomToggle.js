import React from 'react'
import { useDispatch } from 'react-redux';
import { setDarkMode } from 'src/store/customizer/CustomizerSlice';
import Box from '@mui/material/Box';
import { Stack } from '@mui/system';
import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';

import Button from '@mui/material/Button';

export default function CustomToggle() {

    const dispatch = useDispatch();

    return (
        <div>
            <Stack direction={'row'} spacing={2} >
                <Box>
                    <Button size="small" variant="outlined" onClick={() => dispatch(setDarkMode('light'))}> <WbSunnyTwoToneIcon/> &nbsp; Light</Button>
                </Box>
                <Box>
                    <Button size="small" variant="outlined" onClick={() => dispatch(setDarkMode('dark'))}> <DarkModeTwoToneIcon/> &nbsp; Dark</Button>
                </Box>
            </Stack>
        </div>
    )
}
