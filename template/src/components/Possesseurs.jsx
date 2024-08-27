import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importez Link pour la navigation
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

const Possesseurs = () => {
    const [possesseurs, setPossesseurs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/possesseur')
            .then(response => {
                console.log('Fetched data:', response.data); // Vérifie la structure ici
                setPossesseurs(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error.message);
            });
    }, []);

    return (
        <div>
            <h2>Possesseurs</h2>
            <Table className='w-75 mt-5 table table-bordered'>
                <thead className='table-primary'>
                    <tr className='text-center'>
                        <th>Possesseur</th>
                    </tr>
                </thead>
                <tbody className='table-secondary'>
                    {possesseurs.map((item, index) => (
                        <tr key={index} className='text-center'>
                            <td>
                                <Link to={`/possessions/${item.data.nom}`}>{item.data.nom}</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Possesseurs;
