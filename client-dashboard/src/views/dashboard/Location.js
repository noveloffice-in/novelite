import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    CardContent,
    Typography,
    Grid,
    Stack,
    Skeleton,
} from '@mui/material';
import img1 from 'src/assets/images/products/s4.jpg';
import img2 from 'src/assets/images/products/s5.jpg';
import img3 from 'src/assets/images/products/s7.jpg';
import img4 from 'src/assets/images/products/s11.jpg';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import BlankCard from '../../components/shared/BlankCard';

const ecoCard = [
    {
        title: 'Novel Office',
        subheader: 'M G Road',
        photo: img1,
        salesPrice: 375,
        price: 285,
        rating: 4,
    },
    {
        title: 'MacBook Air Pro',
        subheader: 'Marathalli',
        photo: img2,
        salesPrice: 650,
        price: 900,
        rating: 5,
    },
    {
        title: 'Red Valvet Dress',
        subheader: 'September 14, 2023',
        photo: img3,
        salesPrice: 150,
        price: 200,
        rating: 3,
    },
    {
        title: 'Cute Soft Teddybear',
        subheader: 'September 14, 2023',
        photo: img4,
        salesPrice: 285,
        price: 345,
        rating: 2,
    },
    {
        title: 'Cute Soft Teddybear',
        subheader: 'September 14, 2023',
        photo: img4,
        salesPrice: 285,
        price: 345,
        rating: 2,
    },
    {
        title: 'Red Valvet Dress',
        subheader: 'September 14, 2023',
        photo: img3,
        salesPrice: 150,
        price: 200,
        rating: 3,
    },
    {
        title: 'MacBook Air Pro',
        subheader: 'September 14, 2023',
        photo: img2,
        salesPrice: 650,
        price: 900,
        rating: 5,
    },
    {
        title: 'Boat Headphone',
        subheader: 'September 14, 2023',
        photo: img1,
        salesPrice: 375,
        price: 285,
        rating: 4,
    },
];

export default function Location() {
    const [isLoading, setLoading] = React.useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 700);
        return () => clearTimeout(timer);
    }, []);

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

    return (
        <PageContainer title="Book Slots">
            <Breadcrumb title="Booking Slots" items={BCrumb} />
            <Grid container spacing={3}>
                {ecoCard.map((product, index) => (
                    <Grid item xs={12} sm={4} lg={3} key={index}>
                        <BlankCard>
                            <Typography component={Link} to="/bookings">
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
            </Grid>
        </PageContainer>
    )
}
