import React from 'react'
import { useParams } from 'react-router-dom'
import PageContainer from '../../../components/container/PageContainer'
import AppCard from 'src/components/shared/AppCard';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { useFrappeGetDoc } from 'frappe-react-sdk';
import { Grid, Typography } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';
import ConfirmationNumberTwoToneIcon from '@mui/icons-material/ConfirmationNumberTwoTone';
import ChildCard from '../../../components/shared/ChildCard';
import LocalParkingTwoToneIcon from '@mui/icons-material/LocalParkingTwoTone';


const BCrumb = [
  {
    to: '/dashboard',
    title: 'Home',
  },
  {
    to: '/visitor_pass',
    title: 'Visitor parking pass',
  },
  {
    title: 'Pass Details',
  },
];

export default function PassDetails() {
  const { id } = useParams()
  const { data } = useFrappeGetDoc('Visitor Parking Pass', `${id}`);
  
  return (
    <PageContainer title="Visitor pass" description="this is Visitor pass page">
      <Breadcrumb title="Visitor Pass Details" items={BCrumb} />
      <AppCard>
        <Container sx={{ display: 'flex', flexDirection: { xs: "column", md: "row", ls: "row" }, gap: 2, width: '100%', p: 2 }}>
          {/* Left part */}
          {data && <Left data={data}/>}
          {/* Right part */}
          {data && <Right qrCode={data.custom_qr_code}/>}
        </Container>
      </AppCard>
    </PageContainer>
  )
}

function Left({data}) {
  return (
    <ChildCard sx={{ width: '50%' }}>
      <Box p={2}>
        <Typography variant="h4">Visitor Parking Details</Typography>
        <Box>
          <Box p={3}>
            <Box display="flex" alignItems="center">
              <LocalParkingTwoToneIcon sx={{ width: '70px', height: '70px' }} />

              <Box sx={{ ml: 2 }}>
                <Typography variant="h6" mb={0.5}>
                  {data.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={0.5}>
                  {data.visit_location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.customer_email}
                </Typography>
              </Box>
            </Box>
            <Grid container>
              <Grid item lg={6} xs={12} mt={4}>
                <Typography variant="body2" color="text.secondary">
                  Visitor Name
                </Typography>
                <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                  {data.visitor_name}
                </Typography>
              </Grid>
              <Grid item lg={6} xs={12} mt={4}>
                <Typography variant="body2" color="text.secondary">
                  Visitor Email
                </Typography>
                <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                  {data.visitor_email}
                </Typography>
              </Grid>
              <Grid item lg={12} xs={12} mt={4}>
                <Typography variant="body2" color="text.secondary">
                  Visit Date
                </Typography>
                <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                  {data.visit_date}
                </Typography>
              </Grid>
              <Grid item lg={6} xs={12} mt={4}>
                <Typography variant="body2" color="text.secondary">
                  Visit Time
                </Typography>
                <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                  {data.visit_time}
                </Typography>
              </Grid>
              <Grid item lg={6} xs={12} mt={4}>
                <Typography variant="body2" color="text.secondary">
                  Vehicle Type
                </Typography>
                <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                  {data.vehicle_type}
                </Typography>
              </Grid>
              <Grid item lg={12} xs={12} mt={4}>
                <Typography variant="body2" mb={1} color="text.secondary">
                  Vehicle Number
                </Typography>
                <Typography variant="subtitle1" mb={0.5}>
                  {data.vehicle_no}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </ChildCard>
  )
}

function Right({qrCode}) {

  return (
    <ChildCard sx={{ width: '50%', height:'100%' }}>
      <Box display='flex' alignItems='center' justifyContent="center" p={2}>
      {qrCode ? <img src={qrCode} alt='qr Code'/>
      :
      <Typography variant='h4'>No QR Code</Typography>}
      </Box>
    </ChildCard>
  )
}