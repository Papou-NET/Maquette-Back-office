import React from 'react';
import { FaHome } from 'react-icons/fa';

const DashboardCard = ({ title, value }) => {
    return (
        <div
            className={`h-auto rounded-md text-white p-4 flex-grow relative w-full overflow-hidden border-2
            ${title === "Appartement" ? 'max-w-full min-w-[250px] bg-[#125686]' : 'max-w-full min-w-[200px]'}
            ${title === "Disponible" && 'bg-[#1d2c31] border-[#1d2c31]'}
            ${title === "Vendu" && 'bg-[#45413e] border-[#45413e]'}
            ${title === "Réservé" && 'bg-[#797166] border-[#797166]'}`
            }
        >
            <div className='flex justify-between items-center text-2xl'>
                <h2>{title}</h2>
                {title === "Appartement" && <FaHome />}
            </div>
            <h3 className='text-[50px]'>{value}</h3>
            {
                title !== "Appartement" &&
                <div className="absolute bottom-0 right-0 w-22 h-22 bg-white rounded-full translate-x-1/3 translate-y-1/3">
                </div>
            }
        </div>
    );
}

export default DashboardCard;
