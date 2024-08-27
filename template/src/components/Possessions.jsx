import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import DateForm from './DateForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import Possession from "../../../models/possessions/Possession.js";
import Flux from "../../../models/possessions/Flux.js";
import { Link } from 'react-router-dom';
import PossessionModal from './PossessionModal.jsx';

const Possessions = () => {
    const { nom } = useParams(); // Récupère le nom du possesseur depuis l'URL
    const [possessions, setPossessions] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/possessions/${nom}`)
            .then(response => {
                console.log('Fetched data:', response.data); // Vérifie la structure ici
                setPossessions(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error.message);
            });
    }, [nom]);

    const handleDateSubmit = (date) => {
        setSelectedDate(date);
        updateDateFin(date);
    };

    const updateDateFin = (date) => {
        const updatedData = possessions.map((possession) => {
            if (possession.dateFin !== date) {
                return {
                    ...possession,
                    dateFin: new Date(date).toISOString(),
                };
            }
            return possession;
        });
        setPossessions(updatedData);
    };


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

    function calculateTotalValeurActuelle() {
        const total = possessions.reduce((sum, possession) => sum + calculateValue(possession), 0);
        return total;
    }

    const handleDelete = (nom, id) => {
        axios.delete(`http://localhost:5000/possession/${nom}/${id}`)
            .then(response => {
                console.log(possessions);

                setPossessions(possessions.filter(possession => possession.id !== id));
            })
            .catch(error => {
                console.error('Erreur réseau:', error);
            });
    };

    return (
        <div className='vw-100 vh-100 overflow-x-hidden'>
            <div>
                <h2>Possessions de {nom}</h2>
                <button><Link to={`/`}>retour</Link> </button>
            </div>
            <div>
                <Table className='w-75 mt-5 table table-bordered'>
                    <thead className='table-primary'>
                        <tr className='text-center'>
                            <th>Libelle</th>
                            <th>Valeur</th>
                            <th>Date Debut</th>
                            <th>Date Fin</th>
                            <th>Taux d'Amortissement</th>
                            <th>Valeur Actuelle</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='table-secondary'>
                        {possessions.map((possession, index) => (
                            <tr key={index} className='text-center'>
                                <td>{possession.libelle}</td>
                                <td>{possession.valeur !== 0 ? possession.valeur : possession.valeurConstante < 0 ? possession.valeurConstante * -1 : possession.valeurConstante}</td>
                                <td>{new Date(possession.dateDebut).toLocaleDateString()}</td>
                                <td>{possession.dateFin ? new Date(possession.dateFin).toLocaleDateString() : new Date(Date.now()).toLocaleDateString()}</td>
                                <td>{possession.tauxAmortissement !== null ? `${possession.tauxAmortissement}%` : "0%"}</td>
                                <td>
                                    {calculateValue(possession) < 0 ? calculateValue(possession).toFixed(2) * -1 : calculateValue(possession).toFixed(2)}
                                </td>
                                <td className='d-flex flex-row gap-2'>
                                    <PossessionModal
                                        possession={possession}
                                        onUpdate={(updatedPossession) => {
                                            console.log("Before update:", possessions);
                                            const updatedList = possessions.map(p => p.id === updatedPossession.id ? updatedPossession : p);
                                            console.log("Updated possession:", updatedPossession);
                                            setPossessions(updatedList);
                                            console.log("After update:", updatedList);
                                        }}
                                    />
                                    <button className='btn btn-danger' type="button" onClick={() => handleDelete(possession.possesseur.nom, possession.id)}>supprimer</button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <DateForm onDateSubmit={handleDateSubmit} />
            <div className='mt-3 w-50 border p-2'>
                <h4><strong>Valeur totale actuelle : </strong>{selectedDate == null ? "0.00" : calculateTotalValeurActuelle().toFixed(2)}</h4>
            </div>
        </div>
    );
}

export default Possessions;

