"use client";

import { HOMEPAGEDATA } from '@/lib/apiCollection';
import client from '@/lib/appolloClient';
import React, { useEffect, useState } from 'react'

const page = () => {
  const [homeData,setHomeData]=useState([])

  // const fetchHomeData = async()=>{
  //   try{
  //   const res = await client.query({
  //           query: HOMEPAGEDATA,
  //     });
  //     console.log("RESULT:", res.data.homePages);
  //     setHomeData(res.data.homePages)
  //   }catch(err){
  //     console.log("ERROR AT FETCHING HOMEPAGE DATA",err);
      
  //   }
  // }

  //  useEffect(() => {
  //   fetchHomeData();
  //  }, []);

  return (
    <div className='bg-red-600'>
        <h1>Hellooooooo</h1>
    </div>
  )
}

export default page
