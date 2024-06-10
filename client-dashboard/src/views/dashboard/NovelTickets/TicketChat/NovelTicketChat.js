import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { Divider, Box, Typography } from '@mui/material';
import PageContainer from '../../../../components/container/PageContainer';
import AppCard from 'src/components/shared/AppCard';
import TicketChatContent from './TicketChatContent';
import { useFrappeEventListener, useFrappeUpdateDoc } from 'frappe-react-sdk';
import { useParams } from 'react-router';
import TicketChatSender from './TicketChatSender';
import { io } from 'socket.io-client';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from '@mui/system';

export default function NovelTicketChat({ id, title, status }) {

  const [issueMessages, setIssueMessages] = useState([])
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchChats()
  }, []);

  useFrappeEventListener(`new_notification`, (data) => {
    console.log("Event Data = ", data);
    setTimeout(() => {
      fetchChats()
    }, 500);
  })

  //------------------------------------------------------getting Messages----------------------------------------------//
  const fetchChats = () => {
    axios.post('/api/method/novelite.api.issue_comment_for_client.get_ticket_by_id', { issue_id: id })
      .then((res) => {
        setIssueMessages(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
  };

  //------------------------------------------------------getting Messages----------------------------------------------//
  const updateSeen = () => {
    axios.post('/api/method/novelite.api.issue_comment_for_client.update_seen_by_customer', { issue_id: id })
      .then((res) => {
        console.log('Seen');
      })
      .catch((err) => {
        console.log(err);
      })
  };

  if (issueMessages.length !== 0) {
    return (
      // <PageContainer title="Tickets Chat - Novel Office" description="this is Chat page" id="ChatContainer" style={{ marginTop: '5px' }}>
      <Box >
        {/* ------------------------------------------- */}
        {/* Left part */}
        {/* ------------------------------------------- */}

        {/*<TicketChatSidebar/>*/}
        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}

        <Box flexGrow={1}>
          <TicketChatContent data={issueMessages.all_messages} title={title} id={id} />
          <Divider />
          {status !== "Closed" && <TicketChatSender id={id} fetchChats={fetchChats} issueMessages={issueMessages} />}
        </Box>
      </Box>
      // </PageContainer>
    )
  } else {
    return (
      <Stack alignItems='center' justifyContent="center" height='100%' width='100%'>
        {!error && <CircularProgress />}
        {error && <Typography> Chats not found for this Ticket</Typography>}
      </Stack>
    )
  }
}
