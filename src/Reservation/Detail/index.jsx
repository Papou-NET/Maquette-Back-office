import React, { useEffect, useState } from 'react';
import AppatImg from '../../assets/appartement.png';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { reservationAPI } from '../../API/api';

const DetailReservation = ({ toggledisplayreservation, idReservation }) => {
  const [data, setdata] = useState({
    appartement: "",
    client: "",
    dateDeb: "",
    dateFin: "",
    dateVente: "",
    type:""
  });

  const formatdDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR')
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await reservationAPI.getOne(idReservation);
      setdata({
        appartement: res.data.appartement,
        client: res.data.client,
        dateDeb: formatdDate(res.data.dateDeb),
        dateFin: formatdDate(res.data.dateFin),
        dateVente: formatdDate(res.data.dateVente),
        type: res.data.type
      });
    };
    fetchData();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] z-80 flex items-center justify-center">
      <div className="w-[95%] md:w-[70%] max-h-[90vh] overflow-y-auto bg-white rounded py-6 px-6 relative">
        <h1 className="text-xl md:text-2xl font-bold text-center md:text-left">
          Détail de la réservation numéro {idReservation}
        </h1>
        <AiOutlineCloseCircle
          className="absolute top-2 right-2 text-2xl cursor-pointer"
          onClick={toggledisplayreservation}
        />

        <div className="flex flex-col md:flex-row justify-center items-center mt-6 gap-6 w-full">
          {/* Image */}
          <div className="w-full md:w-1/2 min-w-[250px]">
            <img src={AppatImg} alt="Appartement" className="w-full h-auto rounded" />
          </div>

          {/* Infos */}
          <div className="w-full md:w-1/2">
            <div className="flex w-full justify-between items-center flex-wrap border-b py-2">
              <h3 className="min-w-[150px] bg-gray-400 rounded text-right p-2">Appartement</h3>
              <p className="w-[50%] ml-4">{data.appartement ? data.appartement.lotAppart : ""}</p>
            </div>

            <div className="flex w-full justify-between items-center flex-wrap border-b py-2 mt-2">
              <h3 className="min-w-[150px] bg-gray-400 rounded text-right p-2">Client</h3>
              <p className="w-[50%] ml-4">{data.client ? data.client.nom : ""}</p>
            </div>

            <div className="flex w-full justify-between items-center flex-wrap border-b py-2 mt-2">
              <h3 className="min-w-[150px] bg-gray-400 rounded text-right p-2">Type d'offre</h3>
              <p className="w-[50%] ml-4">{data.type}</p>
            </div>

            {
              data.type === "location" && 

                 <div className="flex w-full justify-between items-center flex-wrap border-b py-2 mt-2">
                    <h3 className="min-w-[150px] bg-gray-400 rounded text-right p-2">Date de début</h3>
                    <p className="w-[50%] ml-4">{data.dateDeb}</p>
                  </div>
            }
            {
                 data.type === "location" && 
                  <div className="flex w-full justify-between items-center flex-wrap border-b py-2 mt-2">
                    <h3 className="min-w-[150px] bg-gray-400 rounded text-right p-2">Date fin</h3>
                    <p className="w-[50%] ml-4">{data.dateFin}</p>
                  </div>
            }
            {
               data.type === "vente" && 
              <div className="flex w-full justify-between items-center flex-wrap border-b py-2 mt-2">
                <h3 className="min-w-[150px] bg-gray-400 rounded text-right p-2">Date de vente</h3>
                <p className="w-[50%] ml-4">{data.dateVente}</p>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailReservation;
