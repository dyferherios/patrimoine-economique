// AddPossessionForm.js
import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const AddPossessionForm = ({
    show,
    handleClose,
    type,
    libelle,
    valeur,
    dateDebut,
    dateFin,
    tauxAmortissement,
    valeurConstante,
    jour,
    setType,
    setLibelle,
    setValeur,
    setDateDebut,
    setDateFin,
    setTauxAmortissement,
    setValeurConstante,
    setJour,
    handleSubmit
}) => {
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
                            as="select"
                            type="text"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="Flux">Flux</option>
                            <option value="Argent">Argent</option>
                            <option value="Bien matériel">Bien matériel</option>
                        </Form.Control>

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

export default AddPossessionForm;
