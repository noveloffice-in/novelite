import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { Divider, Box, Typography } from '@mui/material';
import PageContainer from '../../../../components/container/PageContainer';
import AppCard from 'src/components/shared/AppCard';
import TicketChatContent from '../TicketChatContent';
import { useFrappeDocTypeEventListener, useFrappeDocumentEventListener, useFrappeEventListener, useFrappeGetDoc, useFrappeGetDocList, useFrappeUpdateDoc } from 'frappe-react-sdk';
import { useParams } from 'react-router';
import TicketChatSender from './TicketChatSender';
import { io } from 'socket.io-client';

export default function NovelTicketChat({ id, title, status }) {

  // let { id, title } = useParams();
  // console.log("Id is = ", id);

  //To update unread messages as read
  const { updateDoc } = useFrappeUpdateDoc();

  useEffect(() => {
    if (status !== 'Closed') {
      updateDoc('Issue Comment For Client', id, { unread_messages: 0 });
    }
  }, [id])


  //------------------------------------------------------Fetching comment List----------------------------------------------//
  // const { data, error, isValidating, mutate } = useFrappeGetDocList('Comment', {
  //   fields: ['name', 'content', 'comment_email', 'creation', 'comment_by'],
  //   filters: [['reference_doctype', '=', 'Issue'], ['reference_name', '=', id]],
  //   // limit_start: start,
  //   limit: 10000,
  //   orderBy: {
  //     field: 'creation',
  //     order: 'asc', //desc
  //   },
  // });

  //------------------------------------------------------getting Messages----------------------------------------------//
  const { data: issueMessages, mutate } = useFrappeGetDoc('Issue Comment For Client', id);
  // console.log("issueMessages = ", issueMessages);

  // console.log("DocInfo = ", data);

  // useFrappeDocTypeEventListener('Issue', (e) => {
  //   console.log(e);
  // })

  // useFrappeDocumentEventListener('Issue', id, (d) => {
  //   console.log("Event D = ", d);
  // })

  // useFrappeEventListener('comment_added', (data) => {
  //   console.log("Event = " + data);
  // })

  if (issueMessages) {
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
          {status !== "Closed" && <TicketChatSender id={id} mutate={mutate} />}
        </Box>
      </Box>
      // </PageContainer>
    )
  } 
  return (
    <Typography> Chats not found for this Ticket</Typography>
  )
}
