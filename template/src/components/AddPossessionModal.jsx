import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddPossessionModal = ({ show, handleClose }) => {
    const [type, setType] = useState('');
    const [libelle, setLibelle] = useState('');
    const [valeur, setValeur] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [tauxAmortissement, setTauxAmortissement] = useState('');
    const [valeurConstante, setValeurConstante] = useState('');
    const [jour, setJour] = useState('');

    const { nom } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPossession = {
            possesseur: {
                nom
            },
            type,
            libelle,
            valeur: parseFloat(valeur) || 0,
            dateDebut: new Date(dateDebut),
            dateFin: dateFin ? new Date(dateFin) : null,
            tauxAmortissement: parseFloat(tauxAmortissement) || null,
            jour: parseInt(jour) || null,
            valeurConstante: parseFloat(valeurConstante) || 0
        };

        axios.post(`http://localhost:5000/possession/${nom}`, newPossession)
            .then(response => {
                handleClose();
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout de la possession:', error);
            });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ajouter une possession</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formType">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                            type="text"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formLibelle">
                        <Form.Label>Libelle</Form.Label>
                        <Form.Control
                            type="text"
                            value={libelle}
                            onChange={(e) => setLibelle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formValeur">
                        <Form.Label>Valeur</Form.Label>
                        <Form.Control
                            type="number"
                            value={valeur}
                            onChange={(e) => setValeur(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDateDebut">
                        <Form.Label>Date Début</Form.Label>
                        <Form.Control
                            type="date"
                            value={dateDebut}
                            onChange={(e) => setDateDebut(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDateFin">
                        <Form.Label>Date Fin</Form.Label>
                        <Form.Control
                            type="date"
                            value={dateFin}
                            onChange={(e) => setDateFin(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formTauxAmortissement">
                        <Form.Label>Taux d'Amortissement</Form.Label>
                        <Form.Control
                            type="number"
                            value={tauxAmortissement}
                            onChange={(e) => setTauxAmortissement(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formValeurConstante">
                        <Form.Label>Valeur Constante</Form.Label>
                        <Form.Control
                            type="number"
                            value={valeurConstante}
                            onChange={(e) => setValeurConstante(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formJour">
                        <Form.Label>Jour</Form.Label>
                        <Form.Control
                            type="number"
                            value={jour}
                            onChange={(e) => setJour(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Ajouter
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddPossessionModal;

