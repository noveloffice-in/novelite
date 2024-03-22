import React from 'react';
import PageContainer from '../../components/container/PageContainer';
import NovelDashCarousel from './DashboardElements/NovelDashCarousel';
import WelcomeCardNovel from './DashboardElements/WelcomeCardNovel';
import { useSelector } from 'react-redux';
import Queries from './DashboardElements/Queries';
import ImagesSlider from './DashboardElements/ImagesSlider';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import NovelEvents from './DashboardElements/NovelEvents';

//Images
import ntp from '../../assets/images/dashboard/ntp.png'
import nob from '../../assets/images/dashboard/nob.png'
import noc from '../../assets/images/dashboard/noc.png'
import nbp from '../../assets/images/dashboard/nbp.png'
import noq from '../../assets/images/dashboard/noq.png'
import nom from '../../assets/images/dashboard/nom.png'
import now from '../../assets/images/dashboard/now.png'
import img from '../../assets/images/dashboard/img.png'
import img2 from '../../assets/images/dashboard/img2.png'

const listings = [
  {
    image: nom,
    buildingName: "MSR Tech Park",
    location: "Marathalli, Banglore"
  },
  {
    image: now,
    buildingName: "Novel Office Workhub",
    location: "Whitefield, Banglore"
  },
  {
    image: ntp,
    buildingName: "Novel Tech Park",
    location: "HSR Extension, Banglore"
  },
  {
    image: noc,
    buildingName: "Novel Office Central",
    location: "MG Road, Banglore"
  },
  {
    image: nbp,
    buildingName: "Novel Office Business Park",
    location: "Koramangala, Banglore"
  },
  {
    image: noq,
    buildingName: "Novel Office Queens Road",
    location: "Queens Road, Banglore"
  },
  {
    image: nob,
    buildingName: "Novel Office bridge tech park",
    location: "ITPL, Banglore"
  },
]

const event = [
  {
    image: img,
    eventName: "Novel Cricket Carnival - Corporate Title",
    date: "23rd, March 2024"
  },
  {
    image: img2,
    eventName: "Novel Badminton Carnival - Corporate Title",
    date: "23rd, April 2024"
  }
]

export default function noveldashboard() {

  const userName = useSelector((state) => state.novelprofileReducer.fullName)

  return (
    <PageContainer title="Dashboard - Novel Office" description="this is Cards page">
      <WelcomeCardNovel title={userName} mb={2}/>
      <Queries />

      <Typography variant='h3' mt={2} mb={2} pl={1} >Featured listings</Typography>
      <Box sx={{ display: "flex", flexDirection: "col", justifyContent: "center", alignItems: "streach" }}>
        <Grid container spacing={2} >
          {
            listings.map((listing, index) => {
              return (
                <Grid item xs={12} sm={4} lg={3}>
                  <ImagesSlider key={listing.location} image={listing.image} name={listing.buildingName} location={listing.location} />
                </Grid>
              )
            })
          }
        </Grid>
      </Box>

      <Typography variant='h3' mt={2} pl={1} >Upcoming Events</Typography>
      <Box sx={{ display: "flex", flexDirection: "col", justifyContent: "center", alignItems: "streach" }}>
        <Grid container spacing={2}>
          {event.map((event, index) => {
            return (
              <Grid item xs={12} sm={6} lg={6}>
                <NovelEvents key={event.eventName} image={event.image} name={event.eventName} date={event.date} />
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </PageContainer>
  )
}
