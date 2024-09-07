import React from 'react';

const DateInput = ({ label, value, onChange }) => {
    return (
        <div className='w-75 d-flex flex-row align-items-center justify-content-center' style={{ height: '50px' }}>
            <label className='me-2'>{label}</label>
            <input
                className='form-control form-control-md w-50'
                type="date"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
            />
        </div>
    );
};

export default DateInput;
