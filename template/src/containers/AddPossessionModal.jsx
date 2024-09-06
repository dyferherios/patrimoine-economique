// AddPossessionModal.js
import React, { useState } from 'react';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
import AddPossessionForm from '../components/AddPossessionForm'; // Le composant "dumb"

const AddPossessionModal = ({ show, handleClose }) => {
    const [type, setType] = useState('');
    const [libelle, setLibelle] = useState('');
    const [valeur, setValeur] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [tauxAmortissement, setTauxAmortissement] = useState('');
    const [valeurConstante, setValeurConstante] = useState('');
    const [jour, setJour] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();

        const newPossession = {
            type,
            libelle,
            valeur: parseFloat(valeur) || 0,
            dateDebut: new Date(dateDebut),
            dateFin: dateFin ? new Date(dateFin) : null,
            tauxAmortissement: parseFloat(tauxAmortissement) || null,
            jour: parseInt(jour) || null,
            valeurConstante: parseFloat(valeurConstante) || 0
        };

        axios
            .post(`https://patrimoine-economique-api-abjt.onrender.com/possession/`, newPossession)
            .then(() => handleClose())
            .catch((error) => console.error('Erreur lors de l\'ajout de la possession:', error));
    };

    return (
        <AddPossessionForm
            show={show}
            handleClose={handleClose}
            type={type}
            libelle={libelle}
            valeur={valeur}
            dateDebut={dateDebut}
            dateFin={dateFin}
            tauxAmortissement={tauxAmortissement}
            valeurConstante={valeurConstante}
            jour={jour}
            setType={setType}
            setLibelle={setLibelle}
            setValeur={setValeur}
            setDateDebut={setDateDebut}
            setDateFin={setDateFin}
            setTauxAmortissement={setTauxAmortissement}
            setValeurConstante={setValeurConstante}
            setJour={setJour}
            handleSubmit={handleSubmit}
        />
    );
};

export default AddPossessionModal;
