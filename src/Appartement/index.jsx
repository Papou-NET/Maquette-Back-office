import React, { useEffect, useState } from 'react';
import Table from '../Table';
import { useNavigate } from 'react-router-dom';
import { appartementAPI } from '../API/api';

const Appartement = () => {

    const navigate = useNavigate()

    const tableheader = ["Batiment", "Etage", "Lot", 'Typologie', "Surface", "Statut", "Action"]

   const [tableData, setTableData] = useState([])

    const [search, setSearch] = useState("")

    useEffect(()=>{
        const fetchData = async () => {
           try{
                let res;
                if(search !== ""){
                    res = await appartementAPI.search(search)
                }else {
                    res = await appartementAPI.getAll();
                }
                
                setTableData(res.data)
           }catch(err) {
            console.log(err);
           }
        }
        fetchData()
    },[search])

    
    const addSearch = (key) => {
        setSearch(key)
    }


    return (
        <div>
            <Table thead={tableheader} tbody={tableData} tableFor="Appartements" 
            addSearch={addSearch} search={search}/>
        </div>
    );
}

export default Appartement;
