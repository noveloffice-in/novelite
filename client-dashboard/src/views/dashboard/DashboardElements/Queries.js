import React from 'react'
import { Card, CardContent, Typography, Button, Box, Grid } from '@mui/material';
import busiessImg from "../../../assets/images/dashboard/business-3d-pondering-businessman-in-dark-blue-suit 1.png"

export default function Queries() {
    return (
        <Card
            elevation={0}
            sx={{
                backgroundColor: (theme) => theme.palette.secondary.light,
                py: 0,
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            <CardContent sx={{ p: '1rem' }}>
                <Grid container spacing={3} justifyContent="space-between">
                <Grid item sm={4}>
                        <Box mb="-30px">
                            <img src={busiessImg} alt={busiessImg} />
                        </Box>
                    </Grid>
                    <Grid item sm={6} display="flex" alignItems="center">
                        <Box
                            sx={{
                                textAlign: {
                                    xs: 'center',
                                    sm: 'right',
                                },
                            }}
                        >
                            <Typography variant="h4" my={2}>Have Queries?</Typography>

                            <Button variant="contained" color="secondary">
                                Raise a Ticket
                            </Button>
                        </Box>
                    </Grid>

                </Grid>
            </CardContent>
        </Card>
    )
}
