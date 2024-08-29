// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Table } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// const Possesseurs = () => {
//     const [possesseurs, setPossesseurs] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         axios.get('http://localhost:5000/possesseur')
//             .then(response => {
//                 setPossesseurs(response.data);
//             })
//             .catch(error => {
//                 setError(error.message);
//             });
//     }, []);

//     return (
//         <div>
//             <h2>Possesseurs</h2>
//             <Table className='w-75 mt-5 table table-bordered'>
//                 <thead className='table-primary'>
//                     <tr className='text-center'>
//                         <th>Possesseur</th>
//                         <th>Possessions</th>
//                         <th>Chart</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody className='table-secondary'>
//                     {possesseurs.map((possesseur, index) => (
//                         <tr key={index} className='text-center'>
//                             <td>
//                                 <Link >{possesseur.data.nom}</Link>
//                             </td>
//                             <td>
//                                 <Link to={`/possessions/${possesseur.data.nom}`}>regarder</Link>
//                             </td>
//                             <td>
//                                 <Link to={`/possessions/${possesseur.data.nom}/chart`}>Voir le chart</Link>
//                             </td>
//                             <td className=''>
//                                 <button className='btn btn-primary' type="button">modifier</button>
//                                 <button className='btn btn-danger' type="button">supprimer</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </div>
//     );
// }

// export default Possesseurs;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Possesseurs = () => {
    const [possesseurs, setPossesseurs] = useState([]);
    const [error, setError] = useState(null);

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
        <div>
            <h2>Possesseurs</h2>
            <Table className='w-75 mt-5 table table-bordered'>
                <thead className='table-primary'>
                    <tr className='text-center'>
                        <th>Possesseur</th>
                        <th>Possessions</th>
                        <th>Chart</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='table-secondary'>
                    {possesseurs.map((possesseur, index) => (
                        <tr key={index} className='text-center'>
                            <td>
                                <Link >{possesseur.data.nom}</Link>
                            </td>
                            <td>
                                <Link to={`/possessions/${possesseur.data.nom}`}>regarder</Link>
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
    );
}

export default Possesseurs;

