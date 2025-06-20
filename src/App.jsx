import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/AppHeader';
import Home from './components/Home/Home';
import ColorExtractor from './components/ColorExtractor/ColourExtractor';
import HistoryPage from './components/History/HistoryPage';
import { ThemeProvider } from './components/ThemeContext'; // ⬅️ import the theme context
import ColorPickerButton from './components/ColorPicker';
import GradientMaker from './GradientMaker';

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
    <>
    <GradientMaker />
    <ColorPickerButton />
    <ThemeProvider>
      <Router>
        <div className="min-h-screen">
          <Header history={history} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/upload"
              element={<HomeWrapper history={history} setHistory={setHistory} />}
            />
            <Route path="/history" element={<HistoryPage history={history} />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
    
    </>
  );
}

export default App;
