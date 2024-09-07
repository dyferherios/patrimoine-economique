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
        axios.get(`${import.meta.env.VITE_URL_API}/possession/`)
            .then(response => {
                setPossessions(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const dateConfigs = [
        { id: 'endDate', label: 'Date de fin' }
    ];

    const handleDateSubmit = (dates) => {
        updateDateFin(dates.endDate);
        setSelectedDate(dates.endDate);
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
        axios.patch(`${import.meta.env.VITE_URL_API}/possession/${libelle}/close`)
            .then(response => {
                console.log('Possession closed:', response.data);
                fetchPossessions();
            })
            .catch(error => {
                console.error('Error closing possession:', error);
            });
    };

    return (
        <PossessionsList
            dateConfigs={dateConfigs}
            possessions={possessions}
            selectedDate={selectedDate}
            showAddModal={showAddModal}
            setShowAddModal={setShowAddModal}
            handleDateSubmit={handleDateSubmit}
            handleClose={handleClose}
            fetchPossessions={fetchPossessions}
        />
    );
};

export default PossessionsContainer;
