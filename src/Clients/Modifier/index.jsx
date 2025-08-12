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
    codePostal: "",
    ville: "",
    pays: ""
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
          ville: res.data.ville,
          codePostal: res.data.codePostal,
          pays: res.data.pays
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
      setTimeout(()=>{
        window.location.reload()
      },3000)
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

          {/* adresse et pays */}
          <div className="w-full flex flex-col sm:flex-row gap-4 mt-4">
            <div className="w-full sm:w-1/2">
              <label className="font-semibold ml-2">Pays</label>
              <input
                type="text"
                className="block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full"
                value={data.pays}
                onChange={(e) => setData({ ...data, pays: e.target.value })}
                required
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="font-semibold ml-2">Adresse</label>
              <input
                type="text"
                className="block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full"
                value={data.adresse}
                onChange={(e) => setData({ ...data, adresse: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Code Postal & Ville */}
          <div className="w-full flex flex-col md:flex-row gap-4 mt-4">
            <div className="w-full md:w-1/2">
              <label className="font-semibold ml-2">Code postal *</label>
              <input
                type="text"
                className="block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full"
                value={data.codePostal}
                onChange={(e) => setData({ ...data, codePostal: e.target.value })}
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="font-semibold ml-2">Ville</label>
              <input
                type="text"
                className="block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full"
                value={data.ville}
                onChange={(e) => setData({ ...data, ville: e.target.value })}
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
