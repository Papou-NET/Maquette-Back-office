import React, { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { reservationAPI } from '../../API/api';
import RechercheClient from './RechercheClient';
import { FaAngleRight, FaGalacticRepublic } from 'react-icons/fa';

const AjoutReservation = ({toggledisplayreservation}) => {

    const [displayClient, setdisplayClient] = useState(false);

    const initialData = {
        appartement: "",
        client: "",
        numero: "",
        dateDébut: "",
        dateFin: ""
    }

    const [data, setData] = useState(initialData)
    const submitReservation = async (e) => {
        e.preventDefault()
        try {
            await reservationAPI.create(data)
        }catch(error) {
            console.log(error);
        }
    }

    const handleDisplayClient = () => {
        setdisplayClient(prev => !prev)
    }

    return (
        <div className='fixed top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.7)] z-80 flex items-center 
        justify-center'>
            {displayClient && <RechercheClient handleDisplayClient={handleDisplayClient} />}
            <div className='w-[50%] h-auto bg-white rounded py-6 px-6 relative'>
                <h2 className='text-xl font-bold'>Ajouter une nouvelle réservation</h2>
                <AiOutlineCloseCircle className='absolute top-0 right-0 text-xl cursor-pointer' onClick={toggledisplayreservation} /> 
                <form onSubmit={submitReservation}>
                <div className='w-full mt-4'>
                        <label className='font-semibold ml-2'>Réference</label>
                        <input type="text" className='block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full' 
                        value={data.numero} onChange={e=>setData({...data, numero: e.target.value})} required/>
                    </div>
                    <div className='w-full mt-4'>
                        <label className='font-semibold ml-2'>Appartement</label>
                        <input type="text" className='block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full' 
                        value={data.appartement} onChange={e=>setData({...data, appartement: e.target.value})} required/>
                    </div>
                    <div className='w-full mt-4'>
                        <label className='font-semibold ml-2'>Client</label>
                       <div className='flex gap-4 items-center'>
                        <input type="text" className='block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full' 
                            value={data.client} onChange={e=>setData({...data, client: e.target.value})} required/>
                            <FaAngleRight onClick={handleDisplayClient}/>
                       </div>
                    </div>
                    <div className='w-full flex gap-6 items-center mt-4'>
                        <div className='w-[50%]'>
                            <label className='font-semibold ml-2'>Date début</label>
                            <input type="date" className='block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full'
                            value={data.dateDébut} onChange={e=>setData({...data, dateDébut: e.target.value})} required/>
                        </div>
                        <div className='w-[50%]'>
                            <label className='font-semibold ml-2'>Date fin</label>
                            <input type="date" className='block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full' 
                            value={data.dateFin} onChange={e=>setData({...data, dateFin: e.target.value})} required/>
                        </div>
                    </div>
                    <button className='font-bold text-white py-3 rounded-md bg-[#aa8362] mt-4 w-full cursor-pointer'>Ajouter</button>
                </form>
            </div>
        </div>
    );
}

export default AjoutReservation;
