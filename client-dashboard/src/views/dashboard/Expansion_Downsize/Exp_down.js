import React from 'react'
import PageContainer from '../../../components/container/PageContainer'
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';


const BCrumb = [
    {
        to: '/dashboard',
        title: 'Home',
    },
    {
        to: '/Expansion_Downsize',
        title: 'Expansion-Downsize',
    },
];

export default function () {

    const [action, setAction] = React.useState('Expansion');
    const [subAction, setSubAction] = React.useState('Seats');

    let value = ['Expansion', 'Downsize'];
    let subActions = ['Seats', 'Parking', 'Both', 'Other']

    const handleChange = (event) => {
        setAction(event.target.value);
    };

    const handleSubAction = (event) => {
        setSubAction(event.target.value);
    };

    return (
        <PageContainer title="Book Slots - Novel Office">
            <Breadcrumb title="Booking Slots" items={BCrumb} />
            <>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: 'auto',
                    width: { xs: "90%", md: "50%", ls: "50%" },
                }}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Expansion / Downsize</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={action}
                                label="Expansion / Downsize"
                                onChange={handleChange}
                            >
                                {
                                    value.map((element) => {
                                        return (
                                            <MenuItem value={element} key={element}>{element}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="demo-simple-select-label" >Sub action</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subAction}
                                label="Sub action"
                                onChange={handleSubAction}
                            >
                                {
                                    subActions.map((element) => {
                                        return (
                                            <MenuItem value={element} key={element}>{element}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <Box>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Description"
                                    multiline
                                    rows={2}
                                    style={{ width: '100%' }}
                                    name="description"
                                />
                            </Box>
                        </FormControl>
                        {/* <TextField id="outlined-basic" label="Seats" variant="outlined" sx={{ mt: 2 }} />
                        <TextField id="outlined-basic" label="cabins" variant="outlined" sx={{ mt: 2 }} /> */}
                    </Box>


                </Box>
            </>
        </PageContainer>
    )
}
