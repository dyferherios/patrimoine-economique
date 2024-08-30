import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';

const Possesseurs = () => {
    const [possesseurs, setPossesseurs] = useState([]);
    const [error, setError] = useState(null);
    const headers = ["Possesseur","Possessions","Chart","Action"]
    useEffect(() => {
        axios.get('http://localhost:5000/possesseur')
            .then(response => {
                setPossesseurs(response.data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    return (
        <div className='w-100 h-100 pt-5'>
            <div className='w-100 text-center'>
                <h1 className='fs-1 fw-bold'>Possesseurs</h1>
            </div>
            <div className='w-100 h-auto d-flex flex-col align-items-center'>
                <div className='col align-self-start p-4'>
                    <Table className='table table-bordered'>
                        <thead className='table table-warning'>
                            <tr className='text-center'>
                                {headers.map((header, index) => (
                                    <td key={index} className='fw-bold'>{header}</td>
                                ))}
                            </tr>
                        </thead>
                            
                        <tbody className='table-secondary'>
                            {possesseurs.map((possesseur, index) => (
                                <tr key={index} className='text-center'>
                                    <td className='fw-bold'>
                                        {possesseur.data.nom}
                                    </td>
                                    <td className=''>
                                        <Link to={`/possessions/${possesseur.data.nom}`}>Regarder</Link>
                                    </td>
                                    <td>
                                        <Link to={`/possessions/${possesseur.data.nom}/chart`}>Voir le chart</Link>
                                    </td>
                                    <td className=''>
                                        <button className='btn btn-primary' type="button">modifier</button>
                                        <button className='btn btn-danger' type="button">supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default Possesseurs;

