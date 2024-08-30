import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';
import { Link, useParams } from 'react-router-dom';
import DateForm from './DateForm';
import Possession from "../../../models/possessions/Possession.js";
import Flux from "../../../models/possessions/Flux.js";

const PossessionsChart = () => {
    const { nom } = useParams();
    const [possessions, setPossessions] = useState([]);
    const [dateDebut, setDateDebut] = useState();
    const [dateFin, setDateFin] = useState();
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        fetchPossessions();
    }, [nom]);

    useEffect(() => {
        if (possessions.length > 0 && dateDebut && dateFin) {
            updateChartData();
        }
    }, [possessions, dateDebut, dateFin]);

    const fetchPossessions = () => {
        axios.get(`http://localhost:5000/possessions/${nom}`)
            .then(response => {
                console.log('Fetched data:', response.data);
                setPossessions(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    function calculateValue(possession, dateToUse) {
        if (possession.type === "BienMateriel") {
            const newPossession = new Possession(
                possession.possesseur,
                possession.libelle,
                possession.valeur,
                new Date(possession.dateDebut),
                dateToUse,
                possession.tauxAmortissement
            );
            return newPossession.getValeur(dateToUse);
        }
        if (possession.type === "Flux") {
            const newFlux = new Flux(possession.possesseur, possession.libelle, possession.valeurConstante, new Date(possession.dateDebut), dateToUse, possession.tauxAmortissement, possession.jour);
            return newFlux.getValeur(dateToUse);
        }
        return 0;
    }

    const calculateTotalValeurActuelle = (date) => {
        return possessions.reduce((sum, possession) => sum + calculateValue(possession, date), 0);
    };

    const generateDateRange = (startDate, endDate) => {
        const dates = [];
        const start = new Date(startDate);
        const end = new Date(endDate);
        const dayOfMonth = start.getDate();

        let current = new Date(start);

        while (current <= end) {
            dates.push(new Date(current));
            current.setMonth(current.getMonth() + 1);
            if (current.getDate() !== dayOfMonth) {
                current.setDate(0);
                if (current > end) break;
                current.setDate(dayOfMonth);
            }
        }

        return dates;
    };

    const updateChartData = () => {
        if (dateDebut && dateFin) {
            const startDate = new Date(dateDebut);
            const endDate = new Date(dateFin);
            const dates = generateDateRange(startDate, endDate);
            const labels = dates.map(date => date.toLocaleDateString());

            const values = dates.map(date => calculateTotalValeurActuelle(date));

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Valeur actuelle',
                        data: values,
                        fill: true,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 2,
                    }
                ]
            });

        }
    };

    const updateDateDebut = (date) => {
        setDateDebut(date);
    };

    const updateDateFin = (date) => {
        setDateFin(date);
    };

    return (
        <div className='d-flex flex-column align-items-center top-0 start-0 end-0' style={{ height: '70vh', width: '100%' }}>
            <h2 className='text-center m-3'>Graphique du patrimoine de {nom}</h2>

            <div className='d-flex flex-row justify-content-center align-items-center gap-5 mb-5' style={{ width: '100%', height: '50px' }}>
                <div className='w-50 d-flex flex-row align-items-center justify-content-center border' style={{height:'50px'}} >
                    <label htmlFor="" className=''>Date du debut</label>
                    <DateForm onDateSubmit={updateDateDebut} />
                </div>
                <div className='w-50 d-flex flex-row align-items-center justify-content-center border' style={{height:'50px'}}>
                    <label htmlFor="">Date de fin</label>
                    <DateForm onDateSubmit={updateDateFin} />
                </div>

            </div>

            <div style={{ width: '100%', height: 'calc(90vh - 150px)' }}> {/* Ajustez la hauteur en fonction de vos besoins */}
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                type: 'category',
                                title: {
                                    display: true,
                                    text: 'Date'
                                },
                                ticks: {
                                    autoSkip: false,
                                    maxRotation: 45,
                                    minRotation: 45,
                                }
                            },
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Valeur'
                                }
                            }
                        }
                    }}
                />
            </div>
        </div>

    );
};

export default PossessionsChart;
