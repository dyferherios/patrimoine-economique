import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PossessionsList from '../components/PossessionsList.jsx';


const PossessionsContainer = () => {
    const { nom } = useParams();
    const [possessions, setPossessions] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        fetchPossessions();
    }, [nom]);

    const fetchPossessions = () => {
        axios.get(`http://localhost:5000/possession/`)
            .then(response => {
                setPossessions(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const handleDateSubmit = (date) => {
        setSelectedDate(date);
        updateDateFin(date);
    };

    const updateDateFin = (date) => {
        const updatedData = possessions.map((possession) => {
            if (possession.dateFin !== date) {
                return {
                    ...possession,
                    dateFin: new Date(date).toISOString(),
                };
            }
            return possession;
        });
        setPossessions(updatedData);
    };

    const handleClose = (libelle) => {
        axios.patch(`http://localhost:5000/possession/${libelle}/close`)
            .then(response => {
                console.log('Possession closed:', response.data);
                fetchPossessions();
            })
            .catch(error => {
                console.error('Error closing possession:', error);
            });
    };

    const handleDelete = (libelle) => {
        axios.delete(`http://localhost:5000/possession/${libelle}`)
            .then(response => {
                console.log('Deleted possession:', response.data);
                fetchPossessions();
            })
            .catch(error => {
                console.error('Erreur réseau:', error);
            });
    };

    return (
        <PossessionsList
            nom={nom}
            possessions={possessions}
            selectedDate={selectedDate}
            showAddModal={showAddModal}
            setShowAddModal={setShowAddModal}
            handleDateSubmit={handleDateSubmit}
            handleClose={handleClose}
            handleDelete={handleDelete}
            fetchPossessions={fetchPossessions}
        />
    );
};

export default PossessionsContainer;
