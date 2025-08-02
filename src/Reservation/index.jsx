import React, { useEffect, useState } from 'react';
import Table from '../Table';
import { reservationAPI } from '../API/api';

const Reservation = ({toggledisplayreservation, getReservation, toggledisplayaddreservation}) => {

    const tableheader = ["Numero", "Appartements", "Clients", 'Début', "Fin", "Action"]

   const [tableData, setTableData] = useState([])

   const [search, setSearch] = useState("")

    useEffect(()=>{
        const fetchData = async () => {
           try{
                let res;
                if(search !== ""){
                    res = await reservationAPI.search(search)
                }else {
                    res = await reservationAPI.getAll()
                }
                setTableData(res.data)
           }catch(error) {
            console.log(error);
           }

        }
        fetchData()
    },[search])

    const addSearch = (key) => {
        setSearch(key)
    }

    return (
        <div>
            <Table thead={tableheader} tbody={tableData} tableFor="Reservations" toggledisplayreservation={toggledisplayreservation} 
            getReservation={getReservation} addSearch={addSearch} search={search} toggledisplayaddreservation={toggledisplayaddreservation}/>
        </div>
    );
}

export default Reservation;
