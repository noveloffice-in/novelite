import Table from './Table';
import { useEffect, useState } from 'react';
import SalesFilter from './SalesFilter';
import { useSelector } from 'react-redux';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import axios from 'axios';

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
  const [salesInvoiceData, setSalesInvoiceData] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(()=>{
    fetchInvoices();
  },[])
  
  //-----------------------------------------------------------Fetch Invoice-----------------------------------------------//
  const fetchInvoices = ()=>{
    axios.post('/api/method/novelite.api.sales_invoice.get_invoice_documents', {customer : companyName})
    .then((res)=>{
      console.log("Res = ", res.data.message);
      setSalesInvoiceData(res.data.message);
      setIsPending(false);
    })
    .catch((error)=>{
      console.log("Error = ", error);
    })
  }

  return (
    <PageContainer title="Sales Invoice - Novel Office" description="this is Sales Invoice page">
      {/* breadcrumb */}
      <Breadcrumb title="Sales Invoice" items={BCrumb} />

      {/* Invoice Filters */}
      {!isPending && <SalesFilter salesInvoiceData={salesInvoiceData} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />}

      {/* Table */}
      {!isPending && <Table salesInvoiceData={salesInvoiceData} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />}

    </PageContainer>
  );
};

export default SalesInvoice;