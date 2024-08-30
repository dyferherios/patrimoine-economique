import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import DateForm from './DateForm';
import Possession from "../../../models/possessions/Possession.js";
import Flux from "../../../models/possessions/Flux.js";
import PossessionModal from './PossessionModal.jsx';
import AddPossessionModal from './AddPossessionModal.jsx';

const Possessions = () => {
    const { nom } = useParams();
    const [possessions, setPossessions] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        fetchPossessions();
    }, [nom]);

    const fetchPossessions = () => {
        axios.get(`http://localhost:5000/possessions/${nom}`)
            .then(response => {
                console.log('Fetched data:', response.data);
                setPossessions(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

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

    const handleClose = (id) => {
        axios.post(`http://localhost:5000/possession/${nom}/${id}/close`)
            .then(response => {
                console.log('Possession closed:', response.data);
                fetchPossessions();
            })
            .catch(error => {
                console.error('Error closing possession:', error);
            });
    };

    function calculateValue(possession) {
        const dateToUse = selectedDate ? new Date(selectedDate) : new Date(Date.now());
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
                console.log('Deleted possession:', response.data);
                fetchPossessions();
            })
            .catch(error => {
                console.error('Erreur réseau:', error);
            });
    };

    return (
        <div className='vw-100 vh-100 d-flex flex-column align-items-center mt-5'>
            <div className='d-flex justify-content-center align-items-center align-items-center gap-5 position-fixed top-25 start-50 translate-middle bg-white p-2 z-1' style={{ width: '100%', height: '100px' }}>
                <h2 className='text-center'>Possessions de {nom}</h2>
                <button className='btn btn-primary' onClick={() => setShowAddModal(true)}>ajouter</button>
                <AddPossessionModal
                    show={showAddModal}
                    handleClose={() => { setShowAddModal(false); fetchPossessions(); }}
                />
                <DateForm onDateSubmit={handleDateSubmit} />
                <div className='mt-3 w-50 p-2'>
                    <h4><strong>Valeur totale actuelle : </strong>{selectedDate == null ? "0.00" : calculateTotalValeurActuelle().toFixed(2)}</h4>
                </div>
            </div>
            <div className='d-flex flex-column align-items-center vw-100 p-2'>
                <Table className='w-100 mt-5 table table-bordered'>
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
                    <tbody className='table-secondary w-100'>
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
                                        onUpdate={() => fetchPossessions()}
                                    />
                                    <button className='btn btn-danger' type="button" onClick={() => handleDelete(possession.possesseur.nom, possession.id)}>supprimer</button>
                                    <button className='btn btn-secondary' onClick={() => handleClose(possession.id)}>fermer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            
        </div>
    );
}

export default Possessions;
