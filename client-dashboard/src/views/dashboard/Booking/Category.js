import React from 'react'
import PageContainer from '../../../components/container/PageContainer'
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { Grid, Typography, CardActionArea } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import meetingRoom from 'src/assets/images/bookings/57773.jpg'
import meetingRoom2 from 'src/assets/images/bookings/3884469.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { setPrice, setRoomCategory } from '../../../store/apps/bookings/BookingsSlice';
import { useFrappeGetDoc } from 'frappe-react-sdk';

export default function Category() {
    const dispatch = useDispatch();
    const location = useSelector((state) => state.bookingsSliceReducer.bookingLocation);

    const BCrumb = [
        {
            to: '/dashboard',
            title: 'Home',
        },
        {
            to: '/location',
            title: location,
        },
        {
            to: '/category',
            title: 'Category',
        },
    ];

    const cards = [
        {
            title: "Meeting",
            description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            image: meetingRoom
        },
        {
            title: "Conference",
            description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            image: meetingRoom2
        },
        {
            title: "Training",
            description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            image: meetingRoom
        },
        {
            title: "Board",
            description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            image: meetingRoom2
        }
    ]

    //-------------------------------------------fetching Rooms Type based on Location------------------------------------------------//
    const { data } = useFrappeGetDoc(
        'Room Locations', `${location}`
    );

    //-----------------------------------------------------------END---------------------------------------------------------//

    return (
        <PageContainer title="Category - Novel Office">
            <Breadcrumb title="Category - Novel Office" items={BCrumb} />
            <Grid container spacing={3}>

                {/* ------------------------------------------- */}
                {/* Cards */}
                {/* ------------------------------------------- */}
                {data && data.room_type_details.map((card, index) => {
                    return (
                        <Grid item xs={12} sm={4} lg={3} key={card.room_type + index}>
                            <Card variant="outlined" sx={{ maxWidth: 345 }}>
                                <CardActionArea component={Link} to="/bookings" onClick={() => { dispatch(setRoomCategory(card.room_type)); dispatch(setPrice(card.price)) }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={card.image}
                                        alt={card.room_type}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {card.room_type}
                                        </Typography>
                                        <Typography variant="body2" color="text.primary">
                                        &#x20B9; {card.price} / hour
                                        </Typography>
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
