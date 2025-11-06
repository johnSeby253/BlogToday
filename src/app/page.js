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
    <div className='bg-amber-300 text-amber-900 w-full h-[30px]'>
        <h1>Testing The Work Flow....</h1>
    </div>
  )
}

export default page
