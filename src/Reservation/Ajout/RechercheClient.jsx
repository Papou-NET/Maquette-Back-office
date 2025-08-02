import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';

const RechercheClient = ({handleDisplayClient}) => {
    return (
        <div className='fixed top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.7)] z-100 flex items-center 
        justify-center'>
            <div className='w-[40%] h-auto bg-white rounded py-6 px-6 relative'>
                <AiOutlineCloseCircle className='absolute top-0 right-0 text-xl cursor-pointer' onClick={handleDisplayClient} /> 
                <div className='border-2 border-[#aa8362] relative rounded-[25px] px-4 py-2'>
                    <input type="text" className='outline-none w-[200px] sm:w-[300px]' placeholder='Recherche' />
                    <FaSearch className='absolute top-3 right-2 text-lg'/>
                </div> 
                <div className='overflow-x-auto'>
                    <table className='w-full mt-6 bg-gray-200 rounded'>
                        <thead className='bg-[#aa8362] text-white border-b-5 border-white'> 
                            <tr>
                                <th>id</th>
                                <th>Nom</th>
                                <th>Prenoms</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>sdfsd</td>
                                <td>sdfsd</td>
                                <td>sdfsd</td>
                            </tr>
                            <tr>
                                <td>sdfsd</td>
                                <td>sdfsd</td>
                                <td>sdfsd</td>
                            </tr>
                            <tr>
                                <td>sdfsd</td>
                                <td>sdfsd</td>
                                <td>sdfsd</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RechercheClient;
