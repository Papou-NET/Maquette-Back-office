import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';
import { ClientsAPI } from '../../API/api';
import Pagination from '../../Pagination';

const RechercheClient = ({ handleDisplayClient, getClient, clientClicked, rejectClient }) => {
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 5;
  const lastIndex = currentPage * limit;
  const firstIndex = lastIndex - limit;
  const records = tableData.slice(firstIndex, lastIndex);
  const total = tableData.length;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        if (search !== "") {
          res = await ClientsAPI.search(search);
        } else {
          res = await ClientsAPI.getAll();
        }
        setTableData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [search]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] z-100 flex items-center justify-center">
      <div className="w-[95%] md:w-[60%] lg:w-[40%] max-h-[90vh] overflow-y-auto bg-white rounded py-6 px-6 relative">
        <AiOutlineCloseCircle
          className="absolute top-2 right-2 text-2xl cursor-pointer"
          onClick={handleDisplayClient}
        />

        {/* Barre de recherche */}
        <div className="border-2 border-[#aa8362] relative rounded-[25px] px-4 py-2 mt-2">
          <input
            type="text"
            className="outline-none w-full pr-8"
            placeholder="Recherche"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute top-3 right-4 text-lg" />
        </div>

        {/* Client sélectionné */}
        <h1 className="mt-2 text-center text-sm md:text-base">
          {clientClicked ? `ID client : ${clientClicked}` : "Pas de client sélectionné"}
        </h1>

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full bg-gray-200 rounded text-sm md:text-base">
            <thead className="bg-[#aa8362] text-white">
              <tr>
                <th className="p-2">ID</th>
                <th className="p-2">Nom</th>
                <th className="p-2">Contact</th>
                <th className="p-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {records.map((client, index) => (
                <tr
                  key={index}
                  className={`cursor-pointer hover:bg-gray-700 hover:text-white transition-all 
                    ${clientClicked === client.id ? 'bg-gray-700 text-white uppercase' : ''}`}
                  onClick={() => getClient(client.id)}
                >
                  <td className="p-2 text-center">{client.id}</td>
                  <td className="p-2">{client.nom}</td>
                  <td className="p-2">{client.contact}</td>
                  <td className="p-2">{client.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-3">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Boutons */}
        <div className="flex flex-col sm:flex-row justify-around gap-2 mt-4">
          <button
            className="w-full sm:w-[45%] py-2 cursor-pointer bg-[#aa8362] text-white font-semibold rounded-md"
            onClick={handleDisplayClient}
          >
            Valider
          </button>
          <button
            className="w-full sm:w-[45%] py-2 cursor-pointer bg-[#45413e] text-white font-semibold rounded-md"
            onClick={rejectClient}
          >
            Rejeter
          </button>
        </div>
      </div>
    </div>
  );
};

export default RechercheClient;
