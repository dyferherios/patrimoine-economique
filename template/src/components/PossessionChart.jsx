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

    // const generateDateRange = (startDate, endDate) => {
    //     const dates = [];
    //     const start = new Date(startDate);
    //     const end = new Date(endDate);
    //     let current = new Date(start);


    //     while (current <= end) {
    //         if (current.getDate() === new Date(dateDebut).getDate()) {
    //             dates.push(new Date(current));
    //         }
    //         current.setMonth(current.getMonth() + 1);
    //     }
    //     console.log(dates);
    //     return dates;
    // };

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

        console.log(dates);
        return dates;
    };



    const updateChartData = () => {
        if (dateDebut && dateFin) {
            const startDate = new Date(dateDebut);
            const endDate = new Date(dateFin);
            const dates = generateDateRange(startDate, endDate);
            console.log("date", dates.length);

            const labels = dates.map(date => date.toLocaleDateString());
            console.log(labels);

            const values = dates.map(date => calculateTotalValeurActuelle(date).toFixed(2));

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

            console.log("values", values.length);


            const totalDebut = calculateTotalValeurActuelle(startDate);
            const totalFin = calculateTotalValeurActuelle(endDate);

        }
    };

    const updateDateDebut = (date) => {
        console.log(date);
        setDateDebut(date);
    };

    const updateDateFin = (date) => {
        console.log(date);
        setDateFin(date);
    };

    return (
        <div>
            <h2>Valeur des possessions pour {nom}</h2>
            <div className='border border-black d-flex flex-row'>
                <DateForm onDateSubmit={updateDateDebut} />
                <DateForm onDateSubmit={updateDateFin} />
            </div>
            <Line data={chartData} options={{
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
            }} />
        </div>
    );
};

export default PossessionsChart;
