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
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
                    <DashboardCard className="w-full" title="Appartement" value={nbAppart} />
                    <DashboardCard className="w-full" title="Disponible" value={nbDispo}/>
                    <DashboardCard className="w-full" title="Vendu" value={nbVendu}/>
                    <DashboardCard className="w-full" title="Réservé" value={nbReserve}/>
                </div>
                <div className='flex flex-col lg:flex-row justify-between gap-10 mt-10'>
    {/* Graphique */}
    <div className='w-full lg:w-[60%] max-w-[900px] h-[300px] md:h-[400px] p-1 rounded-2xl border border-[#000]'>
        <div className='w-full h-full'>
            <BarChartCard fetchCardData={fetchCardData}/>
        </div>
    </div>

    {/* Activités récentes */}
    <div className='w-full lg:w-[40%]'>
        <RecentActivities fetchCardData={fetchCardData}/> 
    </div>
</div>
            </div>
        </div>
    );
}

export default Dashboard;
