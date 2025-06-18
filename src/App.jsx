import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/AppHeader';
import ColorExtractor from './components/ColourExtractor';
import HistoryPage from './components/HistoryPage';
import './App.css';

function HomeWrapper({ history, setHistory }) {
    const location = useLocation();
    return (
        <ColorExtractor
            history={history}
            setHistory={setHistory}
            initialItem={location.state}
        />
    );
}

function App() {
    const [history, setHistory] = useState([]);

    return (
        <Router>
            <div className="min-h-screen">
                <Header history={history} />

                <Routes>
                    <Route
                        path="/"
                        element={<HomeWrapper history={history} setHistory={setHistory} />}
                    />
                    <Route
                        path="/history"
                        element={<HistoryPage history={history} />}
                    />
                </Routes>

            </div>
        </Router>
    );
}

export default App;


