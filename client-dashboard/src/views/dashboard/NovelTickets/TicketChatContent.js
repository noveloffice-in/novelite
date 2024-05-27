import React, { useEffect, useRef } from 'react';
import {
    Typography,
    Divider,
    Avatar,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Box,
    Link as MuiLink,
} from '@mui/material';
import { formatDistanceToNowStrict } from 'date-fns';
import user1 from 'src/assets/images/profile/user-1.jpg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import novelLogo from '../../../assets/images/logo/novel logo.webp';
import { useSelector } from 'react-redux';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';

export default function TicketChatContent({ data, title, id }) {
    const fullName = useSelector((state) => state.novelprofileReducer.fullName);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [data]);

    const populateMessage = (comment) => {
        if (comment.attachment) {
            if (comment.attachment.split('.')[1] == 'pdf') {
                return (
                    <Box>
                        {/* Render link for PDF attachment */}
                        <MuiLink href={comment.attachment} target="_blank" rel="noopener">
                            View PDF Attachment
                        </MuiLink>
                    </Box>
                )
            }
            return (
                <Box mb={1} sx={{ overflow: 'hidden', lineHeight: '0px' }}>
                    <MuiLink href={comment.attachment} target="_blank" rel="noopener">
                        <img src={comment.attachment} alt="attach" width="150" />
                    </MuiLink>
                </Box>
            )

        } else {
            return (
                <Box
                    my={0.5}
                    sx={{
                        p: 1,
                        backgroundColor: 'grey.100',
                        mr: 'auto',
                        maxWidth: '320px',
                    }}
                >
                    {comment.message}
                </Box>
            )
        }
    }

    return (
        <Box>
            {data?.length !== 0 ? (
                <Box>
                    <Box>
                        <Box display="flex" alignItems="center" pb={1}>
                            <Typography variant="h4">Chat</Typography>
                        </Box>
                        <Divider />
                    </Box>
                    <Box display="flex">
                        <Box width="100%">
                            <Scrollbar sx={{ overflow: 'auto', maxHeight: { xs: '65vh', md: '65vh', lg: '60vh' } }}>
                                <Box sx={{ p: 3, msOverflowStyle: 'scroll', maxHeight: { xs: '100%', md: '100%', lg: '100%' } }}>
                                    {data?.map((comment, index) => (
                                        <Box key={index}>
                                            {comment.comment_by_name !== fullName ? (
                                                <Box display="flex" alignItems="center" mb={2}>
                                                    <ListItemAvatar>
                                                        <img src={novelLogo} style={{ width: '45px', height: '45px' }} />
                                                    </ListItemAvatar>
                                                    <Box>
                                                        <Typography variant="caption" color="grey.400" mb={1}>
                                                            {comment.comment_by_name}
                                                        </Typography>

                                                        {/* All messages are populated here  */}
                                                        {populateMessage(comment)}

                                                        <Typography variant="caption" color="grey.300" mb={1}>
                                                            {formatDistanceToNowStrict(
                                                                new Date(comment.date_and_time ? comment.date_and_time : new Date()),
                                                                {
                                                                    addSuffix: false,
                                                                }
                                                            )}{' '}
                                                            ago
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            ) : (
                                                <Box mb={2} display="flex" alignItems="flex-end" flexDirection="row-reverse">
                                                    <Box display="flex" flexDirection="row-reverse" alignItems="center">
                                                        <ListItemAvatar>
                                                            <Avatar src={user1} style={{ width: '45px', height: '40px', marginBottom: '1rem', marginLeft: '0.5rem' }} />
                                                        </ListItemAvatar>
                                                        <Box alignItems="flex-end" display="flex" flexDirection={'column'}>
                                                            <Typography variant="body2" color="grey.400" mb={1}>
                                                                {fullName}
                                                            </Typography>

                                                            {/* All messages are populated here  */}
                                                            {populateMessage(comment)}

                                                            <Typography variant="body2" color="grey.300" mb={1}>
                                                                {formatDistanceToNowStrict(
                                                                    new Date(comment.date_and_time ? comment.date_and_time : new Date()),
                                                                    {
                                                                        addSuffix: false,
                                                                    }
                                                                )}{' '}
                                                                ago
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                                <div ref={chatEndRef} />
                            </Scrollbar>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" p={2} pb={1} pt={1}>
                    <ListItem dense disableGutters>
                        <ListItemText primary={<Typography variant="h5">Chat</Typography>} />
                    </ListItem>
                    <Typography variant="h4">No Previous Chat</Typography>
                </Box>
            )}
        </Box>
    );
}
