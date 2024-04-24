import React from 'react'
import PageContainer from '../../../components/container/PageContainer'
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { Grid, Typography, CardActionArea } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';
import { useFrappeGetDocList } from 'frappe-react-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { setRoomName } from '../../../store/apps/bookings/BookingsSlice';


export default function Bookings() {

    const dispatch = useDispatch();
    const roomType = useSelector((state) => state.bookingsSliceReducer.roomCategory);
    const location = useSelector((state) => state.bookingsSliceReducer.bookingLocation);

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
            to: '/category',
            title: 'Category',
        },
        {
            to: '/bookings',
            title: 'Bookings',
        },
    ];

    //--------------------------------------------------------Fetch Rooms------------------------------------------------------//
    const { data, error, isValidating, mutate } = useFrappeGetDocList('Rooms', {
        fields: ['name', 'room_name', 'room_type', 'image', 'status'],
        filters: [['location', '=', location], ['room_type', '=', roomType]],
        limit_start: 0,
        limit: 1000,
    });
    
    //-----------------------------------------------------------END---------------------------------------------------------//

    return (
        <PageContainer title="Bookings - Novel Office">
            <Breadcrumb title="Bookings - Novel Office" items={BCrumb} />
            <Grid container spacing={3}>
                {/* ------------------------------------------- */}
                {/* Cards */}
                {/* ------------------------------------------- */}
                {data?.length !== 0 ?
                    (data?.map((card, index) => {
                        return (
                            <Grid item xs={12} sm={4} lg={3} key={index}>
                                <Card variant="outlined" sx={{ maxWidth: 345, display : card.status === "Active" ? "block" : "none"  }}>
                                    <CardActionArea component={Link} to="/bookslot" onClick={() => { dispatch(setRoomName(card.name)) }}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={card.image}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {card.room_name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {card.room_type}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        )
                    }))
                    :
                    (
                        <Stack direction="row" alignItems='center' justifyContent='center' width='100%' mt={4} ml={3}>
                            <Typography variant='h3'>There are no rooms available in this category</Typography>
                        </Stack>
                    )
                }
            </Grid>
        </PageContainer>
    )
}
