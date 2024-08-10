import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Possession from "../../models/possessions/Possession.js";
import Flux from "../../models/possessions/Flux.js";
import DateForm from './DateForm.jsx';
import '../node_modules/bootstrap/dist/css/bootstrap.css'

const DataTable = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [totalValeurActuelle, setTotalValeurActuelle] = useState(0); 

  useEffect(() => {
    fetch('http://localhost:5000/1')
      .then((response) => response.json())
      .then((jsonData) => {
        const today = new Date().toISOString();
        const updatedData = jsonData.data.possessions.map((item) => ({
          ...item,
          dateFin: item.dateFin ? item.dateFin : today,
        }));

        setData(updatedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  function handleDateSubmit(date) {
    setSelectedDate(date);
    updateDateFin(date);
    calculateTotalValeurActuelle(date);
  }

  function updateDateFin(date) {
    const dateObject = new Date(date);
    const updatedData = data.map((item) => ({
      ...item,
      dateFin: dateObject.toISOString(),
    }));
    setData(updatedData);
  }

  function calculateValue(possession) {
    const dateToUse = selectedDate ? new Date(selectedDate) : new Date();
    if (possession.type === "BienMateriel") {
      const newPossession = new Possession(
        possession.possesseur,
        possession.libelle,
        possession.valeur,
        new Date(possession.dateDebut),
        dateToUse,
        possession.tauxAmortissement
      );
      return newPossession.getValeur(dateToUse);
    }
    if (possession.type === "Flux") {
      const newFlux = new Flux(possession.possesseur, possession.libelle, possession.valeurConstante, new Date(possession.dateDebut), dateToUse, possession.tauxAmortissement, possession.jour);
      return newFlux.getValeur(dateToUse);
    }
    return 0;
  }

  function calculateTotalValeurActuelle(date) {
    const total = data.reduce((sum, possession) => {
      return sum + calculateValue(possession);
    }, 0);

    setTotalValeurActuelle(total);
  }

  return (
    <div className='w-100 h-100 mt-5 d-flex flex-column justify-content-center align-items-center'>
      <h1>Patrimoine économique</h1>
      <Table className='w-75 mt-5 table table-bordered'>
        <thead className='table-primary'>
          <tr className='text-center'>
            <th>Libelle</th>
            <th>Valeur</th>
            <th>Date Debut</th>
            <th>Date Fin</th>
            <th>Taux d'Amortissement</th>
            <th>Valeur Actuelle</th>
          </tr>
        </thead>
        <tbody className='table-secondary'>
          {data.map((item, index) => (
            <tr key={index} className='text-center'>
              <td>{item.libelle}</td>
              <td>{item.valeur !== 0 ? item.valeur : item.valeurConstante < 0 ? item.valeurConstante * -1 : item.valeurConstante}</td>
              <td>{new Date(item.dateDebut).toLocaleDateString()}</td>
              <td>{item.dateFin ? new Date(item.dateFin).toLocaleDateString() : "0%"}</td>
              <td>{item.tauxAmortissement !== null ? `${item.tauxAmortissement}%` : "0%"}</td>
              <td>
                {calculateValue(item) < 0 ? calculateValue(item) * -1 : calculateValue(item)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <DateForm onDateSubmit={handleDateSubmit} />
      <div className='mt-3 border p-2' >
        <h4><strong>Valeur de la patrimoine : </strong>{totalValeurActuelle.toFixed(2)}</h4>
      </div>
    </div>
  );
};

export default DataTable;
