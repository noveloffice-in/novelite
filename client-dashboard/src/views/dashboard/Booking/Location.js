import React from 'react';
import { Link } from 'react-router-dom';
import {
    CardContent,
    Typography,
    Grid,
    Stack,
    Skeleton,
    Card,
    CardActionArea,
    CardMedia,
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
    if (data) {
        if (data.length === 0) {
            return (
                <PageContainer title="Location - Novel Office">
                    <Stack alignItems='center' justifyContent='center' p={4}>
                        <Breadcrumb title="Location" items={BCrumb} />
                        <Typography variant='h4' >There are no records to show</Typography>
                    </Stack>
                </PageContainer>
            )
        }
    }

    return (
        <PageContainer title="Location - Novel Office">
            <Breadcrumb title="Location" items={BCrumb} />

            <Grid container spacing={3}>

                {/* ------------------------------------------- */}
                {/* Cards */}
                {/* ------------------------------------------- */}
                {data && data.map((card, index) => {
                    return (
                        <Grid item xs={12} sm={4} lg={3} key={card.name + index}>
                            <Card variant="outlined" sx={{ maxWidth: 345, height: '100%' }}>
                                <CardActionArea component={Link} sx={{ height: '100%' }} to="/category" onClick={() => { dispatch(setBookingLocation(card.name)) }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={card.image}
                                        alt={card.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="p" component="div">
                                            {card.name}
                                        </Typography>
                                        {/* <Typography variant="body2" color="text.primary">
                                            &#x20B9; {card.price} / hour
                                        </Typography> */}
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>

        </PageContainer>
    )
}
