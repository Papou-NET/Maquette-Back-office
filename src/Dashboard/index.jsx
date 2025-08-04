import React from 'react';
import DashboardCard from '../Card/DashboardCard';
import RecentActivities from '../Card/RecentActivities';
import BarChartCard from '../Card/BarChart';

const Dashboard = () => {
    return (
        <div>
            <div>
                <div className='w-full flex justify-center flex-wrap align-center gap-[20px]'>
                    <DashboardCard title="Appartement" value="25"/>
                    <DashboardCard title="Disponible" value="08"/>
                    <DashboardCard title="Vendu" value="10"/>
                    <DashboardCard title="Réservé" value="07"/>
                </div>
                <div className='w-full h-auto h-auto flex justify-center flex-wrap gap-[50px] mt-[25px]'>
                   <div className='p-1 rounded-2xl border-3 border-[#000] w-[90%] h-[300px] md:h-[400px] md:w-[60%]'>
                        <div className='overflow-auto w-full h-full p-1'>
                            <BarChartCard />
                        </div>
                   </div>
                    <RecentActivities /> 
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
