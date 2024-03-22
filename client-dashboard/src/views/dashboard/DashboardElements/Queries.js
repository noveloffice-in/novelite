import React from 'react'
import { Card, CardContent, Typography, Button, Box, Grid } from '@mui/material';
import busiessImg from "../../../assets/images/dashboard/business-3d-pondering-businessman-in-dark-blue-suit 1 (1).png"
import { Link } from 'react-router-dom';

export default function Queries() {
    return (
        <Card
            elevation={0}
            sx={{
                backgroundColor: (theme) => theme.palette.secondary.light,
                pt: 1,
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            <CardContent sx={{ p: 2 }}>
                <Grid container spacing={3} justifyContent="space-around">
                <Grid item sm={4}>
                        <Box mb="-20px">
                            <img src={busiessImg} alt={busiessImg} style={{height:"12rem"}} />
                        </Box>
                    </Grid>
                    <Grid item sm={6} display="flex" alignItems="center">
                        <Box
                            sx={{
                                textAlign: {
                                    xs: 'center',
                                    sm: 'center',
                                },
                            }}
                        >
                            <Typography variant='h3' sx={{fontSize: {xs:"1.5rem", sm:"2rem", lg:"2rem"}}} my={2}>Facing Issues?</Typography>

                            <Button variant="contained" color="secondary" component={Link} to='/tickets'>
                                Raise a Ticket
                            </Button>
                        </Box>
                    </Grid>

                </Grid>
            </CardContent>
        </Card>
    )
}
