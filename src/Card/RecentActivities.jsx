import React, { act } from 'react';

const RecentActivities = () => {

    const data = [
        {action:"RESERVATION", id:"B002", date:"05 juin 2025", owner:"Ralaizafy"},
        {action:"RESERVATION", id:"D012", date:"26 avril 2025", owner:"Andrianina"},
        {action:"VENTE", id:"A003", date:"15 août 2025", owner:"Eric"},
        {action:"RESERVATION", id:"B003", date:"05 mars 2025", owner:"Ralaizafy"}
    ]

    return (
        <div className='h-[400px] w-[310px] rounded-xl bg-[#1d2c31] p-[20px]'>
            <h3 className='font-bold text-white'>Activités récentes</h3>
            <div className='flex flex-col justify-start h-full mt-6'>
                {
                    data.map((activity, index) => {
                        return <div className='h-auto bg-white mb-2 text-black text-[#797166] font-bold flex flex-col
                        justify-between px-4 py-2 gap-[8px]' key={index}>
                                    <div className='flex justify-between items-center'>
                                        <h4>{activity.action}</h4>
                                        <p className='text-xs font-light'>{activity.date}</p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <h4>{activity.id}</h4>
                                        <p>par {activity.owner}</p>
                                    </div>
                                </div>
                    })
                }
            </div>
        </div>
    );
}

export default RecentActivities;
