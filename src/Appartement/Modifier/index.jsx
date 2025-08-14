import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appartementAPI } from '../../API/api';
import Swal from 'sweetalert2';
import { FaFolderOpen } from 'react-icons/fa';
import RechercheImmeuble from './RechercheImmeuble';

const ModifierAppartement = ({reloadCard}) => {
  const params = useParams();
  const id = params.id;

  const initialData = {
    immeuble: "",
    etageAppart: "",
    lotAppart: "",
    typologieAppart: "",
    surfaceAppart: "",
    statutAppart: ""
  };

  const [data, setData] = useState(initialData);
  const statutAppart = ["Disponible", "Réservé", "Vendu"];
  const [immoClicked, setImmoClicked] = useState()
  const [displayImmo, setDisplayImmo] = useState(false)

  const handleDisplayImmo = () => {
    setDisplayImmo(prev=>!prev)
    if(immoClicked==="") setImmoClicked("")
  }

  const getImmo = (immo) => setImmoClicked(immo)
  const rejectImmo = () => setImmoClicked("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await appartementAPI.getOne(id);
        setData({
          etageAppart: res.data.etageAppart,
          lotAppart: res.data.lotAppart,
          typologieAppart: res.data.typologieAppart,
          surfaceAppart: res.data.surfaceAppart,
          statutAppart: res.data.statutAppart,
        });
        setImmoClicked(res.data.immeuble)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const submitUpdate = async (e) => {
    e.preventDefault();
    reloadCard()
    const newData = {...data, immeuble: immoClicked.idImmeuble}
    try {
      await appartementAPI.update(id, newData);
      Swal.fire('Opération réussie !', 'La modification a été bien enregistrée', 'success');
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-4">
      {
        displayImmo &&
        <RechercheImmeuble handleDisplayImmo={handleDisplayImmo} 
         getImmo={getImmo} immoClicked={immoClicked} rejectImmo={rejectImmo}/>
      }
      <h1 className="text-2xl md:text-3xl font-bold text-center mt-4">
        Modifier l'appartement {id}
      </h1>
      <form
        onSubmit={submitUpdate}
        className="w-full md:w-[80%] mt-6 bg-white p-4"
      >
        <div className="flex flex-col md:flex-row justify-between md:gap-6">
          {/* Colonne gauche */}
          <div className="w-full md:w-1/2">
            <div className="mt-4">
              <label className="text-base md:text-lg font-semibold ml-2">Bâtiment</label>
              <div className='flex gap-2 items-center'>
                <input
                  type="text"
                  value={immoClicked ? immoClicked.numImmeuble : ""}
                  className="w-full block outline-none border-2 border-gray-600 rounded-md px-4 py-2 mt-2 bg-gray-200"
                  required
                  disabled
                />
                <FaFolderOpen onClick={handleDisplayImmo} className="cursor-pointer text-xl" />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-base md:text-lg font-semibold ml-2">lotAppart</label>
              <input
                type="text"
                value={data.lotAppart}
                onChange={(e) => setData({ ...data, lotAppart: e.target.value })}
                className="w-full block outline-none border-2 border-gray-600 rounded-md px-4 py-2 mt-2"
                required
              />
            </div>
            <div className="mt-4">
              <label className="text-base md:text-lg font-semibold ml-2">typologieAppart</label>
              <input
                type="text"
                value={data.typologieAppart}
                onChange={(e) => setData({ ...data, typologieAppart: e.target.value })}
                className="w-full block outline-none border-2 border-gray-600 rounded-md px-4 py-2 mt-2"
                required
              />
            </div>
          </div>

          {/* Colonne droite */}
          <div className="w-full md:w-1/2">
            <div className="mt-4">
              <label className="text-base md:text-lg font-semibold ml-2">Étage</label>
              <input
                type="text"
                value={data.etageAppart}
                onChange={(e) => setData({ ...data, etageAppart: parseInt(e.target.value) })}
                className="w-full block outline-none border-2 border-gray-600 rounded-md px-4 py-2 mt-2"
                required
              />
            </div>
            <div className="mt-4">
              <label className="text-base md:text-lg font-semibold ml-2">surfaceAppart</label>
              <input
                type="text"
                value={data.surfaceAppart}
                onChange={(e) => setData({ ...data, surfaceAppart: parseFloat(e.target.value) })}
                className="w-full block outline-none border-2 border-gray-600 rounded-md px-4 py-2 mt-2"
                required
              />
            </div>
            <div className="mt-4">
              <label className="text-base md:text-lg font-semibold ml-2">statutAppart</label>
              <select
                className="w-full block outline-none border-2 border-gray-600 rounded-md px-4 py-2 mt-2 cursor-pointer"
                value={data.statutAppart}
                onChange={(e) => setData({ ...data, statutAppart: e.target.value })}
              >
                <option value={data.statutAppart}>{data.statutAppart}</option>
                {statutAppart.map((stat, index) => (
                  <Fragment key={index}>
                    {stat !== data.statutAppart && <option value={stat}>{stat}</option>}
                  </Fragment>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Bouton */}
        <div className="text-center mt-6">
          <button
            type="submit"
            className="w-full md:w-[300px] h-[50px] bg-[#125686] rounded-md text-white font-bold cursor-pointer"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModifierAppartement;
