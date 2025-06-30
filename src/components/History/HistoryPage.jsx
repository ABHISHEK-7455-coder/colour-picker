import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Historypage.css';
import BottomFooter from '../Footer/BottomFooter';

function rgbToHex(r, g, b) {
  return (
    '#' +
    [r, g, b].map((x) =>
      x.toString(16).padStart(2, '0')
    ).join('')
  );
}

export default function HistoryPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('colorHistory');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleSelect = (item) => {
    navigate('/upload', { state: item });
  };

  return (
    <div className="historyPageContainer">
      <button onClick={() => navigate(-1)} className="backBtn">
        ← Back
      </button>
      <button className="backBtn" onClick={() => navigate('/upload')}>
        Palette Generator
      </button>

      <h2 className="HistoryHeading">Searched Images</h2>
      <p className="historyLine">
        Click an image to edit or re-generate its palette
      </p>

      {history.length === 0 ? (
        <>
          <h2>No history yet.</h2>
        </>
      ) : (
        <div className="historyList">
          {history.map((item, idx) => (
            <div
              key={idx}
              className="historyItem"
              onClick={() => handleSelect(item)}
            >
              <img
                src={item.src}
                alt={`History-${idx}`}
                className="historyThumb"
              />
              <div className="colorGrid">
                {item.palette.map((c, i) => (
                  <div key={i} className="colorSwatch">
                    <div
                      className="colorBox"
                      style={{ backgroundColor: rgbToHex(...c) }}
                    />
                    <span className="hexCode">
                      {rgbToHex(...c)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <BottomFooter />
    </div>
  );
}
