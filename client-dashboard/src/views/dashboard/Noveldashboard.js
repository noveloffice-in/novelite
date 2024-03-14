import React from 'react';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import NovelDashCarousel from './NovelDashCarousel';
import { useFrappeDocTypeEventListener, useFrappeDocumentEventListener, useFrappeEventListener } from 'frappe-react-sdk';

export default function noveldashboard() {

  const BCrumb = [
    {
      to: '/dashboard',
      title: 'Home',
    },
    {
      title: 'Dashboard',
    },
  ];

  //--------------------------------------------------------Events-----------------------------------------------------//
  useFrappeDocumentEventListener('Issue', "ISS-2024-00115", (d) => {
    console.log("Event D = ", d);
  })

  useFrappeEventListener('comment_added', (event) => {
    console.log("Event = " + event);
  })

  return (
    <PageContainer title="Dashboard - Novel Office" description="this is Cards page">
      <Breadcrumb title="Welcome to Novel Office" items={BCrumb} />
      <NovelDashCarousel />

      {/* <Stack overflow="hidden" direction={'row'}>
        <Box>
          <SliderBox>
            <img src={sliderImg} alt="slide" height={'500px'} />
          </SliderBox>
        </Box>
        <Box>
          <SliderBox>
            <img src={sliderImg} alt="slide"  height={'500px'}/>
          </SliderBox>
        </Box>
      </Stack> */}
    </PageContainer>
  )
}
