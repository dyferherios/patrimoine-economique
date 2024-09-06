import React from 'react';
import { Table } from 'react-bootstrap';
import DateForm from './DateForm';
import AddPossessionModal from '../containers/AddPossessionModal';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { calculateValue, calculateTotalValeurActuelle} from '../containers/PossessionUtils';


const PossessionsList = ({
    nom,
    possessions,
    selectedDate,
    showAddModal,
    setShowAddModal,
    handleDateSubmit,
    handleClose,
    handleDelete,
    fetchPossessions
}) => {
    return (
        <div className='vw-100 vh-100 d-flex flex-column align-items-center mt-5'>
            <div className='d-flex justify-content-center align-items-center align-items-center gap-5 position-fixed top-25 start-50 translate-middle bg-white p-2' style={{ width: '100%', height: '100px' }}>
                <h2 className='text-center'>Possessions de {nom}</h2>
                <button className='btn btn-primary' onClick={() => setShowAddModal(true)}>ajouter</button>
                <AddPossessionModal
                    show={showAddModal}
                    handleClose={() => {
                        setShowAddModal(false);
                        fetchPossessions(); // Rafraîchir la liste après l'ajout
                    }}
                />
                <DateForm onDateSubmit={handleDateSubmit} />
                <div className='mt-3 w-50 p-2'>
                    <h4><strong>Valeur totale actuelle : </strong>{selectedDate == null ? "0.00" : calculateTotalValeurActuelle(possessions, selectedDate).toFixed(2)}</h4>
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
                                    {calculateValue(possession, selectedDate) < 0 ? calculateValue(possession, selectedDate).toFixed(2) * -1 : calculateValue(possession, selectedDate).toFixed(2)}
                                </td>
                                <td className='d-flex flex-row gap-2'>
                                    <Link
                                        to={`/possessions/${possession.libelle}/${possession.id}`}
                                        className='btn btn-primary'
                                    >
                                        Modifier
                                    </Link>
                                    <button className='btn btn-danger' type="button" onClick={() => handleDelete(possession.libelle)}>supprimer</button>
                                    <button className='btn btn-secondary' onClick={() => handleClose(possession.libelle)}>fermer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default PossessionsList;