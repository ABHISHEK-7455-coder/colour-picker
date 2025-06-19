
// import { useState, useEffect } from 'react';
// import ColorThief from 'colorthief';
// import './ColourExtractor.css';
// import PaletteGrid from '../Palettes/PaletteGrid';
// //import SearchPalettes from '../Searching/SearchPalettes';

// function rgbToHex(r, g, b) {
//   return (
//     '#' +
//     [r, g, b]
//       .map((x) => {
//         const hex = x.toString(16);
//         return hex.length === 1 ? '0' + hex : hex;
//       })
//       .join('')
//   );
// }

// export default function ColorExtractor({ history, setHistory, initialItem }) {
//   const [imageSrc, setImageSrc] = useState(initialItem?.src || null);
//   const [colors, setColors] = useState(initialItem?.palette || []);

//   useEffect(() => {
//     if (initialItem) {
//       setImageSrc(initialItem.src);
//       setColors(initialItem.palette);
//     }
//   }, [initialItem]);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       setImageSrc(event.target.result);
//       setColors([]);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleImgLoad = (e) => {
//     const img = e.target;
//     if (img.complete && img.naturalWidth > 0) {
//       const palette = new ColorThief().getPalette(img, 5);
//       setColors(palette);
//       setHistory((prev) => {
//         const duplicate = prev.some(
//           (item) =>
//             item.src === imageSrc &&
//             JSON.stringify(item.palette) === JSON.stringify(palette)
//         );
//         return duplicate ? prev : [{ src: imageSrc, palette }, ...prev];
//       });
//     }
//   };

//   return (
//     <div className='forDivieded'>
//     <div className="mainContainer">
//       <div className="leftPanel">
//         <div className="file-input">
//           <h1 className="title">Upload an Image</h1>
//           <h2 className="subtitle">The easiest place to get colors from your photos</h2>
//           <label htmlFor="file">Select file</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="fileInput file"
//             id="file"
//           />
//         </div>
//       </div>

//       <div className="rightPanel">
//         {imageSrc && (
//           <>
//             <img
//               src={imageSrc}
//               alt="Uploaded"
//               crossOrigin="anonymous"
//               onLoad={handleImgLoad}
//               className="imagePreview"
//             />
//             <div className="colorGrid">
//               {colors.map((col, i) => {
//                 const hex = rgbToHex(...col);
//                 return (
//                   <div key={i} className="colorSwatch">
//                     <div className="colorBox" style={{ backgroundColor: hex }} />
//                     <span className="hexCode">{hex}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//      <div>
//       <PaletteGrid />
//       {/* <SearchPalettes /> */}
//     </div>
//   </div>
//   );
// }

import { useState, useEffect } from 'react';
import ColorThief from 'colorthief';
import './ColourExtractor.css';
import PaletteGrid from '../Palettes/PaletteGrid';

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

// Brightness by scaling each RGB channel; saturation via simplifed HSL-ish approach
function adjustColor([r, g, b], brightness, saturation) {
  // brightness scalar: 0–2 (0%–200%)
  const brightFactor = brightness / 100;
  let rf = r * brightFactor;
  let gf = g * brightFactor;
  let bf = b * brightFactor;

  const avg = (rf + gf + bf) / 3;
  const satFactor = saturation / 100;

  rf = avg + (rf - avg) * satFactor;
  gf = avg + (gf - avg) * satFactor;
  bf = avg + (bf - avg) * satFactor;

  const clamp = (x) => Math.max(0, Math.min(255, Math.round(x)));
  return [clamp(rf), clamp(gf), clamp(bf)];
}

export default function ColorExtractor({ history, setHistory, initialItem }) {
  const [imageSrc, setImageSrc] = useState(initialItem?.src || null);
  const [colors, setColors] = useState(initialItem?.palette || []);
  const [brightness, setBrightness] = useState(100);
  const [saturation, setSaturation] = useState(100);

  useEffect(() => {
    if (initialItem) {
      setImageSrc(initialItem.src);
      setColors(initialItem.palette);
      setBrightness(100);
      setSaturation(100);
    }
  }, [initialItem]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
      setColors([]);
      setBrightness(100);
      setSaturation(100);
    };
    reader.readAsDataURL(file);
  };

  const handleImgLoad = (e) => {
    const img = e.target;
    if (img.complete && img.naturalWidth > 0) {
      const palette = new ColorThief().getPalette(img, 5);
      setColors(palette);
      setHistory((prev) => {
        const duplicate = prev.some(
          (item) =>
            item.src === imageSrc &&
            JSON.stringify(item.palette) === JSON.stringify(palette)
        );
        return duplicate ? prev : [{ src: imageSrc, palette }, ...prev];
      });
    }
  };

  const adjusted = colors.map((col) =>
    adjustColor(col, brightness, saturation)
  );

  return (
    <div className='forDivieded'>
      <div className="mainContainer">
        <div className="leftPanel">
          <div className="file-input">
            <h1 className="title">Upload an Image</h1>
            <h2 className="subtitle">The easiest place to get colors from your photos</h2>
            <label htmlFor="file">Select file</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="fileInput file"
              id="file"
            />
          </div>

          {/* Brightness & Saturation Controls */}
          <div className="controls">
            <label>Brightness: {brightness}%</label>
            <input
              type="range"
              min="0"
              max="200"
              value={brightness}
              onChange={(e) => setBrightness(+e.target.value)}
            />
            <label>Saturation: {saturation}%</label>
            <input
              type="range"
              min="0"
              max="200"
              value={saturation}
              onChange={(e) => setSaturation(+e.target.value)}
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
                {adjusted.map((col, i) => {
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

      <div>
        <PaletteGrid />
      </div>
    </div>
  );
}
