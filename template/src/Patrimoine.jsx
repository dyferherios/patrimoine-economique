import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Patrimoine = () => {
    const [patrimoines, setPatrimoines] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/patrimoine')
            .then(response => {
                console.log('Fetched data:', response.data); // Vérifie la structure ici
                setPatrimoines(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error.message);
            });
    }, []);

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Patrimoine</h2>
            {patrimoines.length > 0 && patrimoines.map((item, index) => (
                <div key={index}>
                    <h3>Possesseur: {item.data.possesseur.nom}</h3>
                    <ul>
                        {item.data.possessions.map((possession, i) => (
                            <li key={i}>
                                <strong>{possession.libelle}</strong>: {possession.valeur} 
                                <br />
                                Type: {possession.type}
                                <br />
                                Date Début: {new Date(possession.dateDebut).toLocaleDateString()}
                                <br />
                                {possession.dateFin && `Date Fin: ${new Date(possession.dateFin).toLocaleDateString()}`}
                                <br />
                                {possession.tauxAmortissement && `Taux d'Amortissement: ${possession.tauxAmortissement}`}
                                <br />
                                {possession.jour && `Jour: ${possession.jour}`}
                                <br />
                                {possession.valeurConstante && `Valeur Constante: ${possession.valeurConstante}`}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Patrimoine;
