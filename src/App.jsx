

// import Header from "./components/AppHeader";
// import ColorExtractor from "./components/ColourExtractor";

// function App() {
//     return (
//         <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//             <Header />
//             <ColorExtractor />
//         </div>
//     );
// }

// export default App;

import { useState } from 'react';
import Header from './components/AppHeader';
import ColorExtractor from './components/ColourExtractor';
import HistoryPage from './components/HistoryPage';
import './App.css';

function App() {
  const [history, setHistory] = useState([]);
  const [viewingHistory, setViewingHistory] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <Header
        history={history}
        onViewHistory={() => setViewingHistory((v) => !v)}
      />

      {viewingHistory ? (
        <HistoryPage history={history} />
      ) : (
        <ColorExtractor history={history} setHistory={setHistory} />
      )}
    </div>
  );
}

export default App;
