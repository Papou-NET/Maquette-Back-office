import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appartementAPI } from '../../API/api';
import Swal from 'sweetalert2';

const ModifierAppartement = () => {
  const params = useParams();
  const id = params.id;

  const initialData = {
    batiment: "",
    etage: "",
    lot: "",
    Typologie: "",
    Surface: "",
    Status: ""
  };

  const [data, setData] = useState(initialData);
  const status = ["Disponible", "Réservé", "Vendu"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await appartementAPI.getOne(id);
        setData({
          batiment: res.data.batiment,
          etage: res.data.etage,
          lot: res.data.lot,
          Typologie: res.data.Typologie,
          Surface: res.data.Surface,
          Status: res.data.Status,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const submitUpdate = async (e) => {
    e.preventDefault();
    try {
      await appartementAPI.update(id, data);
      Swal.fire('Opération réussie !', 'La modification a été bien enregistrée', 'success');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-4">
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
              <input
                type="text"
                value={data.batiment}
                onChange={(e) => setData({ ...data, batiment: e.target.value })}
                className="w-full block outline-none border-2 border-gray-600 rounded-md px-4 py-2 mt-2"
                required
              />
            </div>
            <div className="mt-4">
              <label className="text-base md:text-lg font-semibold ml-2">Lot</label>
              <input
                type="text"
                value={data.lot}
                onChange={(e) => setData({ ...data, lot: e.target.value })}
                className="w-full block outline-none border-2 border-gray-600 rounded-md px-4 py-2 mt-2"
                required
              />
            </div>
            <div className="mt-4">
              <label className="text-base md:text-lg font-semibold ml-2">Typologie</label>
              <input
                type="text"
                value={data.Typologie}
                onChange={(e) => setData({ ...data, Typologie: e.target.value })}
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
                value={data.etage}
                onChange={(e) => setData({ ...data, etage: e.target.value })}
                className="w-full block outline-none border-2 border-gray-600 rounded-md px-4 py-2 mt-2"
                required
              />
            </div>
            <div className="mt-4">
              <label className="text-base md:text-lg font-semibold ml-2">Surface</label>
              <input
                type="text"
                value={data.Surface}
                onChange={(e) => setData({ ...data, Surface: e.target.value })}
                className="w-full block outline-none border-2 border-gray-600 rounded-md px-4 py-2 mt-2"
                required
              />
            </div>
            <div className="mt-4">
              <label className="text-base md:text-lg font-semibold ml-2">Status</label>
              <select
                className="w-full block outline-none border-2 border-gray-600 rounded-md px-4 py-2 mt-2 cursor-pointer"
                value={data.Status}
                onChange={(e) => setData({ ...data, Status: e.target.value })}
              >
                <option value={data.Status}>{data.Status}</option>
                {status.map((stat, index) => (
                  <Fragment key={index}>
                    {stat !== data.Status && <option value={stat}>{stat}</option>}
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
            className="w-full md:w-[300px] h-[50px] bg-[#aa8362] rounded-md text-white font-bold cursor-pointer"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModifierAppartement;
