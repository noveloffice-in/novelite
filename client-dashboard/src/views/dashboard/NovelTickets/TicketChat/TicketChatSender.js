import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, InputBase, Box, Popover } from '@mui/material';
// import Picker from 'emoji-picker-react';
import { IconPaperclip, IconPhoto, IconSend } from '@tabler/icons';
import { sendMsg } from 'src/store/apps/chat/ChatSlice';
import { useFrappeCreateDoc } from 'frappe-react-sdk';

export default function TicketChatSender({ id, mutate }) {
    const [msg, setMsg] = React.useState('');
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [chosenEmoji, setChosenEmoji] = React.useState();

    const userEmail = useSelector((state) => state.novelprofileReducer.userEmail);
    const fullName = useSelector((state) => state.novelprofileReducer.fullName);
    const { createDoc, isCompleted, } = useFrappeCreateDoc();

    useEffect(()=>{
        let checkMsg = setInterval(()=>{
            mutate();
        }, 2000);

        return ()=> clearInterval(checkMsg);
    },[])

    const onEmojiClick = (_event, emojiObject) => {
        setChosenEmoji(emojiObject);
        setMsg(emojiObject.emoji);
    };

    const handleChatMsgChange = (e) => {
        setMsg(e.target.value);
    };


    // console.log("Id is ", id);
    const formattedDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata'});
    // console.log("Date is  ", formattedDate);

    const onChatMsgSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let message = {
            reference_doctype: "Issue",
            comment_type: "Comment",
            reference_name: id,
            creation: formattedDate,
            comment_email: userEmail,
            comment_by: fullName,
            content: msg
        }
        console.log("Message = ", message);

        createDoc('Comment', message)
            .then(() => {
                console.log('Ticket created Successfully');
                mutate();
            }).catch((err) => {
                console.log("inside catch " + JSON.stringify(err.message));
                console.err(err.message);
            })
        setMsg('');
    };

    return (
        <Box p={2}>
            {/* ------------------------------------------- */}
            {/* sent chat */}
            {/* ------------------------------------------- */}
            <form
                style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
            >
                <InputBase
                    id="msg-sent"
                    fullWidth
                    value={msg}
                    placeholder="Type a Message"
                    size="small"
                    type="text"
                    inputProps={{ 'aria-label': 'Type a Message' }}
                    onChange={handleChatMsgChange}
                />
                <IconButton
                    aria-label="delete"
                    onClick={onChatMsgSubmit}
                    disabled={!msg}
                    type='submit'
                    color="primary"
                >
                    <IconSend stroke={1.5} size="20" />
                </IconButton>
            </form>
        </Box>
    );
}
