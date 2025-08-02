import React from 'react';
import { FaHome } from 'react-icons/fa';

const DashboardCard = ({title, value}) => {
    return (
        <div className={`h-auto rounded-md text-white p-4 flex-grow relative overflow-hidden
        ${title==="Appartement" ? 'max-w-[300px] min-w-[250px] bg-[#aa8362]' : 'max-w-[250px] min-w-[200px]'}
        ${title==="Disponible" && 'bg-[#1d2c31]'}
        ${title==="Vendu" && 'bg-[#45413e]'}
        ${title==="Réservé" && 'bg-[#797166]'}`
        }>
            <div className='flex justify-between items-center text-2xl'>
                <h2>{title}</h2>
                {title==="Appartement" ? <FaHome /> : ""}
            </div>
            <h3 className='text-[50px]'>{value}</h3>
        </div>
    );
}

export default DashboardCard;