import React from 'react'
import { useParams } from 'react-router-dom'
import PageContainer from '../../../components/container/PageContainer'
import AppCard from 'src/components/shared/AppCard';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { useFrappeGetDoc } from 'frappe-react-sdk';

const BCrumb = [
    {
        to: '/dashboard',
        title: 'Home',
    },
    {
        to: '/visitor_pass',
        title: 'Visitor parking pass',
    },
    {
        title: 'Pass Details',
    },
];

export default function PassDetails() {
  const { id } = useParams()
  const {data} = useFrappeGetDoc('Visitor Parking Pass', `${id}`);
  console.log("Single Data = ", data);
  return (
    <PageContainer title="Visitor pass" description="this is Visitor pass page">
      <Breadcrumb title="Visitor Pass Details" items={BCrumb} />
      <AppCard>
        {/* Left part */}
      </AppCard>
    </PageContainer>
  )
}
