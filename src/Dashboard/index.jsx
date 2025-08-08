import React, { useEffect, useState } from 'react';
import DashboardCard from '../Card/DashboardCard';
import RecentActivities from '../Card/RecentActivities';
import BarChartCard from '../Card/BarChart';
import { appartementAPI } from '../API/api';

const Dashboard = ({fetchCardData}) => {

    const [nbAppart, setnbAppart] = useState(0);
    const [nbDispo, setnbDispo] = useState(0);
    const [nbVendu, setnbVendu] = useState(0);
    const [nbReserve, setnbReserve] = useState(0);

    useEffect(()=>{
        const fetchData = async () => {
            
            try {
                const res1 = await appartementAPI.count()
                setnbAppart(res1.data)

                const res2 = await appartementAPI.countByStatus('Disponible')
                setnbDispo(res2.data)

                const res3 = await appartementAPI.countByStatus('Réservé')
                setnbReserve(res3.data)

                const res4 = await appartementAPI.countByStatus('Vendu')
                setnbVendu(res4.data)
            } catch (error) {
                console.log(error.response);
            }
        }
        fetchData()
        
    },[fetchCardData])

    return (
        <div>
            <div>
                <div className='w-full flex justify-center flex-wrap align-center gap-[20px]'>
                    <DashboardCard title="Appartement" value={nbAppart} />
                    <DashboardCard title="Disponible" value={nbDispo}/>
                    <DashboardCard title="Vendu" value={nbVendu}/>
                    <DashboardCard title="Réservé" value={nbReserve}/>
                </div>
                <div className='w-full h-auto h-auto flex justify-center flex-wrap gap-[50px] mt-[25px]'>
                   <div className='p-1 rounded-2xl border-3 border-[#000] w-[90%] h-[300px] md:h-[400px] md:w-[60%]'>
                        <div className='overflow-auto w-full h-full p-1'>
                            <BarChartCard fetchCardData={fetchCardData}/>
                        </div>
                   </div>
                    <RecentActivities fetchCardData={fetchCardData}/> 
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
