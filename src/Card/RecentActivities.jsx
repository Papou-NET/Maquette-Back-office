import React, { act, useState } from 'react';
import { reservationAPI } from '../API/api';

const RecentActivities = ({fetchCardData}) => {

    const [recentData, setrecentData] = useState([]);

    const formateDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR')
    }

    useState(()=>{
        const fetchData = async () => {
            try {
                const res = await reservationAPI.getLastFour()
                setrecentData(res.data);
            } catch (error) {
                console.log(error.response);
            }
        }
        fetchData()
    }, [fetchCardData])

    return (
        <div className='h-[400px] w-full rounded-xl bg-[#1d2c31] p-[20px]'>
            <h3 className='font-bold text-white'>Activités récentes</h3>
            <div className='flex flex-col justify-start h-full mt-6'>
                {
                    recentData.map((activity, index) => {
                        return <div className='h-auto bg-white mb-2  text-[#797166] font-bold flex flex-col
                        justify-between px-4 py-2 gap-[8px]' key={index}>
                                    <div className='flex justify-between items-center'>
                                        <h4 className='uppercase'>{activity.type}</h4>
                                        <p className='text-xs font-light'>{activity.type === "location" ? formateDate(activity.dateDeb) : 
                                        formateDate(activity.dateVente)}</p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <h4>{activity.appartement?.lotAppart}</h4>
                                        <p>par {activity.client?.nom}</p>
                                    </div>
                                </div>
                    })
                }
            </div>
        </div>
    );
}

export default RecentActivities;
