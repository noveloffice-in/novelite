import React from 'react'
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import { Box, Stack } from '@mui/system';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { Typography } from '@mui/material';
import PassFilter from './PassFilter';
import PassTable from './PassTable';

const BCrumb = [
    {
        to: '/dashboard',
        title: 'Home',
    },
    {
        title: 'Visitor parking pass',
    },
];

export default function VisitorPass() {
    return (
        <PageContainer title="Visitor parking pass - Novel Office" description="this is Sales Visitor parking pass page">
            <Breadcrumb title="Visitor parking pass" items={BCrumb} />
            <Box bgcolor={'warning' + '.light'} textAlign="center" mb={2}>
                <Stack justifyContent='center' alignItems='center' flexDirection='row'>
                    <Box color={'warning' + '.main'}>
                        <WarningAmberOutlinedIcon sx={{ marginRight: "0.5rem", marginBottom: "-0.4rem" }} />
                    </Box>
                    <Typography
                        color={'warning' + '.main'}
                        m={1}
                        variant="h5"
                        fontWeight={600}
                    >
                        These are the parking passes for visitors 
                    </Typography>
                </Stack>
            </Box>

            {/* Filters */}
            <PassFilter/>

            {/* Table  */}
            <PassTable/>
        </PageContainer>
    )
}
