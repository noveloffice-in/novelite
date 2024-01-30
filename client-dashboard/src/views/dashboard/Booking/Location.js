import React from 'react';
import { Link } from 'react-router-dom';
import {
    CardContent,
    Typography,
    Grid,
    Stack,
    Skeleton,
} from '@mui/material';
import img1 from 'src/assets/images/products/s4.jpg';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import BlankCard from '../../../components/shared/BlankCard';
import { useDispatch } from 'react-redux';
import { setBookingLocation } from '../../../store/apps/bookings/BookingsSlice';
import { useFrappeGetDocList } from 'frappe-react-sdk';

export default function Location() {
    const [isLoading, setLoading] = React.useState(false);
    const dispatch = useDispatch();

    const BCrumb = [
        {
            to: '/dashboard',
            title: 'Home',
        },
        {
            to: '/location',
            title: 'Location',
        }
    ];

    //--------------------------------------------------------Fetch Slots------------------------------------------------------//
    const { data } = useFrappeGetDocList('Room Locations', {
        fields: ['name', 'image'],
        // filters: [['date', '=', filterDate], ['rooms', '=', roomName], ['location', '=', 'NTP']],
        limit_start: 0,
        limit: 100,
    });
    //-----------------------------------------------------------END---------------------------------------------------------//

    return (
        <PageContainer title="Location - Novel Office">
            <Breadcrumb title="Location" items={BCrumb} />
            {/* <Grid container spacing={3}>
                {ecoCard.map((product, index) => (
                    <Grid item xs={12} sm={4} lg={3} key={index}>
                        <BlankCard>
                            <Typography component={Link} to="/category" onClick={() => { dispatch(setBookingLocation(product.title)) }}>
                                {isLoading ? (
                                    <Skeleton variant="square" animation="wave" width="100%" height={270}></Skeleton>
                                ) : (
                                    <img src={product.photo} alt="img" width="100%" />
                                )}
                            </Typography>
                            <CardContent sx={{ p: 3, pt: 2 }}>
                                <Typography variant="h6">{product.title}</Typography>
                                <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                                    <Stack direction="row" alignItems="center">
                                        <Typography variant="h6">{product.subheader}</Typography>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </BlankCard>
                    </Grid>
                ))}
            </Grid> */}
            {/* <img src={locationData?.images[0].link_image}/> */}
            <Grid container spacing={3}>
                {data?.map((location, index) => (
                    <Grid item xs={12} sm={4} lg={3} key={location.name + index}>
                        <BlankCard>
                            {location.image ? <Typography component={Link} to="/category" onClick={() => { dispatch(setBookingLocation(location.name)) }}>
                                {isLoading ? (
                                    <Skeleton variant="square" animation="wave" width="100%" height={270}></Skeleton>
                                ) : (
                                    <img src={location.image} alt="img" width="100%" />
                                )}
                            </Typography> :
                                <Typography component={Link} to="/category" onClick={() => { dispatch(setBookingLocation(location.name)) }}>
                                    {isLoading ? (
                                        <Skeleton variant="square" animation="wave" width="100%" height={270}></Skeleton>
                                    ) : (
                                        <img src={img1} alt="img" width="100%" />
                                    )}
                                </Typography>
                            }
                            <CardContent sx={{ p: 3, pt: 2 }}>
                                {/* <Button variant='outlined' component={Link} to="/category" onClick={() => { dispatch(setBookingLocation(location.name)) }}>
                                    <Typography variant="h6">{location.name}</Typography>
                                </Button> */}
                                <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                                    <Stack direction="row" alignItems="center">
                                        <Typography variant="h6">{location.name}</Typography>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </BlankCard>
                    </Grid>
                ))}
            </Grid>
        </PageContainer>
    )
}
