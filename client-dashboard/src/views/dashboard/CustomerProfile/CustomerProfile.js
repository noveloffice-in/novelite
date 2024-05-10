import React from 'react'
import PageContainer from '../../../components/container/PageContainer'
import { Grid, Typography } from '@mui/material'
import Banner from './Banner'
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { Stack } from '@mui/material';

import ChildCard from 'src/components/shared/ChildCard';
import { IconBriefcase, IconDeviceDesktop, IconMail, IconMapPin, IconUserCircle, IconCircles, IconLicense } from '@tabler/icons';
import { useFrappeGetDoc } from 'frappe-react-sdk';

export default function CustomerProfile() {
    const fullName = useSelector((state) => state.novelprofileReducer.fullName);
    const companyName = useSelector((state) => state.novelprofileReducer.companyName);
    const userEmail = useSelector((state) => state.novelprofileReducer.userEmail);
    // const userImage = useSelector((state) => state.novelprofileReducer.userImage);

    const { data: userData } = useFrappeGetDoc('App Users', userEmail);

    return (
        <PageContainer title="User - Novel Office" description="this is User Profile page">
            <Grid container spacing={3}>

                <Grid item sm={12}>
                    <Banner />
                </Grid>


                {userData && <Stack alignItems='center' justifyContent='center' width='100%'>
                    <Box p={1}>
                        <ChildCard>
                            <Typography fontWeight={600} variant="h4" mb={2}>
                                {userData.user_name}
                            </Typography>
                            {/* <Typography color="textSecondary" variant="subtitle2" mb={2}>
                                Hello, I am Mathew Anderson. I love making websites and graphics. Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit.
                            </Typography> */}
                            <Stack direction="row" gap={2} alignItems="center" mb={3}>
                                <IconUserCircle size="21" />
                                <Typography variant="h6"> {companyName}</Typography>
                            </Stack>
                            <Stack direction="row" gap={2} alignItems="center" mb={3}>
                                <IconMail size="21" />
                                <Typography variant="h6">{userData.user}</Typography>
                            </Stack>
                            <Stack direction="row" gap={2} alignItems="center" mb={3}>
                                <IconCircles size="21" />
                                <Typography variant="h6">{userData.user_type}</Typography>
                            </Stack>
                            <Stack direction="row" gap={2} alignItems="center" mb={3}>
                                <IconLicense size="21" />
                                <Stack direction={{xs:"column", md:"row", lg:"row"}} gap={{xs:0, md:2, lg:2}}>
                                    {
                                        userData.permissions.map((permission) => {
                                            return (
                                                <>
                                                    <Typography variant="h6">{permission.permissions}</Typography>
                                                    <br />
                                                </>
                                            )
                                        })
                                    }
                                </Stack>
                            </Stack>

                            {/* <Stack direction="row" gap={2} alignItems="center" mb={3}>
                                <IconDeviceDesktop size="21" />
                                <Typography variant="h6">www.xyz.com</Typography>
                            </Stack>
                            <Stack direction="row" gap={2} alignItems="center" mb={1}>
                                <IconMapPin size="21" />
                                <Typography variant="h6">Newyork, USA - 100001</Typography>
                            </Stack> */}
                        </ChildCard>
                    </Box>
                </Stack>}
            </Grid>
        </PageContainer>
    )
}
