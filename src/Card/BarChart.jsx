import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', ventes: 4000, reservations: 2500 },
  { name: 'Fév', ventes: 3000, reservations: 3400 },
  { name: 'Mar', ventes: 5000, reservations: 5500 },
  { name: 'Avr', ventes: 2000, reservations: 4300 },
  { name: 'Mai', ventes: 3500, reservations: 1000 },
  { name: 'Jui', ventes: 4500, reservations: 2000 },
  { name: 'Juil', ventes: 3000, reservations: 3100 },
  { name: 'Aout', ventes: 2000, reservations: 4670 },
  { name: 'Sep', ventes: 1500, reservations: 1500 },
  { name: 'Oct', ventes: 3700, reservations: 1250 },
  { name: 'Nov', ventes: 4500, reservations: 1000 },
  { name: 'Déc', ventes: 5500, reservations: 3000 },
];

const BarChartCard = () => {
  return (
    <div className='w-full h-full min-w-[600px] rounded-2xl'>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="ventes" fill="#888787" />
          <Bar dataKey="reservations" fill="#3a3939" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCard;

