import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { LuUpload } from 'react-icons/lu';
import { ClientsAPI } from '../../API/api';

const ModifierClient = ({idClient,toggleDisplayUpdateClient}) => {

    const fileRef = useRef()

    const initialData = {
        photo: "",
        nom: "",
        prenoms: "",
        email: "",
        contact: "",
        adresse: "",
        CodePostal: "",
        Ville: ""
    }

    const [data, setData] = useState(initialData)

    const handleClickFile = (e) => {
        e.preventDefault();
        fileRef.current.click();
    }

    useEffect(()=>{
        const fetchData = async () => {
            try{    
                const res = await ClientsAPI.getOne(idClient)
                setData({
                    photo: res.data.photo,
                    nom: res.data.nom,
                    prenoms: res.data.prenoms,
                    contact: res.data.contact,
                    email: res.data.email,
                    adresse: res.data.adresse,
                    pays: res.data.pays,
                    Ville: res.data.Ville,
                    CodePostal: res.data.CodePostal
                })
            }catch(error) {
                console.log(error);
            }
        }
        fetchData()
    },[])

    const submitClient = async (e) => {
        e.preventDefault();
        try {
            await ClientsAPI.update(idClient, data)
        } catch(error){
            console.log(error);
        }

    }

    return (
        <div className='fixed top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.7)] z-80 flex items-center 
        justify-center'>
            <div className='w-[50%] h-auto bg-white rounded py-6 px-6 relative'>
                <h2 className='text-xl font-bold'>Modifier le client d'id {idClient}</h2>
                <AiOutlineCloseCircle className='absolute top-0 right-0 text-xl cursor-pointer' onClick={toggleDisplayUpdateClient}/> 
                <form onSubmit={submitClient}>
                    <div className='w-full flex gap-6 items-center mt-4'>
                        <div className='w-[50%] flex items-center'>
                            <button className='font-bold text-white py-3 rounded-md bg-[#aa8362] w-full
                             w-full cursor-pointer flex justify-center' onClick={handleClickFile}><LuUpload className='text-2xl'/></button>
                            <input type="file" className='hidden' ref={fileRef}
                             onChange={(e)=>setData({...data, photo: e.target.value})} />
                        </div>
                        <span className='w-[50%] text-lg font-semibold'>
                            Importer la photo de profil</span>
                    </div>
                    <div className='w-full flex gap-6 items-center mt-4'>
                        <div className='w-[50%]'>
                            <label className='font-semibold ml-2'>Nom *</label>
                            <input type="text" className='block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full'
                            value={data.nom} onChange={e=>setData({...data, nom: e.target.value})} required/>
                        </div>
                        <div className='w-[50%]'>
                            <label className='font-semibold ml-2'>Prénoms *</label>
                            <input type="text" className='block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full' 
                            value={data.prenoms} onChange={e=>setData({...data, prenoms: e.target.value})} required/>
                        </div>
                    </div>
                    <div className='w-full flex gap-6 items-center mt-4'>
                        <div className='w-[50%]'>
                            <label className='font-semibold ml-2'>E-mail *</label>
                            <input type="text" className='block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full'
                            value={data.email} onChange={e=>setData({...data, email: e.target.value})} required/>
                        </div>
                        <div className='w-[50%]'>
                            <label className='font-semibold ml-2'>Contact</label>
                            <input type="text" className='block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full' 
                            value={data.contact} onChange={e=>setData({...data, contact: e.target.value})} required/>
                        </div>
                    </div>
                    <div className='w-full mt-4'>
                        <label className='font-semibold ml-2'>Adresse</label>
                        <input type="text" className='block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full' 
                        value={data.adresse} onChange={e=>setData({...data, adresse: e.target.value})} required/>
                    </div>
                    <div className='w-full flex gap-6 items-center mt-4'>
                        <div className='w-[50%]'>
                            <label className='font-semibold ml-2'>Code postal *</label>
                            <input type="text" className='block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full' 
                            value={data.CodePostal} onChange={e=>setData({...data, CodePostal: e.target.value})} required/>
                        </div>
                        <div className='w-[50%]'>
                            <label className='font-semibold ml-2'>Ville</label>
                            <input type="text" className='block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full' 
                            value={data.Ville} onChange={e=>setData({...data, Ville: e.target.value})} required/>
                        </div>
                    </div>
                    <button className='font-bold text-white py-3 rounded-md bg-[#aa8362] mt-4 w-full cursor-pointer'>Modifier</button>
                </form>
            </div>
        </div>
    );
}

export default ModifierClient;
