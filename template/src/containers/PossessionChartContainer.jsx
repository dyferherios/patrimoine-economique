import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'chart.js/auto';
import { calculateTotalValeurActuelle } from './PossessionUtils';
import PossessionChart from '../components/PossessionChart';

const PossessionChartContainer = () => {
    const [possessions, setPossessions] = useState([]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    const dateConfigs = [
        { id: 'startDate', label: 'Date du debut' },
        { id: 'endDate', label: 'Date de fin' }
    ];

    const handleDateSubmit = (dates) => {
        updateChartData(dates.startDate, dates.endDate);
    };

    useEffect(() => {
        fetchPossessions();
    }, []);

    const fetchPossessions = () => {
        axios.get(`${import.meta.env.VITE_URL_API}/possession/`)
            .then(response => {
                console.log('Fetched data:', response.data);
                setPossessions(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
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

    const updateChartData = (startDate, endDate) => {
        if (startDate && endDate) {
            const dates = generateDateRange(new Date(startDate), new Date(endDate));
            const labels = dates.map(date => date.toLocaleDateString());
            const values = dates.map(date => calculateTotalValeurActuelle(possessions, date));

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

    return (
        <PossessionChart
            chartData={chartData}
            dateConfigs={dateConfigs}
            handleDateSubmit={handleDateSubmit}
        />
    );
};

export default PossessionChartContainer;

