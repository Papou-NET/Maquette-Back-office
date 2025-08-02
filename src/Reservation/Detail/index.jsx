import React, { useEffect, useState } from 'react';
import AppatImg from '../../assets/appartement.png';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { reservationAPI } from '../../API/api';

const DetailReservation = ({toggledisplayreservation, idReservation}) => {

    const [data, setdata] = useState({
        numero: 0,
        appartement: "",
        client: "",
        dateDébut: "",
        dateFin: ""
    });

    useEffect(()=>{
        const fetchData = async () => {
            const res = await reservationAPI.getOne(idReservation)
            setdata(res.data)
            console.log(res.data);
        }
        fetchData()
    },[])

    return (
        <div className='fixed top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.7)] z-80 flex items-center 
        justify-center'>
             
            <div className='w-[70%] h-auto bg-white rounded py-6 px-6 relative'>
                <h1 className='text-2xl font-bold'>Detail du resevation numero {idReservation} </h1>
                <AiOutlineCloseCircle className='absolute top-0 right-0 text-xl cursor-pointer' onClick={toggledisplayreservation}/> 
                <div className='flex justify-center items-center mt-6 gap-[10px] w-full'>
                    <div className='w-[50%] min-w-[300px] sm:min-w-[400px] overfow-x-auto'>
                        <img src={AppatImg} className='w-full h-auto'/>
                    </div>
                    <div  className='w-[50%]'>
                        <div className='flex w-full justify-center items-center flex-wrap'>
                            <h3 className='min-w-[150px] bg-gray-400 rounded mr-4 text-right p-2'>Appartement</h3>
                            <p className='w-[50%] ml-4'>{data.appartement}</p>
                        </div>
                        <div className='flex w-full justify-center items-center flex-wrap mt-2'>
                            <h3 className='min-w-[150px] bg-gray-400 rounded mr-4 text-right p-2'>Client</h3>
                            <p className='w-[50%] ml-4'>{data.client}</p>
                        </div>
                        <div className='flex w-full justify-center items-center flex-wrap mt-2'>
                            <h3 className='min-w-[150px] bg-gray-400 rounded mr-4 text-right p-2'>Date de début</h3>
                            <p className='w-[50%] ml-4'>{data.dateDébut}</p>
                        </div>
                        <div className='flex w-full justify-center items-center flex-wrap mt-2'>
                            <h3 className='min-w-[150px] bg-gray-400 rounded mr-4 text-right p-2'>Date Fin</h3>
                            <p className='w-[50%] ml-4'>{data.dateFin}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailReservation;
