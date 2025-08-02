import React from 'react';
import DashboardCard from '../Card/DashboardCard';
import BarChart from '../Card/BarChart';
import RecentActivities from '../Card/RecentActivities';

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
                    <BarChart />
                    <RecentActivities /> 
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
