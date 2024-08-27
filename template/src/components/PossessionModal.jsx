import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function PossessionModal({ possession, onUpdate }) {
    const [show, setShow] = useState(false);
    const [libelle, setLibelle] = useState(possession.libelle);
    const [valeur, setValeur] = useState(possession.valeur);
    const [dateDebut, setDateDebut] = useState(possession.dateDebut);
    const [dateFin, setDateFin] = useState(possession.dateFin);
    const [tauxAmortissement, setTauxAmortissement] = useState(possession.tauxAmortissement);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSave = () => {
        const updatedPossession = {
            ...possession,
            libelle,
            valeur,
            dateDebut,
            dateFin,
            tauxAmortissement,
        };
    
        console.log('URL:', `http://localhost:5000/possession/${possession.possesseur.nom}/${possession.id}`);
        console.log('Updated Possession:', updatedPossession);
    
        axios.put(`http://localhost:5000/possession/${possession.possesseur.nom}/${possession.id}`, updatedPossession)
            .then(response => {
                console.log('Update response:', response);
                onUpdate(updatedPossession);
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

            <Modal show={show} onHide={handleClose}>
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
                        <Form.Group className="mb-3" controlId="formValeur">
                            <Form.Label>Valeur</Form.Label>
                            <Form.Control
                                type="number"
                                value={valeur}
                                onChange={(e) => setValeur(e.target.value)}
                            />
                        </Form.Group>
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
                        Enregistrer les modifications
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PossessionModal;
