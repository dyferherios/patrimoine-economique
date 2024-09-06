import React from 'react';
import Form from 'react-bootstrap/Form';

function PossessionForm({ possession, onChange }) {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formLibelle">
                <Form.Label>Libelle</Form.Label>
                <Form.Control
                    type="text"
                    value={possession.libelle}
                    onChange={(e) => onChange('libelle', e.target.value)}
                    autoFocus
                />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formDateFin">
                <Form.Label>Date Fin</Form.Label>
                <Form.Control
                    type="date"
                    value={possession.dateFin}
                    onChange={(e) => onChange('dateFin', e.target.value)}
                />
            </Form.Group>
        </Form>
    );
}


export default PossessionForm;
