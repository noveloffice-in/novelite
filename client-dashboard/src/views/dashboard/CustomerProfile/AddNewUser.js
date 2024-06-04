import { Checkbox, FormControl, FormControlLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'

export default function AddNewUser({ errorField, handleInput, permissions, handleCheckboxChange }) {

    const permissionList = [
        { component: 'Invoice' },
        { component: 'Bookings' },
        { component: 'Expansion/Downsize' },
    ]

    return (
        <Box component="form">
            <Box>

                {/* First Name */}
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                    <TextField
                        label="First Name"
                        id="outlined-required"
                        name='first_name'
                        required
                        onChange={handleInput}
                        error={errorField === 'first_name'}
                    />
                </FormControl>

                {/* Last Name */}
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                    <TextField
                        label="Last Name"
                        id="outlined-required"
                        name='last_name'
                        required
                        onChange={handleInput}
                        error={errorField === 'last_name'}
                    />
                </FormControl>

                {/* Email */}
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                    <TextField
                        label="Email"
                        id="outlined-required"
                        name='email'
                        required
                        onChange={handleInput}
                        error={errorField === 'email'}
                    />
                </FormControl>

                {/* Permissions */}
                <Typography py={1} variant='h5'>Permissions</Typography>
                <Box px={2}>

                    {permissionList.map((element) => {
                        return (
                            <FormControlLabel
                                key={element.component}
                                control={<Checkbox />}
                                label={element.component}
                                onChange={() => handleCheckboxChange(element.component)}
                            />
                        );
                    })}
                </Box>

            </Box>
        </Box>
    )
}
