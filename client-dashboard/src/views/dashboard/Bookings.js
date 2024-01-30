import React from 'react'
import PageContainer from '../../components/container/PageContainer'
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { useState } from 'react';
import { Grid, Typography, CardActionArea } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';
import meetingRoom from 'src/assets/images/bookings/57773.jpg'
import meetingRoom2 from 'src/assets/images/bookings/3884469.jpg'
import cabins from 'src/assets/images/bookings/38134.jpg'
import cabins2 from 'src/assets/images/bookings/16585.jpg'


export default function Bookings() {

    const [component, setComponent] = useState("MeetingRooms");

    const BCrumb = [
        {
            to: '/dashboard',
            title: 'Home',
        },
        {
            to: '/location',
            title: 'Location',
        },
        {
            to: '/bookings',
            title: 'Bookings',
        },
    ];

    const cards = [
        {
            title: "Meeting Rooms",
            description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            image: meetingRoom
        },
        {
            title: "Office Cabins",
            description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            image: meetingRoom2
        },
        {
            title: "Meeting Rooms",
            description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            image: meetingRoom
        },
        {
            title: "Office Cabins",
            description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            image: meetingRoom2
        },
        {
            title: "Meeting Rooms",
            description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            image: meetingRoom
        },
        {
            title: "Office Cabins",
            description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            image: meetingRoom2
        },
        {
            title: "Meeting Rooms",
            description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            image: meetingRoom
        },
        {
            title: "Office Cabins",
            description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            image: meetingRoom2
        },
    ]


    return (
        <PageContainer>
            <Breadcrumb title="Bookings" items={BCrumb} />
            <Grid container spacing={3}>
                {/* ------------------------------------------- */}
                {/* Cards */}
                {/* ------------------------------------------- */}
                {cards.map((card, index) => {
                    return (
                    <Grid item xs={12} sm={4} lg={3} key={index}>
                        <Card variant="outlined" sx={{ maxWidth: 345 }}>
                            <CardActionArea component={Link} to="/bookingslot">
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={card.image}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {card.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {card.description}
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
