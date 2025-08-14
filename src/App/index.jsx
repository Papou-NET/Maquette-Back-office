import React, { Fragment, useEffect, useState } from 'react';
import '../App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from '../Login';
import Sidebar from '../Sidebar';
import Dashboard from '../Dashboard';
import PrivateRoute from '../PrivateRoute';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { IoSettingsSharp } from 'react-icons/io5';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import Appartement from '../Appartement';
import Client from '../Clients';
import Reservation from '../Reservation';
import DetailAppartement from '../Appartement/Detail';
import ModifierAppartement from '../Appartement/Modifier';
import AjouterClient from '../Clients/Ajouter';
import DetailClient from '../Clients/Detail';
import ModifierClient from '../Clients/Modifier';
import DetailReservation from '../Reservation/Detail';
import AjoutReservation from '../Reservation/Ajout';
import { ToastContainer } from 'react-toastify';

const App = () => {

  const [sidebarCollapsed, setsidebarCollapsed] = useState(false);
  const [displayAdd, setDisplayAdd] = useState(false)
  const [idClient, setIdClient] = useState()
  const [displayDetailClient, setDisplayDetailClient] = useState(false);
  const [displayUpdateClient, setDisplayUpdateClient] = useState(false);
  const [displayAddReservaiton, setDisplayAddReservaiton] = useState(false);
  const [displayDetailReservaiton, setDisplayDetailReservaiton] = useState(false);
  const [idReservation, setIdRservation] = useState()
  const [fetchCardData, setFetchCardData] = useState(0)

  const toggleDisplayAdd = () => {
    setDisplayAdd(prev => !prev)
  }

  const toggleDisplayDetailClient = () => {
    setDisplayDetailClient(prev => !prev)
  } 

  const getClient = (id) => {
    setIdClient(id)
  }


  const toggleDisplayUpdateClient = () => {
    setDisplayUpdateClient(prev => !prev)
  } 

  const toggledisplayreservation = () => {
    setDisplayDetailReservaiton(prev => !prev)
  }

  const toggledisplayaddreservation = () => {
    setDisplayAddReservaiton(prev => !prev)
  }

  const getReservation = (id) => {
    setIdRservation(id)
  }

  const toggleSidebar = () => {
    setsidebarCollapsed(prev => !prev)
  }

  const reloadCard = () => {
    setFetchCardData(prev => prev +1)
  }

  const logout = () => {
    sessionStorage.removeItem("admin")
    sessionStorage.removeItem("token")
    window.location.reload()
  }
  return (
    <Fragment>
        <ToastContainer />
        {displayAdd && <AjouterClient toggleDisplayAdd={toggleDisplayAdd} />}
        {displayDetailClient && <DetailClient toggleDisplayDetailClient={toggleDisplayDetailClient} idClient={idClient} />}
        {displayUpdateClient && <ModifierClient toggleDisplayUpdateClient={toggleDisplayUpdateClient} idClient={idClient} />}
        {displayDetailReservaiton && <DetailReservation toggledisplayreservation={toggledisplayreservation} idReservation={idReservation} />}
        {displayAddReservaiton && <AjoutReservation toggledisplayreservation={toggledisplayaddreservation} />}
        <BrowserRouter>
          <Routes>

              <Route path='/login' element={<Login />} />
              <Route path='/' element={<Navigate to="/dashboard" />} />

              <Route path='*' element= {
                 <PrivateRoute>
                    <div className='relative w-full h-screen overflow-hidden'>
                        <Sidebar sidebarCollapsed={sidebarCollapsed} toggleSidebar={toggleSidebar}/>
                        <div className='w-[140px] h-[50px] rounded-2xl bg-[#125686] fixed top-[10px] sm:right-[10px] z-50 hidden sm:flex
                        justify-evenly items-center text-xl text-white'>
                          <MdOutlinePersonOutline className='cursor-pointer'/>
                          <IoSettingsSharp className='cursor-pointer'/>
                          <RiLogoutBoxRLine className='cursor-pointer' onClick={logout}/>
                        </div>
                        <div className={`absolute top-[120px] left-[10px]  right-[0] h-[90%] p-4 pr-[30px] z-10
                         transition-all duration-500 ease-in-out overflow-y-auto
                          ${sidebarCollapsed ? 'lg:left-[10px]' : 'lg:left-[310px]'}`}>
                          <Routes>
                                <Route path='/dashboard' element={<Dashboard fetchCardData={fetchCardData}/>} />
                                <Route path='/appartements' element={<Appartement />} />
                                <Route path='/appartements/:id' element={<DetailAppartement />} />
                                <Route path='/appartements/modifier/:id' element={<ModifierAppartement reloadCard={reloadCard} />} />
                                <Route path='/clients' element={<Client toggleDisplayAdd={toggleDisplayAdd} toggleDisplayUpdateClient={toggleDisplayUpdateClient} 
                                toggleDisplayDetailClient={toggleDisplayDetailClient} getClient={getClient} />} />
                                <Route path='/reservations' element={<Reservation toggledisplayreservation={toggledisplayreservation}
                                 getReservation={getReservation} toggledisplayaddreservation={toggledisplayaddreservation} reloadCard={reloadCard}/>}/>
                          </Routes>
                        </div>
                    </div>
                </PrivateRoute>
              } />

          </Routes>
        </BrowserRouter>
    </Fragment>
  );
}

export default App;
