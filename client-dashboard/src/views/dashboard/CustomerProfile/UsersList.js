import React from 'react'
import PageContainer from '../../../components/container/PageContainer'
import { Grid } from '@mui/material'
import Banner from './Banner'

export default function UsersList() {
    return (
        <PageContainer title="User - Novel Office" description="this is User Profile page">
            <Grid container spacing={3}>

                <Grid item sm={12}>
                    <Banner />
                </Grid>
            </Grid>
        </PageContainer>
    )
}
