import React, { useEffect, useState } from 'react';
import homme from '../../assets/homme.jpg'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { ClientsAPI } from '../../API/api';

const DetailClient = ({idClient, toggleDisplayDetailClient}) => {

    const [data, setData] = useState({
        photo:"",
        nom:"",
        prenoms:"",
        contact:"",
        email:"",
        adresse:"",
        pays:"",
        Ville:"",
        CodePostal:""
    })

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

    return (
        <div className='fixed top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.7)] z-80 flex items-center 
        justify-center'>
             
            <div className='w-[70%] h-auto bg-white rounded py-6 px-6 relative'>
                <h1 className='text-2xl font-bold'>{data.prenoms} {data.nom}</h1>
                <AiOutlineCloseCircle className='absolute top-0 right-0 text-xl cursor-pointer' onClick={toggleDisplayDetailClient}/> 
                <div className='flex justify-center items-center mt-6 gap-[10px] w-full'>
                    <div className='w-[50%]'>
                        <img src={homme} className='w-[300px] h-[300px] rounded-[50%] object-cover'/>
                    </div>
                    <div  className='w-[50%]'>
                        <div className='flex w-full justify-center items-center flex-wrap'>
                            <h3 className='min-w-[150px] bg-gray-400 rounded mr-4 text-right p-2'>Télephone</h3>
                            <p className='w-[50%] ml-4'>{data.contact}</p>
                        </div>
                        <div className='flex w-full justify-center items-center flex-wrap mt-2'>
                            <h3 className='min-w-[150px] bg-gray-400 rounded mr-4 text-right p-2'>E-mail</h3>
                            <p className='w-[50%] ml-4'>{data.email}</p>
                        </div>
                        <div className='flex w-full justify-center items-center flex-wrap mt-2'>
                            <h3 className='min-w-[150px] bg-gray-400 rounded mr-4 text-right p-2'>Adresse</h3>
                            <p className='w-[50%] ml-4'>{data.adresse}</p>
                        </div>
                        <div className='flex w-full justify-center items-center flex-wrap mt-2'>
                            <h3 className='min-w-[150px] bg-gray-400 rounded mr-4 text-right p-2'>Ville</h3>
                            <p className='w-[50%] ml-4'>{data.Ville}</p>
                        </div>
                        <div className='flex w-full justify-center items-center flex-wrap mt-2'>
                            <h3 className='min-w-[150px] bg-gray-400 rounded mr-4 text-right p-2'>Code postal</h3>
                            <p className='w-[50%] ml-4'>{data.CodePostal}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailClient;
