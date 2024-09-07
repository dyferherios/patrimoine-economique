import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import DateFormContainer from '../containers/DateFormContainer';


const PossessionChart = ({ chartData, dateConfigs, handleDateSubmit }) => {
    return (
        <div className='d-flex flex-column align-items-center top-0 start-0 end-0' style={{ height: 'auto', width: '100%' }}>
            <h2 className='text-center m-5'>Graphique de la patrimoine de John Doe</h2>
            <DateFormContainer
                dateConfigs={dateConfigs}
                onSubmit={handleDateSubmit}
            />

            <div style={{ width: '100%', height: '100vh' }}>
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

export default PossessionChart;
