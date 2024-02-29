import React from 'react';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import NovelDashCarousel from './NovelDashCarousel';
import { useFrappeDocTypeEventListener, useFrappeEventListener } from 'frappe-react-sdk';

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
  useFrappeEventListener('comment_added', (event) => {
    console.log("Event = " + event);
  })

  useFrappeDocTypeEventListener('Comment', (d) => {
    console.log("Event D = ", d);
  })

  //? Where should we use useSWRSubscription


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
