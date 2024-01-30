import React from 'react'
import PageContainer from '../../components/container/PageContainer'
import { Box, Typography, Button, Grid, Card } from '@mui/material';
import { Stack } from '@mui/system';
import CustomFormLabel from '../../components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import { Link } from 'react-router-dom';
import Logo from '../../layouts/full/shared/logo/Logo';

import { useFrappeCreateDoc } from 'frappe-react-sdk'

const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

export default function NovelSignup() {

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

	const userData = {
		user_type: "Guest",
		customer: null,
		name1: "sample",
		email: "sample@gmail.com",
		password: "123",
	}
    const { createDoc, isCompleted, error } = useFrappeCreateDoc();

    const signUpUser = ()=>{
        createDoc('Client Main', userData);
    }

    return (
        <PageContainer title="Register" description="this is Register page">
            <Box
                sx={{
                    position: 'relative',
                    '&:before': {
                        content: '""',
                        background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
                        backgroundSize: '400% 400%',
                        animation: 'gradient 15s ease infinite',
                        position: 'absolute',
                        height: 'auto',
                        width: '100%',
                        opacity: '0.3',
                    },
                }}
            >
                <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        lg={5}
                        xl={4}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Card elevation={9} sx={{ p: 4, m: 3, zIndex: 1, width: '100%', maxWidth: '450px' }}>
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <Logo />
                            </Box>
                            <>
                                {/* <Typography fontWeight="700" variant="h3" mb={1}>
                                    Novel
                                </Typography> */}

                                <Box>
                                    <Stack mb={3}>
                                        <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
                                        <CustomTextField id="name" variant="outlined" fullWidth />
                                        <CustomFormLabel htmlFor="email">Email Adddress</CustomFormLabel>
                                        <CustomTextField id="email" variant="outlined" fullWidth />
                                        <CustomFormLabel htmlFor="phone">Phone Number</CustomFormLabel>
                                        <CustomTextField id="phone" variant="outlined" fullWidth />
                                        <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                                        <CustomTextField id="password" variant="outlined" fullWidth />
                                        <CustomFormLabel htmlFor="password">Confirm Password</CustomFormLabel>
                                        <CustomTextField id="confirmPassword" variant="outlined" fullWidth />
                                        {/* <Box mt={3}>
                                            <ButtonGroup variant="outlined" ref={anchorRef} aria-label="split button">
                                                <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                                                <Button
                                                    size="small"
                                                    aria-controls={open ? 'split-button-menu' : undefined}
                                                    aria-expanded={open ? 'true' : undefined}
                                                    aria-label="select merge strategy"
                                                    aria-haspopup="menu"
                                                    onClick={handleToggle}
                                                >
                                                    <ArrowDropDownIcon />
                                                </Button>
                                            </ButtonGroup>
                                            <Popper
                                                sx={{
                                                    zIndex: 1,
                                                }}
                                                open={open}
                                                anchorEl={anchorRef.current}
                                                role={undefined}
                                                transition
                                                disablePortal
                                            >
                                                {({ TransitionProps, placement }) => (
                                                    <Grow
                                                        {...TransitionProps}
                                                        style={{
                                                            transformOrigin:
                                                                placement === 'bottom' ? 'center top' : 'center bottom',
                                                        }}
                                                    >
                                                        <Paper>
                                                            <ClickAwayListener onClickAway={handleClose}>
                                                                <MenuList id="split-button-menu" autoFocusItem>
                                                                    {options.map((option, index) => (
                                                                        <MenuItem
                                                                            key={option}
                                                                            disabled={index === 2}
                                                                            selected={index === selectedIndex}
                                                                            onClick={(event) => handleMenuItemClick(event, index)}
                                                                        >
                                                                            {option}
                                                                        </MenuItem>
                                                                    ))}
                                                                </MenuList>
                                                            </ClickAwayListener>
                                                        </Paper>
                                                    </Grow>
                                                )}
                                            </Popper>
                                        </Box> */}
                                    </Stack>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        component={Link}
                                        to="/Login"
                                    >
                                        Sign Up
                                    </Button>
                                </Box>
                                <Stack direction="row" spacing={1} mt={3}>
                                    <Typography color="textSecondary" variant="h6" fontWeight="400">
                                        Already have an Account?
                                    </Typography>
                                    <Typography
                                        component={Link}
                                        to="/Login"
                                        fontWeight="500"
                                        sx={{
                                            textDecoration: 'none',
                                            color: 'primary.main',
                                        }}
                                    >
                                        Sign In
                                    </Typography>
                                </Stack>
                            </>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    )
}
