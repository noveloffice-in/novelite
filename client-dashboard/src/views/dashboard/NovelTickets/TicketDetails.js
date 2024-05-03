import React from 'react'
import PageContainer from '../../../components/container/PageContainer'
import AppCard from 'src/components/shared/AppCard';
import SingleTicketDetails from './SingleTicketDetails';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { Box } from '@mui/system';

const BCrumb = [
    {
        to: '/dashboard',
        title: 'Home',
    },
    {
        to: '/tickets',
        title: 'Tickets',
    },
    {
        title: 'Ticket Details',
    },
];

export default function TicketDetails() {
    return (
        <PageContainer title="Ticket Details - Novel Office" description="this is Details page">
            <Breadcrumb title="Ticket Details" items={BCrumb} />
            <Box mt={-2}>
                {/* Left part */}
                <SingleTicketDetails/>
            </Box>
        </PageContainer>
    )
}
