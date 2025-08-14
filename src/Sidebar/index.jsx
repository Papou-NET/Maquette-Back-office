import React, { useState } from 'react';
import { FaBars, FaBuilding, FaCalendarCheck, FaRegBuilding, FaUsers } from 'react-icons/fa'
import { IoSettingsSharp } from 'react-icons/io5';
import logo from "../assets/Logo-achakar-fond-transparent.png";
import { MdDashboard, MdOutlinePersonOutline } from 'react-icons/md'
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({sidebarCollapsed, toggleSidebar}) => {

    const navs = [
        {nom:"Tableau de bord", path:"/dashboard"},
        {nom:"Appartements", path:"/appartements"},
        {nom:"Clients", path:"/clients"},
        {nom:"Réservations", path:"/reservations"},
    ]

    const location = useLocation()
    const navigate = useNavigate()

    const navClicked = (param) => {
        navigate(param)
        const width = window.innerWidth
        if(width < 768) {
            toggleSidebar()
        }
    }

    const logout = () => {
      sessionStorage.removeItem("admin")
      sessionStorage.removeItem("token")
      window.location.reload()
    }
    
    return (
        <div className={`fixed top-[10px] left-[10px] right-[10px] bg-[#125686] z-20 transition-all duration-500 ease-in-out overflow-hidden
        sm:w-[300px] rounded-2xl ${sidebarCollapsed ? 'h-[100px]' : 'h-[500px] sm:h-[97%]'}`}>
          <div className='flex justify-between items-center h-[100px] px-4'>
            <h1 className='text-white text-2xl'>
              <img src={logo} className='w-[30%]'/>
            </h1>
            <div className='w-[200px] h-[50px] rounded-2xl bg-[#125686] sm:hidden flex justify-evenly items-center text-xl text-white'>
                <MdOutlinePersonOutline className='cursor-pointer'/>
                <IoSettingsSharp className='cursor-pointer'/>
                <RiLogoutBoxRLine className='cursor-pointer' onClick={logout}/>
            </div>
            <button className=' w-[20px] h-[20px] cursor-pointer text-2xl text-white' onClick={toggleSidebar}>
              <FaBars />
            </button>  
          </div>
          <div className='px-4'>
            <div className='h-[2px] bg-white'></div>
          </div>
          <div className='w-full mt-[50px] h-auto text-white'>
            {
                navs.map((nav, index)=> {
                    const active = location.pathname
                    return <div className='w-full relative flex justify-center items-center mt-6' key={index}>
                                <div className={`w-[80%] px-2 py-3 border-2 border-white rounded-md font-bold cursor-pointer flex gap-2 items-center
                                    ${active.startsWith(nav.path)
                                       ? 'bg-[#125686] text-white' : 'bg-white text-[#125686]'}`}
                                     onClick={()=>navClicked(nav.path)}>
                                    {nav.nom === "Tableau de bord" && <MdDashboard />}
                                    {nav.nom === "Appartements" && <FaRegBuilding/>}
                                    {nav.nom === "Clients" && <FaUsers/>}
                                    {nav.nom === "Réservations" && <FaCalendarCheck />}
                                    {nav.nom}
                                </div>
                               <div className={`absolute right-0 h-[5px] bg-white hidden sm:block transition-all ease-in-out duration-500
                               ${active.startsWith(nav.path) ? 'w-[7%]' : 'w-[0]'}`}></div>
                            </div>
                })
            }
          </div>
        </div>
    );
}

export default Sidebar;
