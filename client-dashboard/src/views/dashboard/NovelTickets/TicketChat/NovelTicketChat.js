import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { Divider, Box } from '@mui/material';
import PageContainer from '../../../../components/container/PageContainer';
import AppCard from 'src/components/shared/AppCard';
import TicketChatContent from '../TicketChatContent';
import { useFrappeGetDocList } from 'frappe-react-sdk';
import { useParams } from 'react-router';
import TicketChatSender from './TicketChatSender';
import { io } from 'socket.io-client';

export default function NovelTicketChat() {

  let { id, title } = useParams();
  // console.log("Id is = ", id);

  //------------------------------------------------------Socket IO----------------------------------------------//
  // const socket = io("http://localhost:80");

  // useEffect(()=>{
  //   socket.on('connect', ()=>{
  //     socket.on('getMessage', (data)=>{
  //       console.log("Msg from server = ", data);
  //     });
  //   });

    // return ()=>{
    //   //Turning OFF
    //   socket.off("connect");
    // }
  // },[])


  //------------------------------------------------------Fetching comment List----------------------------------------------//
  const { data, error, isValidating, mutate } = useFrappeGetDocList('Comment', {
    fields: ['name', 'content', 'comment_email', 'creation', 'comment_by'],
    filters: [['reference_doctype', '=', 'Issue'], ['reference_name', '=', id]],
    // limit_start: start,
    limit: 10000,
    orderBy: {
      field: 'creation',
      order: 'asc', //desc
    },
  });
  // console.log("DocInfo = ", data);

  return (
    <PageContainer title="Tickets Chat - Novel Office" description="this is Chat page" id="ChatContainer" style={{marginTop:'5px'}}>
      <AppCard>
        {/* ------------------------------------------- */}
        {/* Left part */}
        {/* ------------------------------------------- */}

        {/*<TicketChatSidebar/>*/}
        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}

        <Box flexGrow={1}>
          <TicketChatContent data={data} title={title} id={id} />
          <Divider />
          <TicketChatSender id={id} mutate={mutate} />
        </Box>
      </AppCard>
    </PageContainer>
  )
}
