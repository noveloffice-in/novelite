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
import { useFrappeGetDocList } from 'frappe-react-sdk';

const listings = [
  {
    image: nom,
    buildingName: "MSR Tech Park",
    location: "Marathalli, Banglore" //Done
  },
  {
    image: now,
    buildingName: "Novel Office Workhub",
    location: "Whitefield, Banglore"
  },
  {
    image: ntp,
    buildingName: "Novel Tech Park",
    location: "HSR Extension, Banglore" //Done
  },
  {
    image: noc,
    buildingName: "Novel Office Central",
    location: "MG Road, Banglore" //Done
  },
  {
    image: nbp,
    buildingName: "Novel Office Business Park",
    location: "Koramangala, Banglore"
  },
  {
    image: noq,
    buildingName: "Novel Office Queens Road",
    location: "Queens Road, Banglore" //done
  },
  {
    image: nob,
    buildingName: "Novel Office brigade tech park",
    location: "ITPL, Banglore" //Done
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

  const { data: locationData } = useFrappeGetDocList('Room Locations', {
    fields: ['location_name', 'image', 'address'],
    filters: [],
    orderBy: {
      field: 'name',
      order: 'asc',
    },
  })

  const { data: eventData } = useFrappeGetDocList('Novel Events', {
    fields: ['event_name', 'starts_on', 'image'],
    orderBy: {
      field: 'name',
      order: 'asc',
    },
  })

  console.log("Event Data = ", eventData);

  const userName = useSelector((state) => state.novelprofileReducer.fullName)

  return (
    <PageContainer title="Dashboard - Novel Office" description="this is Cards page">
      <WelcomeCardNovel title={userName} mb={2} />
      <Queries />

      <Typography variant='h3' mt={2} mb={2} pl={1} >Featured listings</Typography>
      <Box sx={{ display: "flex", flexDirection: "col", justifyContent: "center", alignItems: "streach" }}>
        <Grid container spacing={2} >
          {
            locationData && locationData.map((listing, index) => {
              return (
                <Grid item xs={12} sm={4} lg={4} key={listing.buildingName}>
                  <ImagesSlider key={listing.location_name} image={listing.image} name={listing.location_name} location={listing.address} />
                </Grid>
              )
            })
          }
        </Grid>
      </Box>

      <Typography variant='h3' mt={2} pl={1} >Upcoming Events</Typography>
      <Box sx={{ display: "flex", flexDirection: "col", justifyContent: "center", alignItems: "streach" }}>
        <Grid container spacing={2}>
          {eventData && eventData.map((event, index) => {
            return (
              <Grid item xs={12} sm={6} lg={6} key={event.eventName}>
                <NovelEvents key={event.event_name} image={event.image} name={event.event_name} date={event.starts_on} />
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </PageContainer>
  )
}
