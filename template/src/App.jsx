import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Possesseurs from './components/Possesseurs';
import Possessions from './components/Possessions';
import PossessionChart from './components/PossessionChart';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';

const App = () => {
    return (
        <Router>
            <div className="vw-100 vh-100 overflow-x-hidden">
                <NavBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/possesseurs" element={<Possesseurs />} />
                    <Route path="/possessions/:nom" element={<Possessions />} />
                    <Route path="/possessions/:nom/chart" element={<PossessionChart />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
