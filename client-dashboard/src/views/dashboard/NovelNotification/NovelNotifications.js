import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    IconButton,
    Box,
    Badge,
    Menu,
    MenuItem,
    Avatar,
    Typography,
    Button,
    Chip,
} from '@mui/material';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';

import { IconBellRinging } from '@tabler/icons';
import { Stack } from '@mui/system';
import { useFrappeEventListener, useFrappeGetDocList } from 'frappe-react-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { resetNotification, setNotification, setNotificationNumber, setOwner } from '../../../store/apps/notifications/NotificationSlice';
//Notification sounds
import closedTicketSound from '../../../notificationSounds/SuccessSound.wav'

const NovelNotifications = () => {
    const [anchorEl2, setAnchorEl2] = useState(null);

    //For Event 
    const userEmail = useSelector((state) => state.novelprofileReducer.userEmail);
    const notifications = useSelector((state) => state.notificationReducer.notification);
    const owner = useSelector((state) => state.notificationReducer.owner);
    const closedTicketAudio = useRef(null);

    const dispatch = useDispatch();

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    useEffect(() => {
        if (owner !== userEmail) {
            dispatch(setOwner(userEmail));
            dispatch(resetNotification());
        }
    }, [])

    //-----------------------------------------------------------Fetch Tickets for Review Pop up-----------------------------------------------//
    const { data: closedTicketData } = useFrappeGetDocList('Issue', {
        fields: ['name'],
        filters: [['raised_by', '=', userEmail], ['status', '!=', 'Closed']],
        orderBy: {
            field: 'modified',
            order: 'desc',
        },
    });

    useFrappeEventListener(`new_message`, (data) => {
        closedTicketData.forEach((ticket) => {
            if (ticket.name === data.issue_name.ticket_id) {
                //update in store
                dispatch(setNotification(data.notification));
                //Audio play
                closedTicketAudio?.current.play();
                console.log("Setting This = ", data.notification);
            }
        })
    })

    const markAsRead = () => {
        dispatch(resetNotification());
    }

    console.log("notifications = ", notifications);

    return (
        <Box>
            <IconButton
                size="large"
                aria-label="show 11 new notifications"
                color="inherit"
                aria-controls="msgs-menu"
                aria-haspopup="true"
                sx={{
                    ...(anchorEl2 && {
                        color: 'primary.main',
                    }),
                }}
                onClick={handleClick2}
            >
                <Badge badgeContent={notifications.length} color="primary">
                    <IconBellRinging size="21" stroke="1.5" />
                </Badge>
            </IconButton>
            {/* ------------------------------------------- */}
            {/* Message Dropdown */}
            {/* ------------------------------------------- */}
            <Menu
                id="msgs-menu"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                sx={{
                    '& .MuiMenu-paper': {
                        width: '360px',
                    },
                }}
            >
                <Stack direction="row" py={2} px={4} justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Notifications</Typography>
                    <Chip label={`${notifications.length} new`} color="primary" size="small" />
                </Stack>
                <Scrollbar sx={{ height: '385px' }}>

                    <Box sx={{ py: 2, px: 4 }}>
                        <Box display='flex' flexDirection='column' direction="column" spacing={2}>
                            {
                                notifications.length > 0 &&
                                notifications.map((notification) => {
                                    return (
                                        <Box>
                                            <Typography
                                                variant="body1"
                                                color="textPrimary"
                                                fontWeight={600}
                                                sx={{
                                                    width: '240px',
                                                }}
                                            >
                                                {notification}
                                            </Typography>
                                            <br />
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                    </Box>

                    {/* {dropdownData.notifications.map((notification, index) => (
                        <Box key={index}>
                            <MenuItem sx={{ py: 2, px: 4 }}>
                                <Stack direction="row" spacing={2}>
                                    <Avatar
                                        src={notification.avatar}
                                        alt={notification.avatar}
                                        sx={{
                                            width: 48,
                                            height: 48,
                                        }}
                                    />
                                    <Box>
                                        <Typography
                                            variant="subtitle2"
                                            color="textPrimary"
                                            fontWeight={600}
                                            noWrap
                                            sx={{
                                                width: '240px',
                                            }}
                                        >
                                            {notification.title}
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            variant="subtitle2"
                                            sx={{
                                                width: '240px',
                                            }}
                                            noWrap
                                        >
                                            {notification.subtitle}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </MenuItem>
                        </Box>
                    ))} */}
                </Scrollbar>
                <Box p={3} pb={1}>
                    <Button variant="outlined" color="primary" onClick={markAsRead} fullWidth>
                        Mark all as read
                    </Button>
                </Box>
                <audio ref={closedTicketAudio} src={closedTicketSound} />
            </Menu>
        </Box>
    );
};

export default NovelNotifications;
