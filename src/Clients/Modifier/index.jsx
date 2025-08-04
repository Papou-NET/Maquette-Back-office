import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { LuUpload } from 'react-icons/lu';
import { ClientsAPI } from '../../API/api';
import Swal from 'sweetalert2';

const ModifierClient = ({ idClient, toggleDisplayUpdateClient }) => {
  const fileRef = useRef();

  const initialData = {
    photo: "",
    nom: "",
    prenoms: "",
    email: "",
    contact: "",
    adresse: "",
    CodePostal: "",
    Ville: ""
  };

  const [data, setData] = useState(initialData);

  const handleClickFile = (e) => {
    e.preventDefault();
    fileRef.current.click();
  };

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
          Ville: res.data.Ville,
          CodePostal: res.data.CodePostal
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [idClient]);

  const submitClient = async (e) => {
    e.preventDefault();
    try {
      await ClientsAPI.update(idClient, data);
      Swal.fire('Opération réussie !', 'La modification a été bien enregistrée', 'success');
      toggleDisplayUpdateClient();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] z-80 flex items-center justify-center">
      <div className="w-[95%] md:w-[60%] max-h-[90vh] overflow-y-auto bg-white rounded py-6 px-6 relative">
        <h2 className="text-xl font-bold">Modifier le client d'id {idClient}</h2>
        <AiOutlineCloseCircle
          className="absolute top-2 right-2 text-2xl cursor-pointer"
          onClick={toggleDisplayUpdateClient}
        />
        <form onSubmit={submitClient}>
          {/* Upload */}
          <div className="w-full flex flex-col md:flex-row gap-4 items-center mt-4">
            <div className="w-full md:w-1/2 flex items-center">
              <button
                className="font-bold text-white py-3 rounded-md bg-[#aa8362] w-full cursor-pointer flex justify-center"
                onClick={handleClickFile}
              >
                <LuUpload className="text-2xl" />
              </button>
              <input
                type="file"
                className="hidden"
                ref={fileRef}
                onChange={(e) => setData({ ...data, photo: e.target.value })}
              />
            </div>
            <span className="w-full md:w-1/2 text-sm md:text-lg font-semibold text-center md:text-left">
              {data.photo === "" ? "Importer la photo de profil" : data.photo}
            </span>
          </div>

          {/* Nom & Prénoms */}
          <div className="w-full flex flex-col md:flex-row gap-4 mt-4">
            <div className="w-full md:w-1/2">
              <label className="font-semibold ml-2">Nom *</label>
              <input
                type="text"
                className="block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full"
                value={data.nom}
                onChange={(e) => setData({ ...data, nom: e.target.value })}
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="font-semibold ml-2">Prénoms *</label>
              <input
                type="text"
                className="block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full"
                value={data.prenoms}
                onChange={(e) => setData({ ...data, prenoms: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Email & Contact */}
          <div className="w-full flex flex-col md:flex-row gap-4 mt-4">
            <div className="w-full md:w-1/2">
              <label className="font-semibold ml-2">E-mail *</label>
              <input
                type="email"
                className="block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="font-semibold ml-2">Contact</label>
              <input
                type="text"
                className="block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full"
                value={data.contact}
                onChange={(e) => setData({ ...data, contact: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Adresse */}
          <div className="w-full mt-4">
            <label className="font-semibold ml-2">Adresse</label>
            <input
              type="text"
              className="block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full"
              value={data.adresse}
              onChange={(e) => setData({ ...data, adresse: e.target.value })}
              required
            />
          </div>

          {/* Code Postal & Ville */}
          <div className="w-full flex flex-col md:flex-row gap-4 mt-4">
            <div className="w-full md:w-1/2">
              <label className="font-semibold ml-2">Code postal *</label>
              <input
                type="text"
                className="block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full"
                value={data.CodePostal}
                onChange={(e) => setData({ ...data, CodePostal: e.target.value })}
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="font-semibold ml-2">Ville</label>
              <input
                type="text"
                className="block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full"
                value={data.Ville}
                onChange={(e) => setData({ ...data, Ville: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Bouton */}
          <button className="font-bold text-white py-3 rounded-md bg-[#aa8362] mt-4 w-full cursor-pointer">
            Modifier
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModifierClient;
