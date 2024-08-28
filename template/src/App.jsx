import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Possesseurs from './components/Possesseurs';
import Possessions from './components/Possessions'; 

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Possesseurs />} />
                <Route path="/possessions/:nom" element={<Possessions />} />
            </Routes>
        </Router>
    );
}

export default App;
