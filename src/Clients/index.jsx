import React, { useEffect, useState } from 'react';
import Table from '../Table';
import { ClientsAPI } from '../API/api';

const Client = ({toggleDisplayAdd, getClient, toggleDisplayDetailClient, toggleDisplayUpdateClient}) => {

    const tableheader = ["Nom", "Prénoms", "Contact", 'E-mail', "Action"]

   const [tableData, setTableData] = useState([])

   const [search, setSearch] = useState("")

    useEffect(()=>{
        const fetchData = async () => {
           try{
                let res;
                if(search !== ""){
                    res = await ClientsAPI.search(search)
                }else {
                    res = await ClientsAPI.getAll()
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
            <Table thead={tableheader} tbody={tableData} tableFor="Clients" toggleDisplayAdd={toggleDisplayAdd}
           toggleDisplayDetailClient={toggleDisplayDetailClient} toggleDisplayUpdateClient={toggleDisplayUpdateClient} getClient={getClient} 
           addSearch={addSearch} search={search}/>
        </div>
    );
}

export default Client;
