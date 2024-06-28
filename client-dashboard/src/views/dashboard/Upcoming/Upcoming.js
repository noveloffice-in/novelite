import React from 'react'
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import { Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';


export default function Upcoming({ tittle, bookings }) {
    const BCrumb = [
        {
            to: '/dashboard',
            title: 'Home',
        },
        {
            title: `${tittle}`,
        },
    ];


    return (
        <PageContainer title={`${tittle} - Novel Office`} description={`this is ${tittle} page`}>
            {/* breadcrumb */}
            <Breadcrumb title={tittle} items={BCrumb} />

            <Stack sx={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 10 }}>
                <Typography variant='h3'>
                    {bookings.heading}
                </Typography>
                <Box sx={{maxWidth:800}}>
                    <Typography variant='p'>
                        {bookings.content}
                    </Typography>
                </Box>
            </Stack>

        </PageContainer>
    )
}
