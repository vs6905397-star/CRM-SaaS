import React, { useEffect, useState } from 'react'
import MainLayout from "../layout/MainLayout"
import CustomerTable from "../components/CustomerTable"
import { getCustomers } from '../services/customerApi'
import {useSearch} from "../context/searchContext"

const CustomerPage = () => {

  const [page, setPage] = useState(1);
  const {debouncingSearch} = useSearch();
  const [customers, setCustomers] = useState([]);
  const [totalPage, setTotalPage] = useState(1);

  const fetchCustomer = async () => {
    const data = await getCustomers(page,debouncingSearch);
    setCustomers(data)
    setTotalPage(data.totalPages);
  }

  useEffect(() => {
    fetchCustomer();
  },[page,debouncingSearch]);

  useEffect(()=>{
    setPage(1);
  },[debouncingSearch]);

  return (
    <MainLayout>
      <CustomerTable customers={customers} page={page}
       setPage={setPage} totalPage={totalPage} 
       fetchCustomer={fetchCustomer}/>
    </MainLayout>
  )
}

export default CustomerPage
