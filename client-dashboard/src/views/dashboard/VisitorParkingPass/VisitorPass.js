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

            {/* Filters */}
            {/* <PassFilter/> */}

            {/* Table  */}
            <PassTable/>
        </PageContainer>
    )
}
