// src/components/HistoryPage.jsx
// import React, { useContext } from 'react';
// import { HistoryViewContext } from '../HistoryContext';

// export default function HistoryPage() {
//   const { toggleHistoryView } = useContext(HistoryViewContext);

//   return (
//     <div className="history-page">
//       <h1>History</h1>
//       {/* Render your history items here */}
//       <button onClick={toggleHistoryView}>Back</button>
//     </div>
//   );
// }

import './ColourExtractor.css'; // or separate CSS file
function rgbToHex(r, g, b) {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

export default function HistoryPage({ history }) {
  return (
    <div className="historyPageContainer">
      <h2>Image History</h2>
      {history.length === 0 ? (
        <p>No history yet.</p>
      ) : (
        <div className="historyList">
          {history.map((item, idx) => (
            <div key={idx} className="historyItem">
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
                    <span className="hexCode">{rgbToHex(...c)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



