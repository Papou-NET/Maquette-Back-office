import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';
import { batimentAPI } from '../../API/api';
import Pagination from '../../Pagination';
import Swal from 'sweetalert2';

const RechercheImmeuble = ({ handleDisplayImmo, getImmo, immoClicked, rejectImmo }) => {
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
          res = await batimentAPI.search(search);
        } else {
          res = await batimentAPI.getAll();
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
          onClick={handleDisplayImmo}
        />

        {/* Barre de recherche */}
        <div className="border-2 border-[#125686] relative rounded-[25px] px-4 py-2 mt-2">
          <input
            type="text"
            className="outline-none w-full pr-8"
            placeholder="Recherche"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute top-3 right-4 text-lg" />
        </div>

        {/* immoement sélectionné */}
        <h1 className="mt-2 text-center text-sm md:text-base">
          {immoClicked ? `ID immeuble : ${immoClicked.idImmeuble}` : "Aucun immoement sélectionné"}
        </h1>

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full bg-gray-200 rounded text-sm md:text-base">
            <thead className="bg-[#125686] text-white">
              <tr>
                <th className="p-2">ID</th>
                <th className="p-2">Numero</th>
              </tr>
            </thead>
            <tbody>
              {records.map((immo, index) => (
                <tr
                  key={index}
                  className={`cursor-pointer hover:bg-gray-700 hover:text-white transition-all 
                    ${immoClicked === immo.id && immo.Status === "Disponible"
                      ? 'bg-gray-700 text-white uppercase'
                      : ''}`}
                  onClick={() =>
                      getImmo(immo)
                  }
                >
                  <td className="p-2 text-center">{immo.idImmeuble}</td>
                  <td className="p-2">{immo.numImmeuble}</td>
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
            className="w-full sm:w-[45%] py-2 cursor-pointer bg-[#125686] text-white font-semibold rounded-md"
            onClick={handleDisplayImmo}
          >
            Valider
          </button>
          <button
            className="w-full sm:w-[45%] py-2 cursor-pointer bg-[#45413e] text-white font-semibold rounded-md"
            onClick={rejectImmo}
          >
            Rejeter
          </button>
        </div>
      </div>
    </div>
  );
};

export default RechercheImmeuble;
