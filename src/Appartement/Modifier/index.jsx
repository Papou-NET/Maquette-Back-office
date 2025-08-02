import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appartementAPI } from '../../API/api';

const ModifierAppartement = () => {

    const params = useParams()
    const id = params.id
    const initialData = {
        batiment:"",
        etage:"",
        lot:"",
        Typologie:"",
        Surface:"",
        Status:""
    }
    const [data, setData] = useState(initialData);
    const status = ["Disponible", "Réservé", "Vendu"]
    useEffect(()=>{
        const fetchData = async () => {
            try{
                const res = await appartementAPI.getOne(id)
                setData({
                    batiment: res.data.batiment,
                    etage: res.data.etage,
                    lot: res.data.lot,
                    Typologie: res.data.Typologie,
                    Surface: res.data.Surface,
                    Status: res.data.Status,
                })
            }catch(err){
                console.log(err);
            }
        }
        fetchData()
    },[])

    const submitUpdate = async (e) => {
        e.preventDefault();
        try{
            await appartementAPI.update(id, data)
            alert("Modification réussi !")
        }catch(err){
            console.log(err);
        }
    }

    return (
        <>
            <h1 className='text-3xl font-bold'>Modifier l'appartement {id}</h1>
            <form onSubmit={submitUpdate}>
                <div className='flex justify-between gap-[20px] mt-5'>
                    <div className='w-[50%] p-4'>
                        <div className='mt-[15px]'>
                            <label className='text-lg font-semibold ml-2'>Bâtiment</label>
                            <input type="text" value={data.batiment} onChange={e=>setData({...data, batiment:e.target.value})} 
                            className='w-full block outline-none border-2 border-gray-600 rounded-md px-6 py-2 mt-2' required/>
                        </div>
                        <div className='mt-[15px]'>
                            <label className='text-lg font-semibold ml-2'>Lot</label>
                            <input type="text" value={data.lot} onChange={e=>setData({...data, lot:e.target.value})} 
                            className='w-full block outline-none border-2 border-gray-600 rounded-md px-6 py-2 mt-2' required/>
                        </div>
                        <div className='mt-[15px]'>
                            <label className='text-lg font-semibold ml-2'>Typologie</label>
                            <input type="text" value={data.Typologie} onChange={e=>setData({...data, Typologie:e.target.value})}
                            className='w-full block outline-none border-2 border-gray-600 rounded-md px-6 py-2 mt-2' required/>
                        </div>
                    </div>
                    <div className='w-[50%] p-4'>
                        <div className='mt-[15px]'>
                            <label className='text-lg font-semibold ml-2'>Etage</label>
                            <input type="text" value={data.etage} onChange={e=>setData({...data, etage:e.target.value})}
                            className='w-full block outline-none border-2 border-gray-600 rounded-md px-6 py-2 mt-2' required/>
                        </div>
                        <div className='mt-[15px]'>
                            <label className='text-lg font-semibold ml-2'>Surface</label>
                            <input type="text" value={data.Surface} onChange={e=>setData({...data, Surface:e.target.value})}
                            className='w-full block outline-none border-2 border-gray-600 rounded-md px-6 py-2 mt-2' required/>
                        </div>
                        <div className='mt-[15px]'>
                            <label className='text-lg font-semibold ml-2'>Status</label>
                            <select className='w-full block outline-none border-2 border-gray-600 rounded-md px-6 py-2 mt-2 cursor-pointer'
                             value={data.Status} onChange={e=>setData({...data, Status:e.target.value})}>
                                 <option value={data.Status}>{data.Status}</option>
                                {
                                    status.map((stat, index) => {
                                        return (
                                            <Fragment key={index}>
                                                {stat !== data.Status && <option value={stat}>{stat}</option>}
                                            </Fragment>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className='text-center mt-[20px]'>
                    <button type='submit' className='w-[300px] h-[50px] border-none bg-[#aa8362] rounded-md text-white font-bold
                    cursor-pointer'>Enregistrer</button>
                </div>
            </form>
        </>
    );
}

export default ModifierAppartement;
