import * as React from 'react';
import { useFrappeGetDocList } from 'frappe-react-sdk';
import { useDispatch, useSelector } from 'react-redux';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import Table from './Table';

const BCrumb = [
  {
    to: '/dashboard',
    title: 'Home',
  },
  {
    title: 'Sales Invoice',
  },
];


const SalesInvoice = () => {

  const companyName = useSelector((state) => state.novelprofileReducer.companyName);
  const dispatch = useDispatch();

  //-----------------------------------------------------------Fetch Invoice-----------------------------------------------//
  const { data, error, isValidating, mutate } = useFrappeGetDocList('Sales Invoice', {
    fields: ['name', 'status', 'due_date', 'rounded_total', 'location'],
    filters: [['customer', '=', companyName]],
    limit_start: 0,
    limit: 100000,
    orderBy: {
      field: 'creation',
      order: 'desc',
    },
  });

  return (
    <PageContainer title="Sales Invoice - Novel Office" description="this is Sales Invoice page">
      {/* breadcrumb */}
      <Breadcrumb title="Sales Invoice" items={BCrumb} />

      {/* Table */}
      <Table data={data} />

    </PageContainer>
  );
};

export default SalesInvoice;