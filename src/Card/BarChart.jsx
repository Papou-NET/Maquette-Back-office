import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { reservationAPI } from '../API/api';


const BarChartCard = ({ fetchCardData }) => {

  const [data, setdata] = useState();

  useEffect(()=>{
    const year = new Date().getFullYear()
    const fetchData = async () => {
      try {
        const res = await reservationAPI.getBarChart(year)
        setdata(res.data)
      } catch (error) {
        console.log(error.response);
      }
    }
    fetchData()
  },[fetchCardData])

  return (
    <div className='w-full h-full min-w-[600px] rounded-2xl'>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="vente" fill="#888787" />
          <Bar dataKey="location" fill="#3a3939" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCard;

