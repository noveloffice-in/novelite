import React from 'react';
import PageContainer from '../../components/container/PageContainer';
import WelcomeCardNovel from './DashboardElements/WelcomeCardNovel';
import { useDispatch, useSelector } from 'react-redux';
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
import { useFrappeDocTypeEventListener, useFrappeGetDoc, useFrappeGetDocList } from 'frappe-react-sdk';
import { setAccountType, setAdminStatus, setCompanyName, setLeadsID, setUserImage } from '../../store/apps/userProfile/NovelProfileSlice';

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

  const fullName = useSelector((state) => state.novelprofileReducer.fullName);
  const userEmail = useSelector((state) => state.novelprofileReducer.userEmail);
  const userName = useSelector((state) => state.novelprofileReducer.fullName)

  const dispatch = useDispatch();

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

  //Getting data from App user to set wheather user is Admin / Non-Admin
  const { data: appUserData } = useFrappeGetDoc('App Users', userEmail);
  if (appUserData) {
    dispatch(setAdminStatus(appUserData.user_type));
  }

  if (fullName !== 'Guest') {
    const getUserData = () => {
      const { data, error, isValidating, mutate } = useFrappeGetDoc(
        'User',
        `${userEmail}`
      );
      return data ? data : error;
    }

    const userData = getUserData();

    const acc_type = userData?.app_user_type;
    dispatch(setCompanyName(userData?.customer));
    // console.log("Customer = ", getUserData()?.customer);
    dispatch(setAccountType(acc_type))

    if (userData?.user_image !== undefined) {
      const userImage = userData?.user_image;
      console.log("userImage = ", userData?.user_image);
      dispatch(setUserImage(userImage))
    } else {
      dispatch(setUserImage(""))
    }
    console.log("DATA = ", userData);

    //Getting leads and setting only lead Ids in store
    const getLeadID = () => {
      const { data: customerData } = useFrappeGetDoc(
        'Customer', "Test-MR"
      );
      return customerData?.leads;
    }

    const leadsIDs = getLeadID()?.map((lead) => {
      return lead.leads
    });

    dispatch(setLeadsID(leadsIDs))
    // console.log(leadsIDs);
  }

  return (
    <PageContainer title="Dashboard - Novel Office" description="this is Cards page">
      <WelcomeCardNovel title={userName} mb={2} />
      <Queries />

      {locationData?.length > 0 &&
        <>
          <Typography variant='h3' mt={2} mb={2} pl={1} >Featured listings</Typography>
          <Box sx={{ display: "flex", flexDirection: "col", justifyContent: "center", alignItems: "streach" }}>
            <Grid container spacing={2} >
              {
                locationData.map((listing, index) => {
                  return (
                    <Grid item xs={12} sm={4} lg={4} key={listing.buildingName}>
                      <ImagesSlider key={listing.location_name} image={listing.image} name={listing.location_name} location={listing.address} />
                    </Grid>
                  )
                })
              }
            </Grid>
          </Box>
        </>
      }

      {eventData?.length > 0 &&
        <>
          <Typography variant='h3' mt={2} pl={1} >Upcoming Events</Typography>
          <Box sx={{ display: "flex", flexDirection: "col", justifyContent: "center", alignItems: "streach" }}>
            <Grid container spacing={2}>
              {eventData.map((event, index) => {
                return (
                  <Grid item xs={12} sm={6} lg={6} key={event.eventName}>
                    <NovelEvents key={event.event_name} image={event.image} name={event.event_name} date={event.starts_on} />
                  </Grid>
                )
              })}
            </Grid>
          </Box>
        </>
      }
    </PageContainer>
  )
}
