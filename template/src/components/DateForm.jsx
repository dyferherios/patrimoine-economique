import React, { useState } from 'react';


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
        <form onSubmit={handleSubmit} className='w-50 mb-5'>
            <div className='mt-5 mb-2 d-flex flex-row justify-content-center gap-2 align-items-center'>
                <input className='form-control form-control-md w-50'
                    type="date"
                    id="dateInput"
                    value={selectedDate}
                    onChange={handleDateChange}
                    required
                />
                <button type="submit" className='btn btn-primary'>Appliquer</button>
            </div>
        </form>
    );
};

export default DateForm;
