import React, { useRef, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { LuUpload } from 'react-icons/lu';
import { ClientsAPI } from '../../API/api';
import Swal from 'sweetalert2';

const AjouterClient = ({ toggleDisplayAdd }) => {
  const fileRef = useRef();

  const initialData = {
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

  const submitClient = async (e) => {
    e.preventDefault();
    try {
      await ClientsAPI.create(data);
      Swal.fire('Opération réussie !', 'Enregistrement effectué', 'success');
      toggleDisplayAdd();
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] z-80 flex items-center justify-center p-2">
      <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%] max-h-[90%] bg-white rounded py-6 px-6 relative overflow-y-auto">
        <h2 className="text-xl font-bold">Ajout client</h2>
        <AiOutlineCloseCircle
          className="absolute top-2 right-2 text-2xl cursor-pointer"
          onClick={toggleDisplayAdd}
        />
        <form onSubmit={submitClient}>

          {/* Nom & Prénoms */}
          <div className="w-full flex flex-col sm:flex-row gap-4 mt-4">
            <div className="w-full sm:w-1/2">
              <label className="font-semibold ml-2">Nom *</label>
              <input
                type="text"
                className="block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full"
                value={data.nom}
                onChange={(e) => setData({ ...data, nom: e.target.value })}
                required
              />
            </div>
            <div className="w-full sm:w-1/2">
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
          <div className="w-full flex flex-col sm:flex-row gap-4 mt-4">
            <div className="w-full sm:w-1/2">
              <label className="font-semibold ml-2">E-mail *</label>
              <input
                type="email"
                className="block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="font-semibold ml-2">Contact *</label>
              <input
                type="text"
                className="block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full"
                value={data.contact}
                onChange={(e) => setData({ ...data, contact: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Adresse et pays*/}
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
          

          {/* Code Postal & ville */}
          <div className="w-full flex flex-col sm:flex-row gap-4 mt-4">
            <div className="w-full sm:w-1/2">
              <label className="font-semibold ml-2">Code postal *</label>
              <input
                type="text"
                className="block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full"
                value={data.codePostal}
                onChange={(e) => setData({ ...data, codePostal: e.target.value })}
                required
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="font-semibold ml-2">ville</label>
              <input
                type="text"
                className="block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full"
                value={data.ville}
                onChange={(e) => setData({ ...data, ville: e.target.value })}
              />
            </div>
          </div>

          {/* Bouton Ajouter */}
          <button className="font-bold text-white py-3 rounded-md bg-[#aa8362] mt-4 w-full cursor-pointer">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default AjouterClient;
