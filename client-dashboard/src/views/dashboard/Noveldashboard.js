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
import nom from '../../assets/images/dashboard/nom.png'
import img from '../../assets/images/dashboard/img.png'
import img2 from '../../assets/images/dashboard/img2.png'

const listings = [
  {
    image: nom,
    buildingName: "NOM",
    location: "Marathalli"
  },
  {
    image: ntp,
    buildingName: "NOM",
    location: "Marathalli"
  },
  {
    image: nob,
    buildingName: "NOM",
    location: "Marathalli"
  },
  {
    image: ntp,
    buildingName: "NOM",
    location: "Marathalli"
  },
  {
    image: ntp,
    buildingName: "NOM",
    location: "Marathalli"
  },
  {
    image: ntp,
    buildingName: "NOM",
    location: "Marathalli"
  },
  {
    image: ntp,
    buildingName: "NOM",
    location: "Marathalli"
  }
]

const event = [
  {
    image: img,
    eventName: "cricket"
  },
  {
    image: img2,
    eventName: "cricket"
  }
]

export default function noveldashboard() {

  const userName = useSelector((state) => state.novelprofileReducer.fullName)

  return (
    <PageContainer title="Dashboard - Novel Office" description="this is Cards page">
      <WelcomeCardNovel title={userName} />
      <Queries />
      
      <Typography variant='h3'mt={3} ml={2} >Featured listings</Typography>
      <Box sx={{ display: "flex", flexDirection: "col", justifyContent: "center", alignItems: "streach" }}>
        <Grid container spacing={2} margin="auto" gap={0}>
          {
            listings.map((listing, index) => {
              return (
                <Grid item xs={12} sm={4} lg={3}>
                  <ImagesSlider image={listing.image} name={listing.buildingName} />
                </Grid>
              )
            })
          }
        </Grid>
      </Box>

      <Typography variant='h3'mt={3} ml={2} >Upcoming Events</Typography>
      <Box sx={{ display: "flex", flexDirection: "col", justifyContent: "center", alignItems: "streach" }}>
        <Grid container spacing={2} margin="auto">
          {event.map((event, index) => {
            return (
              <Grid item xs={12} sm={6} lg={6}>
                <NovelEvents image={event.image} name={event.eventName} />
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </PageContainer>
  )
}
