import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppatImg from '../../assets/appartement.png';
import { appartementAPI } from '../../API/api';
const DetailAppartement = () => {

    const params = useParams();
    const id = params.id;
    const [data, setData] = useState([])

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const res = await appartementAPI.getOne(id)
                setData(res.data)
            }
            catch(err) {
                console.log(err);
            }
        }
        fetchData()
    },[])

    return (
        <>
            <h1 className='text-xl md:text-4xl font-bold'>Detail de l'appartement : {data.id}</h1>
            <div className='flex flex-wrap gap-[10px] justify-center items-center mt-[30px]'>
                <div className='w-[50%] min-w-[300px] sm:min-w-[400px] overfow-x-auto'>
                    <img src={AppatImg} className='w-full h-auto'/>
                </div>
                <div className='w-auto py-4 px-2'>
                    <div className='flex gap-[10px] lg:gap-[20px] mb-[20px] items-center font-semibold text-xl flex-col sm:flex-row'>
                        <h4 className='text-xl lg:text-2xl min-w-[150px] px-3 bg-gray-400 text-black font-bold rounded-md text-center sm:text-right'>Etage</h4>
                        <p className='text-base lg:text-lg'>{data.etage}</p>
                    </div>
                    <div className='flex gap-[10px] lg:gap-[20px] mb-[20px] items-center font-semibold text-xl flex-col sm:flex-row'>
                        <h4 className='text-xl lg:text-2xl min-w-[150px] px-3 bg-gray-400 text-black font-bold text-center sm:text-right rounded-md'>Lot</h4>
                        <p className='text-base lg:text-lg'>{data.lot}</p>
                    </div>
                    <div className='flex gap-[10px] lg:gap-[20px] mb-[20px] items-center font-semibold text-xl flex-col sm:flex-row'>
                        <h4 className='text-xl lg:text-2xl min-w-[150px] px-3 bg-gray-400 text-black font-bold rounded-md text-center sm:text-right'>Surface</h4>
                        <p className='text-base lg:text-lg'>{data.Surface}</p>
                    </div>
                    <div className='flex gap-[10px]  lg:gap-[20px] items-center font-semibold text-xl flex-col sm:flex-row'>
                        <h4 className='text-xl lg:text-2xl min-w-[150px] px-3 bg-gray-400 text-black font-bold rounded-md text-center sm:text-right'>Bâtiments</h4>
                        <p className='text-base lg:text-lg'>{data.batiment}</p>
                    </div>
                    <h2 className={`text-center mt-[40px] text-2xl lg:text-4xl font-bold
                     ${data.Status === 'Vendu' && 'text-red-500'}
                     ${data.Status === 'Disponible' && 'text-green-500'}
                     ${data.Status === 'Réservé' && 'text-yellow-500'}`}>{data.Status}</h2>
                    <p className='text-lg lg:text-xl mt-2 font-semibold'>Depuis le: <span className='font-bold'>15 Aôut 2025</span></p>
                </div>
            </div>
        </>
    );
}

export default DetailAppartement;
