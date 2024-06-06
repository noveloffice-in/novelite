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
import novelLogo from '../../../../assets/images/logo/novel logo.webp';
import { useSelector } from 'react-redux';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';

export default function TicketChatContent({ data, title, id }) {
    const fullName = useSelector((state) => state.novelprofileReducer.fullName);
    const userImage = useSelector((state) => state.novelprofileReducer.userImage);
    const userEmail = useSelector((state) => state.novelprofileReducer.userEmail);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [data]);

    const populateMessage = (comment) => {
        if (comment.attachment) {
            const fileExtension = comment.attachment.split('.').pop().toLowerCase();
            if (['pdf', 'doc', 'docx', 'msword', 'document', 'ms-doc'].includes(fileExtension)) {
                return (
                    <Box>
                        {/* Render link for PDF attachment */}
                        <MuiLink href={comment.attachment} target="_blank" rel="noopener">
                            {comment.attachment.split('/')[2]}
                        </MuiLink>
                    </Box>
                )
            } else if (['mov', 'mp4', 'webm'].includes(fileExtension)) {
                return (
                    <Box sx={{ backgroundColor: 'grey.100', padding: "1rem" }}>
                        <video width="320" controls>
                            <source src={comment.attachment} type={`video/${fileExtension}`} />
                            Your browser does not support the video tag.
                        </video>
                        {comment.message &&
                            <Box my={0.5}
                                sx={{
                                    p: 1,
                                    maxWidth: '320px',
                                }}>
                                <Typography>{comment.message}</Typography>
                            </Box>
                        }
                    </Box>
                )
            }
            return (
                <Box mb={1} sx={{ overflow: 'hidden', lineHeight: '0px', backgroundColor: 'grey.100', maxWidth: '320px', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: "center", padding: comment.message ? "1rem" : "0rem" }}>
                    <MuiLink href={comment.attachment} target="_blank" rel="noopener">
                        <img src={comment.attachment} alt="attach" width="150" />
                    </MuiLink>
                    {comment.message &&
                        <Box my={0.5}
                            sx={{
                                p: 1,
                                maxWidth: '320px',
                            }}>
                            <Typography>{comment.message}</Typography>
                        </Box>
                    }
                </Box>
            )

        } else {
            return (
                <Box
                    my={0.5}
                    sx={{
                        p: 1,
                        backgroundColor: 'grey.100',
                        maxWidth: '320px',
                    }}
                >
                    {comment.message}
                </Box>
            )
        }
    }

    console.log("Data = ", data);

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
                                            {comment.comment_by_email !== userEmail ? (
                                                <Box display="flex" alignItems="center" mb={2}>
                                                    {
                                                        comment.comment_by_email.includes('noveloffice') ?
                                                            <ListItemAvatar>
                                                                <img src={novelLogo} style={{ width: '45px', height: '45px' }} />
                                                            </ListItemAvatar> :
                                                            <Avatar style={{ width: '45px', height: '45px', marginRight: '0.5rem' }} >{comment.comment_by_name.substring(0, 1)}</Avatar>
                                                    }
                                                    <Box>
                                                        <Typography variant="caption" color="grey.400" mb={1}>
                                                            {comment.comment_by_name}
                                                        </Typography>

                                                        {/* All messages are populated here  */}
                                                        {populateMessage(comment)}

                                                        <Typography variant="caption" color="grey.300" mt={0.5} mb={1}>
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
                                                            <Avatar src={userImage !== '' ? userImage : user1} alt={user1} style={{ width: '45px', height: '45px', marginLeft: '0.5rem' }} />
                                                        </ListItemAvatar>
                                                        <Box alignItems="flex-end" display="flex" flexDirection={'column'}>
                                                            <Typography variant="body2" color="grey.400" mb={1}>
                                                                {fullName}
                                                            </Typography>

                                                            {/* All messages are populated here  */}
                                                            {populateMessage(comment)}

                                                            <Typography variant="body2" color="grey.300" mt={0.5} mb={1}>
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
