import React, { useEffect, useState } from 'react';
import homme from '../../assets/homme.jpg';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { ClientsAPI } from '../../API/api';

const DetailClient = ({ idClient, toggleDisplayDetailClient }) => {
  const [data, setData] = useState({
    photo: "",
    nom: "",
    prenoms: "",
    contact: "",
    email: "",
    adresse: "",
    pays: "",
    ville: "",
    codePostal: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ClientsAPI.getOne(idClient);
        setData({
          photo: res.data.photo,
          nom: res.data.nom,
          prenoms: res.data.prenoms,
          contact: res.data.contact,
          email: res.data.email,
          adresse: res.data.adresse,
          pays: res.data.pays,
          ville: res.data.ville,
          codePostal: res.data.codePostal
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [idClient]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] z-80 flex items-center justify-center">
      <div className="w-[95%] md:w-[70%] max-h-[90vh] overflow-y-auto bg-white rounded py-6 px-6 relative">
        <h1 className="text-xl md:text-2xl font-bold text-center md:text-left">
          {data.prenoms} {data.nom}
        </h1>
        <AiOutlineCloseCircle
          className="absolute top-2 right-2 text-2xl cursor-pointer"
          onClick={toggleDisplayDetailClient}
        />

        <div className="flex flex-col md:flex-row justify-center items-center mt-6 gap-6 w-full">
          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={homme}
              alt="Client"
              className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full object-cover"
            />
          </div>

          {/* Infos */}
          <div className="w-full md:w-1/2">
            <div className="flex w-full justify-between items-center flex-wrap border-b py-2">
              <h3 className="min-w-[150px] bg-gray-400 rounded text-right p-2">Téléphone</h3>
              <p className="w-[50%] ml-4">{data.contact}</p>
            </div>

            <div className="flex w-full justify-between items-center flex-wrap border-b py-2 mt-2">
              <h3 className="min-w-[150px] bg-gray-400 rounded text-right p-2">E-mail</h3>
              <p className="w-[50%] ml-4">{data.email}</p>
            </div>

            <div className="flex w-full justify-between items-center flex-wrap border-b py-2 mt-2">
              <h3 className="min-w-[150px] bg-gray-400 rounded text-right p-2">Adresse</h3>
              <p className="w-[50%] ml-4">{data.adresse}</p>
            </div>

            <div className="flex w-full justify-between items-center flex-wrap border-b py-2 mt-2">
              <h3 className="min-w-[150px] bg-gray-400 rounded text-right p-2">Ville</h3>
              <p className="w-[50%] ml-4">{data.ville}</p>
            </div>

            <div className="flex w-full justify-between items-center flex-wrap border-b py-2 mt-2">
              <h3 className="min-w-[150px] bg-gray-400 rounded text-right p-2">Code postal</h3>
              <p className="w-[50%] ml-4">{data.codePostal}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailClient;
