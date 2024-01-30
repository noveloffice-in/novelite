import React from 'react';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import NovelDashCarousel from './NovelDashCarousel';

export default function noveldashboard() {

  const dispatch = useDispatch();
  const fullName = useSelector((state) => state.novelprofileReducer.fullName);

  const BCrumb = [
    {
      to: '/dashboard',
      title: 'Home',
    },
    {
      title: 'Dashboard',
    },
  ];

  //--------------------------------------------------------For slider-----------------------------------------//


  return (
    <PageContainer title="Dashboard - Novel Office" description="this is Cards page">
      <Breadcrumb title="Welcome to Novel Office" items={BCrumb} />
      <NovelDashCarousel/>
          
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
