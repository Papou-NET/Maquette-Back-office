import React, { useState } from 'react';
import { FaEdit, FaEye, FaPlusCircle, FaRegPlusSquare, FaSearch, FaTrash } from 'react-icons/fa';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Pagination from '../Pagination';
import { useNavigate } from 'react-router-dom';
import { ClientsAPI, reservationAPI } from '../API/api';

const Table = ({thead, tbody, tableFor, toggleDisplayAdd, getClient, toggleDisplayUpdateClient, toggleDisplayDetailClient, toggledisplayreservation, getReservation, addSearch, search, toggledisplayaddreservation}) => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 8
    const lastIndex = currentPage * limit
    const firstIndex = lastIndex - limit
    const records = tbody.slice(firstIndex, lastIndex)
    const total = tbody.length
    const totalPages = Math.ceil(total / limit);

    const navigate = useNavigate()

    const deleteClient = async (id) => {
        try{
            await ClientsAPI.delete(id)
            alert("Supprimé avec succès")
        }catch(err){    
            console.log(err);
        }
    }

    const deleteReservation = async (id) => {
        try{
            await reservationAPI.delete(id)
            alert("Supprimé avec succès")
        }catch(err){    
            console.log(err);
        }
    }

    return (
        <div>
           {
                tableFor === "Clients" &&
                <div className='flex justify-center sm:justify-between items-center gap-5 flex-wrap'>
                    <button className='flex gap-2 bg-gray-800 text-white px-4 py-2 items-center rounded-[25px] cursor-pointer'
                     onClick={toggleDisplayAdd}>
                        <AiOutlinePlusCircle className='rounded-[25px] text-xl' /> <span className="hidden sm:block">
                            Ajouter nouveau client</span>
                    </button>
                    <div className='border-2 border-[#aa8362] relative rounded-[25px] px-4 py-2'>
                        <input type="text" className='outline-none w-[200px] sm:w-[300px]' placeholder='Recherche' value={search} onChange={(e)=>addSearch(e.target.value)}/>
                        <FaSearch className='absolute top-3 right-2 text-lg'/>
                    </div> 
                </div>
             }
             {
                tableFor === "Reservations" &&
                <div className='flex justify-center sm:justify-between items-center gap-5 flex-wrap'>
                    <button className='flex gap-2 bg-gray-800 text-white px-4 py-2 items-center rounded-[25px] cursor-pointer'
                     onClick={toggledisplayaddreservation}>
                        <AiOutlinePlusCircle className='rounded-[25px] text-xl' /> <span className="hidden sm:block">
                            Ajouter une réservation</span>
                    </button>
                    <div className='border-2 border-[#aa8362] relative rounded-[25px] px-4 py-2'>
                        <input type="text" className='outline-none w-[200px] sm:w-[300px]' placeholder='Recherche' value={search} onChange={(e)=>addSearch(e.target.value)}/>
                        <FaSearch className='absolute top-3 right-2 text-lg'/>
                    </div> 
                </div>
            }
            {
                tableFor === "Appartements" &&
                <div className='flex justify-center sm:justify-end'>
                    <div className='border-2 border-[#aa8362] relative rounded-[25px] px-4 py-2'>
                        <input type="text" className='outline-none w-[200px] sm:w-[300px]' placeholder='Recherche' value={search} onChange={(e)=>addSearch(e.target.value)}/>
                        <FaSearch className='absolute top-3 right-2 text-lg'/>
                    </div> 
                </div>
            }
                <div className='overflow-x-auto'>
                    <table className='w-full mt-6 bg-gray-200 rounded min-w-[700px]'>
                        <thead className='bg-[#aa8362] text-white border-b-5 border-white'>
                            <tr>
                                {
                                    thead.map((th, i)=> {
                                        return <th key={i} className={`py-3 ${th[i] !== thead.length - 1 ? 'border-r-2 border-white' : ''}`}>
                                            {th}</th>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !tbody ? <p>Chargement...</p> :
                                records.map((data, i)=> {
                                    return <tr key={i} className='text-right font-semibold'>
                                        {
                                            tableFor==="Appartements" && 
                                            <>
                                                <td className='py-3'>{data.batiment}</td>
                                                <td className='py-3'>{data.etage}</td>
                                                <td className='py-3'>{data.lot}</td>
                                                <td className='py-3'>{data.Typologie}</td>
                                                <td className='py-3'>{data.Surface}</td>
                                                <td className='py-3'>{data.Status}</td>
                                                <td className='flex gap-4 justify-center py-3'>
                                                    <FaEye className="cursor-pointer" 
                                                    onClick={()=>navigate(`/appartements/${data.id}`)}/>
                                                    <FaEdit className="cursor-pointer"
                                                     onClick={()=>navigate(`/appartements/modifier/${data.id}`)}/>
                                                </td>
                                            </>
                                        }
                                        {
                                            tableFor==="Clients" && 
                                            <>
                                                <td className='py-3'>{data.nom}</td>
                                                <td className='py-3'>{data.prenoms}</td>
                                                <td className='py-3'>{data.contact}</td>
                                                <td className='py-3'>{data.email}</td>
                                                <td className='flex gap-4 justify-center py-3'>
                                                    <FaEye className="cursor-pointer" onClick={()=>{
                                                        getClient(data.id)
                                                        toggleDisplayDetailClient()
                                                    }}/>
                                                    <FaEdit className="cursor-pointer" onClick={()=>{
                                                        getClient(data.id)
                                                        toggleDisplayUpdateClient()
                                                    }}/>
                                                    <FaTrash className="cursor-pointer" onClick={()=>deleteClient(data.id)}/>
                                                </td>
                                            </>
                                        }
                                        {
                                            tableFor==="Reservations" && 
                                            <>
                                                <td className='py-3'>{data.numero}</td>
                                                <td className='py-3'>{data.appartement}</td>
                                                <td className='py-3'>{data.client}</td>
                                                <td className='py-3'>{data.dateDébut}</td>
                                                <td className='py-3'>{data.dateFin}</td>
                                                <td className='flex gap-4 justify-center py-3'>
                                                    <FaEye className="cursor-pointer" onClick={()=>{
                                                        getReservation(data.id)
                                                        toggledisplayreservation()
                                                    }}/>
                                                    <FaTrash className="cursor-pointer" onClick={()=>deleteReservation(data.id)}/>
                                                </td>
                                            </>
                                        }
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
    );
}

export default Table;
