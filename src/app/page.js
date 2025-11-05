"use client";

import { HOMEPAGEDATA } from '@/lib/apiCollection';
import client from '@/lib/appolloClient';
import React, { useEffect, useState } from 'react'

const page = () => {
  const [homeData,setHomeData]=useState([])

  const fetchHomeData = async()=>{
    try{
    const res = await client.query({
            query: HOMEPAGEDATA,
      });
      console.log("RESULT:", res.data.homePages);
      setHomeData(res.data.homePages)
    }catch(err){
      console.log("ERROR AT FETCHING HOMEPAGE DATA",err);
      
    }
  }

   useEffect(() => {
    fetchHomeData();
   }, []);

  return (
    <div>
     {homeData.map((page) => (
  <div key={page.documentId}>
    <h2>{page.title1}</h2>
    <h3>{page.homeTitle_2}</h3>
    <p>{page.homeDescription}</p>
    {page.homeBanner?.url && (
      <img
        src={`http://localhost:1337${page.homeBanner.url}`}
        alt={page.title1}
      />
    )}
  </div>
))}

      
    </div>
  )
}

export default page
