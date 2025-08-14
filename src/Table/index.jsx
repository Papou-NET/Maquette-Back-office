import React, { useState } from 'react';
import { FaEdit, FaEye, FaPlusCircle, FaRegPlusSquare, FaSearch, FaTrash } from 'react-icons/fa';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Pagination from '../Pagination';
import { useNavigate } from 'react-router-dom';
import { ClientsAPI, reservationAPI } from '../API/api';
import Swal from 'sweetalert2';

const Table = ({thead, tbody, tableFor, toggleDisplayAdd, getClient, toggleDisplayUpdateClient, toggleDisplayDetailClient, removeClient, toggledisplayreservation, getReservation, removeReservation ,addSearch, search, toggledisplayaddreservation, reloadCard}) => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 8
    const lastIndex = currentPage * limit
    const firstIndex = lastIndex - limit
    const records = tbody.slice(firstIndex, lastIndex)
    const total = tbody.length
    const totalPages = Math.ceil(total / limit);

    const navigate = useNavigate()

    const deleteClient = async (e, id) => {
        e.preventDefault();
        Swal.fire({
          title: `Êtes-vous sûr de supprimer le client d'id ${id} ?`,
          text: 'Cette action est irréversible !',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui, supprimer !',
          cancelButtonText: 'Annuler'
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await ClientsAPI.delete(id);
              Swal.fire('Supprimé !', 'Le client a été supprimé avec succès', 'success');
              removeClient(id)
            } catch (err) {
              console.error(err);
              Swal.fire('Erreur', "Une erreur s'est produite lors de la suppression", 'error');
            }
          }
        });
      };
      

      const formatdDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('fr-FR')
      }

    const deleteReservation = async (id) => {
      
        Swal.fire({
            title: `Êtes-vous sûr de supprimer la réservation d'id ${id} ?`,
            text: 'Cette action est irréversible !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer !',
            cancelButtonText: 'Annuler'
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                await reservationAPI.delete(id)
                Swal.fire('Supprimé !', 'La réservation a été supprimée avec succès', 'success');
                removeReservation(id)
                reloadCard()
              } catch (err) {
                console.error(err);
                Swal.fire('Erreur', "Une erreur s'est produite lors de la suppression", 'error');
              }
            }
          });
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
                    <div className='border-2 border-[#125686] relative rounded-[25px] px-4 py-2'>
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
                    <div className='border-2 border-[#125686] relative rounded-[25px] px-4 py-2'>
                        <input type="text" className='outline-none w-[200px] sm:w-[300px]' placeholder='Recherche' value={search} onChange={(e)=>addSearch(e.target.value)}/>
                        <FaSearch className='absolute top-3 right-2 text-lg'/>
                    </div> 
                </div>
            }
            {
                tableFor === "Appartements" &&
                <div className='flex justify-center sm:justify-end'>
                    <div className='border-2 border-[#125686] relative rounded-[25px] px-4 py-2'>
                        <input type="text" className='outline-none w-[200px] sm:w-[300px]' placeholder='Recherche' value={search} onChange={(e)=>addSearch(e.target.value)}/>
                        <FaSearch className='absolute top-3 right-2 text-lg'/>
                    </div> 
                </div>
            }
                <div className='overflow-x-auto'>
                    <table className='w-full mt-6 bg-gray-200 rounded min-w-[700px]'>
                        <thead className='bg-[#125686] text-white border-b-5 border-white'>
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
                                tbody.length === 0 ? <tr><td className='text-center py-2'>Chargement...</td></tr> :
                                records.map((data, i)=> {
                                    const rowClass =
                                    i % 2 === 0
                                    ? "bg-blue-50 text-black"
                                    : "bg-blue-100 text-black";
                                    return  <tr key={i} className={`text-right font-semibold ${rowClass}`}>
                                        {
                                            tableFor==="Appartements" && 
                                            <>
                                                <td className='py-3 pr-2'>{data.immeuble?.numImmeuble}</td>
                                                <td className='py-3 pr-2'>{data.etageAppart}</td>
                                                <td className='py-3 pr-2'>{data.lotAppart}</td>
                                                <td className='py-3 pr-2'>{data.typologieAppart}</td>
                                                <td className='py-3 pr-2'>{data.surfaceAppart} m²</td>
                                                <td className='pr-2'
                                                >
                                                <span
                                                className={`px-2 py-1 font-bold rounded text-center
                                                    ${data.statutAppart === "Disponible" ? "text-blue-600 bg-blue-200" : ""}
                                                    ${data.statutAppart === "Réservé" ? "text-green-600 bg-green-200" : ""}
                                                    ${data.statutAppart === "Vendu" ? "text-red-600 bg-red-200" : ""}`}>
                                                {data.statutAppart}</span>
                                                </td>
                                                <td className='flex gap-4 justify-center py-3'>
                                                    <FaEye className="cursor-pointer" 
                                                    onClick={()=>navigate(`/appartements/${data.idAppart}`)}/>
                                                    <FaEdit className="cursor-pointer"
                                                     onClick={()=>navigate(`/appartements/modifier/${data.idAppart}`)}/>
                                                </td>
                                            </>
                                        }
                                        {
                                            tableFor==="Clients" && 
                                            <>
                                                <td className='py-3 pr-2'>{data.nom}</td>
                                                <td className='py-3 pr-2'>{data.prenoms}</td>
                                                <td className='py-3 pr-2'>{data.contact}</td>
                                                <td className='py-3 pr-2'>{data.email}</td>
                                                <td className='flex gap-4 justify-center py-3'>
                                                    <FaEye className="cursor-pointer" onClick={()=>{
                                                        getClient(data.id)
                                                        toggleDisplayDetailClient()
                                                    }}/>
                                                    <FaEdit className="cursor-pointer" onClick={()=>{
                                                        getClient(data.id)
                                                        toggleDisplayUpdateClient()
                                                    }}/>
                                                    <FaTrash className="cursor-pointer" onClick={(e)=>deleteClient(e, data.id)}/>
                                                </td>
                                            </>
                                        }
                                        {
                                            tableFor==="Reservations" && 
                                            <>
                                                <td className='py-3 pr-2'>{data.reference}</td>
                                                <td className='py-3 pr-2'>{data.appartement ? data.appartement.lotAppart : ""}</td>
                                                <td className='py-3 pr-2'>{data.client ? data.client.nom : ""}</td>
                                                <td className='py-3 pr-2'>{data.dateDeb ? formatdDate(data.dateDeb) : `Vente(${formatdDate(data.dateVente)}))`}</td>
                                                <td className='py-3 pr-2'>{data.dateFin ? formatdDate(data.dateFin) : `Vente(${formatdDate(data.dateVente)})`}</td>
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
