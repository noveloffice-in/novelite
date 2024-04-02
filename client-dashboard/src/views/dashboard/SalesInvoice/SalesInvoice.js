import Table from './Table';
import { useState } from 'react';
import SalesFilter from './SalesFilter';
import { useSelector } from 'react-redux';
import { useFrappeGetDocList } from 'frappe-react-sdk';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';

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
  const [statusFilter, setStatusFilter] = useState("ALL");

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

      {/* Invoice Filters */}
      {data && <SalesFilter data={data} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />}

      {/* Table */}
      {data && <Table data={data} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />}

    </PageContainer>
  );
};

export default SalesInvoice;