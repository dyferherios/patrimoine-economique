import React, { useState } from 'react';
import DateInput from '../components/DateForm';

const DateFormContainer = ({ dateConfigs, onSubmit }) => {
    const [dates, setDates] = useState(dateConfigs.reduce((acc, config) => {
        acc[config.id] = '';
        return acc;
    }, {}));

    const handleDateChange = (id, value) => {
        setDates(prevDates => ({
            ...prevDates,
            [id]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formattedDates = Object.entries(dates).reduce((acc, [id, value]) => {
            acc[id] = value ? new Date(value).toISOString() : null;
            return acc;
        }, {});
        onSubmit(formattedDates);
    };

    return (
        <form onSubmit={handleSubmit} className='d-flex flex-row align-items-center w-75'>
            <div className='d-flex flex-row justify-content-center align-items-center' style={{ width: '100%' }}>
                {dateConfigs.map(config => (
                    <DateInput
                        key={config.id}
                        label={config.label}
                        value={dates[config.id]}
                        onChange={(value) => handleDateChange(config.id, value)}
                    />
                ))}
            </div>
            <button type="submit" className='btn btn-primary'>Appliquer</button>
        </form>
    );
};

export default DateFormContainer;
