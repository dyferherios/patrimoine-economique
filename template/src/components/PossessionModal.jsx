// import { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
// import axios from 'axios';

// function PossessionModal({ possession, onUpdate }) {
//     const [show, setShow] = useState(false);
//     const [libelle, setLibelle] = useState(possession.libelle);
//     const [valeur, setValeur] = useState(possession.valeur);
//     const [valeurConstante, setValeurConstante] = useState(possession.valeurConstante || '');
//     const [dateDebut, setDateDebut] = useState(possession.dateDebut);
//     const [dateFin, setDateFin] = useState(possession.dateFin);
//     const [tauxAmortissement, setTauxAmortissement] = useState(possession.tauxAmortissement);
//     const [type, setType] = useState(possession.type);

//     useEffect(() => {
//         setLibelle(possession.libelle);
//         setValeur(possession.valeur);
//         setValeurConstante(possession.valeurConstante || '');
//         setDateDebut(possession.dateDebut);
//         setDateFin(possession.dateFin);
//         setTauxAmortissement(possession.tauxAmortissement);
//         setType(possession.type);
//     }, [possession]);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     const handleSave = () => {
//         const updatedPossession = {
//             ...possession,
//             libelle,
//             valeur: type === 'Flux' ? undefined : valeur, // Ne pas inclure valeur si type est Flux
//             valeurConstante: type === 'Flux' ? valeurConstante : undefined, // Inclure valeurConstante si type est Flux
//             dateDebut,
//             dateFin,
//             tauxAmortissement,
//         };

//         axios.put(`http://localhost:5000/possession/${possession.possesseur.nom}/${possession.id}`, updatedPossession)
//             .then(response => {
//                 console.log('Update response:', response);
//                 onUpdate(updatedPossession);
//                 handleClose();
//             })
//             .catch(error => {
//                 console.error('Erreur lors de la mise à jour:', error);
//             });
//     };

//     return (
//         <>
//             <Button variant="primary" onClick={handleShow}>
//                 Modifier
//             </Button>

//             <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Modifier Possession</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Form.Group className="mb-3" controlId="formLibelle">
//                             <Form.Label>Libelle</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 value={libelle}
//                                 onChange={(e) => setLibelle(e.target.value)}
//                                 autoFocus
//                             />
//                         </Form.Group>
//                         {type === 'Flux' ? (
//                             <Form.Group className="mb-3" controlId="formValeurConstante">
//                                 <Form.Label>Valeur Constante</Form.Label>
//                                 <Form.Control
//                                     type="number"
//                                     value={valeurConstante}
//                                     onChange={(e) => setValeurConstante(e.target.value)}
//                                 />
//                             </Form.Group>
//                         ) : (
//                             <Form.Group className="mb-3" controlId="formValeur">
//                                 <Form.Label>Valeur</Form.Label>
//                                 <Form.Control
//                                     type="number"
//                                     value={valeur}
//                                     onChange={(e) => setValeur(e.target.value)}
//                                 />
//                             </Form.Group>
//                         )}
//                         <Form.Group className="mb-3" controlId="formDateDebut">
//                             <Form.Label>Date Début</Form.Label>
//                             <Form.Control
//                                 type="date"
//                                 value={new Date(dateDebut).toISOString().substring(0, 10)}
//                                 onChange={(e) => setDateDebut(e.target.value)}
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3" controlId="formDateFin">
//                             <Form.Label>Date Fin</Form.Label>
//                             <Form.Control
//                                 type="date"
//                                 value={dateFin ? new Date(dateFin).toISOString().substring(0, 10) : ""}
//                                 onChange={(e) => setDateFin(e.target.value)}
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3" controlId="formTauxAmortissement">
//                             <Form.Label>Taux d'Amortissement</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 value={tauxAmortissement}
//                                 onChange={(e) => setTauxAmortissement(e.target.value)}
//                             />
//                         </Form.Group>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Annuler
//                     </Button>
//                     <Button variant="primary" onClick={handleSave}>
//                         Enregistrer les modifications
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }

// export default PossessionModal;
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function PossessionModal({ possession, onUpdate }) {
    const [show, setShow] = useState(false);
    const [libelle, setLibelle] = useState(possession.libelle);
    const [valeur, setValeur] = useState(possession.valeur);
    const [valeurConstante, setValeurConstante] = useState(possession.valeurConstante || '');
    const [dateDebut, setDateDebut] = useState(possession.dateDebut);
    const [dateFin, setDateFin] = useState(possession.dateFin);
    const [tauxAmortissement, setTauxAmortissement] = useState(possession.tauxAmortissement);
    const [type, setType] = useState(possession.type);

    useEffect(() => {
        setLibelle(possession.libelle);
        setValeur(possession.valeur);
        setValeurConstante(possession.valeurConstante || '');
        setDateDebut(possession.dateDebut);
        setDateFin(possession.dateFin);
        setTauxAmortissement(possession.tauxAmortissement);
        setType(possession.type);
    }, [possession]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSave = () => {
        const updatedPossession = {
            ...possession,
            libelle,
            valeur: type === 'Flux' ? undefined : valeur, // Ne pas inclure valeur si type est Flux
            valeurConstante: type === 'Flux' ? valeurConstante : undefined, // Inclure valeurConstante si type est Flux
            dateDebut,
            dateFin,
            tauxAmortissement,
        };

        axios.put(`http://localhost:5000/possession/${possession.possesseur.nom}/${possession.id}`, updatedPossession)
            .then(response => {
                console.log('Update response:', response.data); // Vérifiez la réponse ici
                onUpdate(response.data); // Assurez-vous que onUpdate utilise les données renvoyées par l'API
                handleClose();
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour:', error);
            });
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Modifier
            </Button>

            <Modal show={show} onHide={handleClose} key={possession.id}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier Possession</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formLibelle">
                            <Form.Label>Libelle</Form.Label>
                            <Form.Control
                                type="text"
                                value={libelle}
                                onChange={(e) => setLibelle(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                        {type === 'Flux' ? (
                            <Form.Group className="mb-3" controlId="formValeurConstante">
                                <Form.Label>Valeur Constante</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={valeurConstante}
                                    onChange={(e) => setValeurConstante(e.target.value)}
                                />
                            </Form.Group>
                        ) : (
                            <Form.Group className="mb-3" controlId="formValeur">
                                <Form.Label>Valeur</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={valeur}
                                    onChange={(e) => setValeur(e.target.value)}
                                />
                            </Form.Group>
                        )}
                        <Form.Group className="mb-3" controlId="formDateDebut">
                            <Form.Label>Date Début</Form.Label>
                            <Form.Control
                                type="date"
                                value={new Date(dateDebut).toISOString().substring(0, 10)}
                                onChange={(e) => setDateDebut(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDateFin">
                            <Form.Label>Date Fin</Form.Label>
                            <Form.Control
                                type="date"
                                value={dateFin ? new Date(dateFin).toISOString().substring(0, 10) : ""}
                                onChange={(e) => setDateFin(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formTauxAmortissement">
                            <Form.Label>Taux d'Amortissement</Form.Label>
                            <Form.Control
                                type="number"
                                value={tauxAmortissement}
                                onChange={(e) => setTauxAmortissement(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Enregistrer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PossessionModal;


