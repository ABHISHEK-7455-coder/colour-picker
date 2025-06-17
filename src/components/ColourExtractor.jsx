// import { useState, useRef } from 'react';
// import ColorThief from 'colorthief';
// import './ColourExtractor.css';

// function rgbToHex(r, g, b) {
//     return (
//         '#' +
//         [r, g, b]
//             .map((x) => {
//                 const hex = x.toString(16);
//                 return hex.length === 1 ? '0' + hex : hex;
//             })
//             .join('')
//     );
// }

// export default function ColorExtractor() {
//     const [colors, setColors] = useState([]);
//     const [imageSrc, setImageSrc] = useState(null);
//     const [history, setHistory] = useState([]);
//     const [showHistory, setShowHistory] = useState(false); // toggle history visibility
//     const imgRef = useRef();

//     const handleImageUpload = (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         const reader = new FileReader();
//         reader.onload = (event) => {
//             const src = event.target.result;
//             setImageSrc(src);
//             setColors([]);
//         };
//         reader.readAsDataURL(file);
//     };

//     const handleImageLoad = () => {
//         const img = imgRef.current;
//         if (img.complete && img.naturalWidth) {
//             const colorThief = new ColorThief();
//             const palette = colorThief.getPalette(img, 5);
//             setColors(palette);

//             setHistory((prev) => {
//                 const duplicate = prev.some(
//                     (item) =>
//                         item.src === img.src &&
//                         JSON.stringify(item.palette) === JSON.stringify(palette)
//                 );
//                 return duplicate ? prev : [{ src: img.src, palette }, ...prev];
//             });
//         }
//     };

//     const loadHistoryItem = (item) => {
//         setImageSrc(item.src);
//         setColors(item.palette);
//     };

//     return (
//         <div className="mainContainer">
//             <div className="leftPanel">
//                 <div className="file-input">
//                     <h1 className="title">Upload an Image</h1>
//                     <label htmlFor="file">Select file</label>
//                     <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageUpload}
//                         className="fileInput file"
//                         id="file"
//                     />
//                 </div>

//                 {history.length > 0 && (
//                     <button
//                         className="toggleHistoryBtn"
//                         onClick={() => setShowHistory((v) => !v)}
//                     >
//                         {showHistory ? 'Hide History' : 'Show History'}
//                     </button>
//                 )}

//                 {showHistory && history.length > 0 && (
//                     <div className="historyPanel">
//                         <h2>History</h2>
//                         <div className="historyList">
//                             {history.map((item, index) => (
//                                 <div
//                                     key={index}
//                                     className="historyItem"
//                                     onClick={() => loadHistoryItem(item)}
//                                 >
//                                     <img
//                                         src={item.src}
//                                         alt={`History ${index}`}
//                                         className="historyThumb"
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>

//             <div className="rightPanel">
//                 {imageSrc && (
//                     <>
//                         <img
//                             src={imageSrc}
//                             alt="Uploaded"
//                             ref={imgRef}
//                             crossOrigin="anonymous"
//                             onLoad={handleImageLoad}
//                             className="imagePreview"
//                         />
//                         <div className="colorGrid">
//                             {colors.map((color, index) => {
//                                 const hex = rgbToHex(...color);
//                                 return (
//                                     <div key={index} className="colorSwatch">
//                                         <div
//                                             className="colorBox"
//                                             style={{ backgroundColor: hex }}
//                                         />
//                                         <span className="hexCode">{hex}</span>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }

import { useState } from 'react';
import ColorThief from 'colorthief';
import './ColourExtractor.css';

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

export default function ColorExtractor({ history, setHistory }) {
  const [colors, setColors] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
      setColors([]);
    };
    reader.readAsDataURL(file);
  };

  const handleImgLoad = (e) => {
    const img = e.target;
    if (img.complete && img.naturalWidth > 0) {
      const palette = new ColorThief().getPalette(img, 5);
      setColors(palette);

      setHistory((prev) => {
        const dup = prev.some(
          (item) =>
            item.src === imageSrc &&
            JSON.stringify(item.palette) === JSON.stringify(palette)
        );
        return dup ? prev : [{ src: imageSrc, palette }, ...prev];
      });
    }
  };

  return (
    <div className="mainContainer">
      <div className="leftPanel">
        <div className="file-input">
          <h1 className="title">Upload an Image</h1>
          <label htmlFor="file">Select file</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="fileInput file"
            id="file"
          />
        </div>
      </div>
      <div className="rightPanel">
        {imageSrc && (
          <>
            <img
              src={imageSrc}
              alt="Uploaded"
              crossOrigin="anonymous"
              onLoad={handleImgLoad}
              className="imagePreview"
            />
            <div className="colorGrid">
              {colors.map((col, i) => {
                const hex = rgbToHex(...col);
                return (
                  <div key={i} className="colorSwatch">
                    <div className="colorBox" style={{ backgroundColor: hex }} />
                    <span className="hexCode">{hex}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
