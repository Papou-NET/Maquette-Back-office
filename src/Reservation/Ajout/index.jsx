import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { reservationAPI } from '../../API/api';
import RechercheClient from './RechercheClient';
import { FaFolderOpen } from 'react-icons/fa';
import RechercheAppartement from './RechercheAppartement';
import Swal from 'sweetalert2';

const AjoutReservation = ({ toggledisplayreservation }) => {
  const [displayClient, setdisplayClient] = useState(false);
  const [displayAppartement, setdisplayAppartement] = useState(false);

  const initialData = {
    type: "location",
    appartement: "",
    client: "",
    reference: "",
    dateDeb: null,
    dateFin: null,
    dateVente: null
  };

  const [clientClicked, setclientClicked] = useState("");
  const [appartClicked, setappartClicked] = useState("");
  const [data, setData] = useState(initialData);

  const submitReservation = async (e) => {
    e.preventDefault();
    const newData = { ...data, appartement: appartClicked.idAppart, client: clientClicked.id };
    try {
      await reservationAPI.create(newData);
      Swal.fire('Opération réussie !', 'Enregistrement éffectué avec succès', 'success');
      toggledisplayreservation();
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDisplayClient = () => {
    setdisplayClient(prev => !prev);
    if (clientClicked === "") setclientClicked("");
  };

  const handleDisplayAppartement = () => {
    setdisplayAppartement(prev => !prev);
    if (appartClicked === "") setappartClicked("");
  };

  const getClient = (p) => setclientClicked(p);
  const getAppart = (p) => setappartClicked(p);
  const rejectClient = () => setclientClicked("");
  const rejectAppart = () => setappartClicked("");

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] z-80 flex items-center justify-center">
      {displayClient && (
        <RechercheClient
          handleDisplayClient={handleDisplayClient}
          getClient={getClient}
          clientClicked={clientClicked}
          rejectClient={rejectClient}
        />
      )}
      {displayAppartement && (
        <RechercheAppartement
          handleDisplayAppartement={handleDisplayAppartement}
          getAppart={getAppart}
          appartClicked={appartClicked}
          rejectAppart={rejectAppart}
        />
      )}
      <div className="w-[95%] md:w-[50%] max-h-[90vh] overflow-y-auto bg-white rounded py-6 px-6 relative">
        <h2 className="text-lg md:text-xl font-bold text-center md:text-left">
          Ajouter une nouvelle réservation
        </h2>
        <AiOutlineCloseCircle
          className="absolute top-2 right-2 text-2xl cursor-pointer"
          onClick={toggledisplayreservation}
        />
        <form onSubmit={submitReservation}>
          {/* Référence */}
          <div className="w-full mt-4">
            <label className="font-semibold ml-2">Réference</label>
            <input
              type="text"
              className="block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full"
              value={data.reference}
              onChange={e => setData({ ...data, reference: e.target.value })}
              required
            />
          </div>

          {/* type */}
          <div className="w-full mt-4">
            <label className="font-semibold ml-2">Type d'type</label>
            <select
              className="block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full"
              value={data.type}
              onChange={e => setData({ ...data, type: e.target.value })}
              required
            >
              <option value="location">Location</option>
              <option value="vente">Vente</option>
            </select>
          </div>

          {/* Appartement */}
          <div className="w-full mt-4">
            <label className="font-semibold ml-2">Appartement</label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                className="block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full bg-gray-200"
                value={appartClicked ? appartClicked.lotAppart : ""}
                disabled
                required
              />
              <FaFolderOpen onClick={handleDisplayAppartement} className="cursor-pointer text-xl" />
            </div>
          </div>

          {/* Client */}
          <div className="w-full mt-4">
            <label className="font-semibold ml-2">Client</label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                className="block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full bg-gray-200"
                value={clientClicked ? clientClicked.nom : ""}
                disabled
                required
              />
              <FaFolderOpen onClick={handleDisplayClient} className="cursor-pointer text-xl" />
            </div>
          </div>

          {/* Dates */}
          {data.type === "location" ? (
            <div className="w-full flex flex-col md:flex-row gap-4 mt-4">
              <div className="w-full md:w-1/2">
                <label className="font-semibold ml-2">Date début</label>
                <input
                  type="date"
                  className="block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full"
                  value={data.dateDeb !=null ? data.dateDeb : ""}
                  onChange={e => setData({ ...data, dateDeb: e.target.value })}
                  required
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className="font-semibold ml-2">Date fin</label>
                <input
                  type="date"
                  className="block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full"
                  value={data.dateFin !==null ? data.dateFin : ""}
                  onChange={e => setData({ ...data, dateFin: e.target.value })}
                  required
                />
              </div>
            </div>
          ) : (
            <div className="w-full mt-4">
              <label className="font-semibold ml-2">Date de vente</label>
              <input
                type="date"
                className="block border-2 border-gray-500 rounded px-4 py-2 outline-none w-full"
                value={data.dateVente !==null ? data.dateVente : ""}
                onChange={e => setData({ ...data, dateVente: e.target.value })}
                required
              />
            </div>
          )}

          {/* Bouton */}
          <button className="font-bold text-white py-3 rounded-md bg-[#125686] mt-4 w-full cursor-pointer">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default AjoutReservation;
