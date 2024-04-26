import React from 'react'
import PageContainer from '../../../components/container/PageContainer'
import AppCard from 'src/components/shared/AppCard';
import SingleTicketDetails from './SingleTicketDetails';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';

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
            <AppCard>
                {/* Left part */}
                <SingleTicketDetails/>
            </AppCard>
        </PageContainer>
    )
}
