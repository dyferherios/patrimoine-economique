import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import PossessionForm from '../components/PossessionForm';

function ModifyPossession() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [possession, setPossession] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/possession/${id}`)
            .then(response => {
                setPossession(response.data);
            })
            .catch(error => {
                console.error('Erreur lors du chargement de la possession:', error);
            });
    }, [id]);

    const handleChange = (field, value) => {
        setPossession(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        axios.put(`http://localhost:5000/possession/${id}`, possession)
            .then(response => {
                console.log('Update response:', response.data);
                navigate('/possessions');
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour:', error);
            });
    };

    if (!possession) {
        return <div>Chargement...</div>;
    }

    return (
        <Container>
            <h1>Modifier Possession</h1>
            <PossessionForm possession={possession} onChange={handleChange} />
            <Button variant="primary" onClick={handleSave}>
                Enregistrer
            </Button>
            <Button variant="secondary" onClick={() => navigate('/possessions')}>
                Annuler
            </Button>
        </Container>
    );
}

export default ModifyPossession;
