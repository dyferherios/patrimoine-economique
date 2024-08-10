import React, { useState } from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

const DateForm = ({ onDateSubmit }) => {
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const date = new Date(selectedDate);
        const isoDate = date.toISOString();
        onDateSubmit(isoDate);
    };

    return (
        <form onSubmit={handleSubmit} className='w-50 h-50'>
            <div className='mt-5 mb-2 d-flex flex-row justify-content-center gap-2 align-items-center'>
                <label htmlFor="dateInput">Select a Date: </label>
                <input className='form-control form-control-md w-50'
                    type="date"
                    id="dateInput"
                    value={selectedDate}
                    onChange={handleDateChange}
                    required
                />
                <button type="submit" className='btn btn-primary'>Apply</button>
            </div>
        </form>
    );
};

export default DateForm;
