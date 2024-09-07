import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import PossessionsContainer from './containers/PossessionsContainer';
import ModifyPossession from './containers/ModifyPossession';
import PossessionChartContainer from './containers/PossessionChartContainer';


const App = () => {
    return (
        <Router>
            <div className="vw-100 vh-100 overflow-x-hidden">
                <NavBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/possessions" element={<PossessionsContainer />} />
                    <Route path="/possessions/:libelle/:id" element={<ModifyPossession />} />
                    <Route path="/patrimoine/chart" element={<PossessionChartContainer />} /> 
                </Routes>
            </div>
        </Router>
    );
}

export default App;
