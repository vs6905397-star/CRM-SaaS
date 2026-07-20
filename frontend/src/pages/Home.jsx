import React, { useEffect, useState } from 'react'
import MainLayout from "../layout/MainLayout"
import Deshboard from "../components/Deshboard"
import { getCount, getData } from '../services/deahboardApi'


function Home() {

  const [data, setData] = useState([]);
  const [count, setCount] = useState([]);

  useEffect(() => {
    getCount()
    .then((data) => setCount(data));

    getData()
    .then((data) => setData(data));

  },[]);

  return (
    <MainLayout>
        <Deshboard data={data} count={count}/>
    </MainLayout>
  )
}

export default Home
