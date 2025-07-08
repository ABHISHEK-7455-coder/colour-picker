
//  import { useState, useEffect, useRef } from 'react';
//  import html2canvas from 'html2canvas';
// import './GradientMaker.css'; // Import the CSS file

// const GradientMaker = () => {
//     const [colorStops, setColorStops] = useState([
//         { id: 1, position: 10, color: '#80D6C0' },
//         { id: 2, position: 80, color: '#FBDF2D' }
//     ]);
//     const [gradientType, setGradientType] = useState('linear');
//     const [angle, setAngle] = useState(90);
//     const [cssOutput, setCssOutput] = useState('');
//     const [newColor, setNewColor] = useState('#000000'); // State for new color input
//     const previewRef = useRef(null);

//     useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem('gradientPresets') || '[]');
//     if (stored.length) {
//       const last = stored[stored.length - 1];
//       setColorStops(last.colorStops);
//       setGradientType(last.gradientType);
//       setAngle(last.angle);
//     }
//   }, []);
//     useEffect(() => {
//         updateGradient();
//     }, [colorStops, gradientType, angle]);

//     const updateGradient = () => {
//         const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
//         const colorsStr = sortedStops.map(s => `${s.color} ${s.position}%`).join(', ');

//         let gradientStr = '';
//         switch (gradientType) {
//             case 'linear':
//                 gradientStr = `linear-gradient(${angle}deg, ${colorsStr})`;
//                 break;
//             case 'radial':
//                 gradientStr = `radial-gradient(circle, ${colorsStr})`;
//                 break;
//             case 'conic':
//                 gradientStr = `conic-gradient(from ${angle}deg, ${colorsStr})`;
//                 break;
//             default:
//                 break;
//         }

//         setCssOutput(`background: ${gradientStr};`);
//     };

//     const downloadPNG = async () => {
//     if (!previewRef.current) return;
//     const canvas = await html2canvas(previewRef.current);
//     const data = canvas.toDataURL('image/png', 1.0);
//     const link = document.createElement('a');
//     link.href = data;
//     link.download = 'gradient.png';
//     link.click();
//   };

//   const savePreset = () => {
//     const preset = { colorStops, gradientType, angle };
//     const existing = JSON.parse(localStorage.getItem('gradientPresets') || '[]');
//     localStorage.setItem('gradientPresets', JSON.stringify([...existing, preset]));
//     alert('Preset saved!');
//   };

//     const addColorStop = () => {
//         const newPosition = Math.round(colorStops[colorStops.length - 1].position / 2);
//         const newId = Date.now();
//         setColorStops([...colorStops, { id: newId, position: newPosition, color: newColor }]);
//         setNewColor('#000000'); // Reset the color input after adding
//     };

//     const removeColorStop = (id) => {
//         if (colorStops.length <= 2) return;
//         setColorStops(colorStops.filter(s => s.id !== id));
//     };

//     const handleColorChange = (id, color) => {
//         setColorStops(colorStops.map(stop => (stop.id === id ? { ...stop, color } : stop)));
//     };

//     const handlePositionChange = (id, position) => {
//         setColorStops(colorStops.map(stop => (stop.id === id ? { ...stop, position } : stop)));
//     };

//     const copyToClipboard = () => {
//         navigator.clipboard.writeText(cssOutput)
        
//     };

//     const applyPreset = (gradient) => {
//         const presetColors = gradient.match(/rgba?\(([^)]+)\)/g).map(color => `#${color.match(/(\d+), (\d+), (\d+)/).slice(1).map(c => parseInt(c).toString(16).padStart(2, '0')).join('')}`);
//         const presetPositions = [10, 90]; // Assuming two color stops for simplicity
//         setColorStops(presetColors.map((color, index) => ({ id: index + 1, position: presetPositions[index], color })));
//     };

//     const handleMouseDown = (id) => {
//         const handleMove = (e) => {
//             const barRect = document.querySelector('.gradient-bar').getBoundingClientRect();
//             let newPosition = ((e.clientX - barRect.left) / barRect.width) * 100;
//             newPosition = Math.max(0, Math.min(100, newPosition));

//             handlePositionChange(id, newPosition);
//         };

//         const handleMouseUp = () => {
//             document.removeEventListener('mousemove', handleMove);
//             document.removeEventListener('mouseup', handleMouseUp);
//         };

//         document.addEventListener('mousemove', handleMove);
//         document.addEventListener('mouseup', handleMouseUp);
//     };

//     return (
//         <div className="gradient-generator">
//             <div>
//                      <h1 className="title">Gradient Generator</h1>
//                 <p className="subtitle">Create beautiful CSS gradients with ease</p>
//             </div>
               
           

//             <div className="grid">
//                 <div className="preview-section">
//                     <div className="gradient-preview" style={{ background: gradientType === 'linear'
//         ? `linear-gradient(${angle}deg, ${colorStops.map(s => `${s.color} ${s.position}%`).join(', ')})`
//         : gradientType === 'radial'
//         ? `radial-gradient(circle, ${colorStops.map(s => `${s.color} ${s.position}%`).join(', ')})`
//         : `conic-gradient(from ${angle}deg, ${colorStops.map(s => `${s.color} ${s.position}%`).join(', ')})` }}></div>

//                     <div className="controls">
//                         <div className="gradient-type">
//                             <h3 className="section-title">Gradient Type</h3>
//                             <div className="buttons">
//                                 <button onClick={() => setGradientType('linear')} className={`gradient-type-btn ${gradientType === 'linear' ? 'active' : ''}`}>Linear</button>
//                                 <button onClick={() => setGradientType('radial')} className={`gradient-type-btn ${gradientType === 'radial' ? 'active' : ''}`}>Radial</button>
//                                 <button onClick={() => setGradientType('conic')} className={`gradient-type-btn ${gradientType === 'conic' ? 'active' : ''}`}>Conic</button>
//                             </div>
//                         </div>

//                         {gradientType === 'linear' && (
//     <div className="direction-controls">
//       <h3 className="section-title">Direction</h3>
//       <div className="angle-control">
//         <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(parseInt(e.target.value))} />
//         <span className="angle-value">{angle}°</span>
//       </div>
//     </div>
//   )}
//                     </div>

//                     <div className="color-stops">
//                         <h3 className="section-title">Color Stops</h3>
//                         <div className="gradient-bar-container">
//                             <div className="gradient-bar" style={{ background: `linear-gradient(to right, ${colorStops.map(s => `${s.color} ${s.position}%`).join(', ')})` }}></div>
//                             {colorStops.map(stop => (
//                                 <div
//                                     key={stop.id}
//                                     className="color-stop-handle"
//                                     style={{ left: `${stop.position}%`, backgroundColor: stop.color }}
//                                     onMouseDown={() => handleMouseDown(stop.id)}
//                                 ></div>
//                             ))}
//                         </div>
//                         <div className="color-controls">
//                             {colorStops.map(stop => (
//                                 <div key={stop.id} className="color-stop-control">
//                                     {/* <span className="position-label">{Math.round(stop.position)}%</span> */}
//                                     <input type="color" value={stop.color} onChange={(e) => handleColorChange(stop.id, e.target.value)} />
//                                     <input type="range" min="0" max="100" value={stop.position} onChange={(e) => handlePositionChange(stop.id, parseInt(e.target.value))} />
//                                     <span className="position-label">{Math.round(stop.position)}%</span>
//                                     <button onClick={() => removeColorStop(stop.id)} className="remove-btn"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="" height="25px" viewBox="0 0 26 26">
// <path d="M 11 -0.03125 C 10.164063 -0.03125 9.34375 0.132813 8.75 0.71875 C 8.15625 1.304688 7.96875 2.136719 7.96875 3 L 4 3 C 3.449219 3 3 3.449219 3 4 L 2 4 L 2 6 L 24 6 L 24 4 L 23 4 C 23 3.449219 22.550781 3 22 3 L 18.03125 3 C 18.03125 2.136719 17.84375 1.304688 17.25 0.71875 C 16.65625 0.132813 15.835938 -0.03125 15 -0.03125 Z M 11 2.03125 L 15 2.03125 C 15.546875 2.03125 15.71875 2.160156 15.78125 2.21875 C 15.84375 2.277344 15.96875 2.441406 15.96875 3 L 10.03125 3 C 10.03125 2.441406 10.15625 2.277344 10.21875 2.21875 C 10.28125 2.160156 10.453125 2.03125 11 2.03125 Z M 4 7 L 4 23 C 4 24.652344 5.347656 26 7 26 L 19 26 C 20.652344 26 22 24.652344 22 23 L 22 7 Z M 8 10 L 10 10 L 10 22 L 8 22 Z M 12 10 L 14 10 L 14 22 L 12 22 Z M 16 10 L 18 10 L 18 22 L 16 22 Z"></path>
// </svg></button>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="add-color-stop">
//                             <input 
//                                 type="color" 
//                                 className="new-color-input" 
//                                 value={newColor} 
//                                 onChange={(e) => setNewColor(e.target.value)}
//                                 id="style1" 
//                             />
//                             <button onClick={addColorStop} className="add-btn">+ Add Color Stop</button>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="output-section">
//                     <div className="css-output">
//                         <h3 className="section-title">CSS Code</h3>
//                         <pre>{cssOutput}</pre>
//                         <button onClick={copyToClipboard} className="copy-btn">Copy CSS</button>
//                     </div>

//                     <div className="presets">
//                         <h3 className="section-title">Presets</h3>
//                         <div className="preset-grid">
//                             <div className="preset-item" style={{ background: 'linear-gradient(90deg, rgba(139, 92, 246, 1), rgba(59, 130, 246, 1))' }} onClick={() => applyPreset('linear-gradient(90deg, rgba(139, 92, 246, 1), rgba(59, 130, 246, 1))')}></div>
//                             <div className="preset-item" style={{ background: 'linear-gradient(90deg, rgba(236, 72, 153, 1), rgba(244, 63, 94, 1))' }} onClick={() => applyPreset('linear-gradient(90deg, rgba(236, 72, 153, 1), rgba(244, 63, 94, 1))')}></div>
//                             <div className="preset-item" style={{ background: 'linear-gradient(90deg, rgba(16, 185, 129, 1), rgba(20, 184, 166, 1))' }} onClick={() => applyPreset('linear-gradient(90deg, rgba(16, 185, 129, 1), rgba(20, 184, 166, 1))')}></div>
//                             <div className="preset-item" style={{ background: 'linear-gradient(90deg, rgba(250, 204, 21, 1), rgba(239, 68, 68, 1))' }} onClick={() => applyPreset('linear-gradient(90deg, rgba(250, 204, 21, 1), rgba(239, 68, 68, 1))')}></div>
//                             <div className="preset-item" style={{ background: 'linear-gradient(135deg, rgba(17, 24, 39, 1), rgba(55, 65, 81, 1))' }} onClick={() => applyPreset('linear-gradient(135deg, rgba(17, 24, 39, 1), rgba(55, 65, 81, 1))')}></div>
//                             <div className="preset-item" style={{ background: 'radial-gradient(circle, rgba(88, 28, 135, 1), rgba(49, 46, 129, 1))' }} onClick={() => applyPreset('radial-gradient(circle, rgba(88, 28, 135, 1), rgba(49, 46, 129, 1))')}></div>
//                         </div>
//                     </div>

//                     <div className="export-options">
//                         <h3 className="section-title">Export</h3>
//                         <button onClick={downloadPNG} className="export-btn">Download PNG</button>
//         <button onClick={savePreset} className="export-btn">Save as Preset</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default GradientMaker;


// GradientMaker.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import './GradientMaker.css';
import GradientyReact from './TextGradient';
import Blob from './Blob';

// Custom hook for global event listeners with automatic cleanup
function useEventListener(eventName, handler, element = document) {
  const saved = useRef();
  useEffect(() => { saved.current = handler; }, [handler]);
  useEffect(() => {
    const el = element;
    if (!el?.addEventListener) return;
    const eventListener = e => saved.current(e);
    el.addEventListener(eventName, eventListener);
    return () => el.removeEventListener(eventName, eventListener);
  }, [eventName, element]);
}

const GradientMaker = () => {
  const [colorStops, setColorStops] = useState([
    { id: 1, position: 10, color: '#80D6C0' },
    { id: 2, position: 80, color: '#FBDF2D' }
  ]);
  const [gradientType, setGradientType] = useState('linear');
  const [angle, setAngle] = useState(90);
  const [cssOutput, setCssOutput] = useState('');
  const [newColor, setNewColor] = useState('#000000');
  const [draggingId, setDraggingId] = useState(null);

  const previewRef = useRef(null);
  const preRef = useRef(null);

  // Build gradient string
  const buildGradient = useCallback(() => {
    const sorted = [...colorStops].sort((a, b) => a.position - b.position);
    const cs = sorted.map(s => `${s.color} ${s.position}%`).join(', ');
    if (gradientType === 'linear')
      return `linear-gradient(${angle}deg, ${cs})`;
    if (gradientType === 'radial')
      return `radial-gradient(circle, ${cs})`;
    return `conic-gradient(from ${angle}deg, ${cs})`;
  }, [colorStops, gradientType, angle]);

  // Apply gradient to preview and CSS output
  const updateGradient = useCallback(() => {
    const gradient = buildGradient();
    const fullCss = `background: ${gradient};`;
    setCssOutput(fullCss);
    if (previewRef.current) previewRef.current.style.cssText = fullCss;
  }, [buildGradient]);

  useEffect(updateGradient, [updateGradient]);

  // Download PNG with error handling
  const downloadPNG = async () => {
    try {
      const canvas = await html2canvas(previewRef.current, { useCORS: true });
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'gradient.png';
      link.click();
    } catch (err) {
      console.error(err);
      alert('Failed to export PNG. Try simplifying the gradient or retry.');
    }
  };

  // Clipboard copy
  const copyToClipboard = () => navigator.clipboard.writeText(cssOutput);

  // Safe manual CSS editing
  const onPreInput = () => {
    const text = preRef.current.textContent;
    setCssOutput(text);
    try {
      previewRef.current.style.cssText = text;
    } catch {
      alert('Invalid CSS — check your syntax.');
    }
  };

  useEffect(() => {
    if (preRef.current.textContent !== cssOutput)
      preRef.current.textContent = cssOutput;
  }, [cssOutput]);

  // Color stop updates
  const handleColorChange = (id, color) =>
    setColorStops(colorStops.map(s => s.id === id ? { ...s, color } : s));

  const handlePositionChange = (id, position) =>
    setColorStops(colorStops.map(s => s.id === id ? { ...s, position } : s));

  const removeColorStop = id => {
    if (colorStops.length <= 2) return;
    setColorStops(colorStops.filter(s => s.id !== id));
  };
  
  const addColorStop = () => {
    const lastPos = colorStops[colorStops.length - 1].position;
    setColorStops([...colorStops, {
      id: Date.now(),
      position: Math.max(0, Math.min(100, lastPos / 2)),
      color: newColor
    }]);
    setNewColor('#000000');
  };

  // Drag behavior
  const handleMouseMove = (e) => {
    if (draggingId == null) return;
    const bar = document.querySelector('.gradient-bar');
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const newP = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    handlePositionChange(draggingId, newP);
  };
  const handleMouseUp = () => setDraggingId(null);

  useEventListener('mousemove', handleMouseMove);
  useEventListener('mouseup', handleMouseUp);

  const handleMouseDown = id => setDraggingId(id);

  // Apply preset parsing
  const applyPreset = gradientCssStr => {
    const stopRegex = /(#(?:[0-9a-f]{3}|[0-9a-f]{6}))\s*(\d{1,3})%/gi;
    const matches = [...gradientCssStr.matchAll(stopRegex)];
    const stops = matches.map((m, i) => ({
      id: Date.now() + i,
      color: m[1],
      position: Number(m[2])
    }));
    if (stops.length > 1) setColorStops(stops);
  };

  const savePreset = () => {
    const preset = { colorStops, gradientType, angle };
    const existing = JSON.parse(localStorage.getItem('gradientPresets') || '[]');
    localStorage.setItem('gradientPresets', JSON.stringify([...existing, preset]));
    alert('Preset saved!');
  };

  return (
    <div className="gradient-generator">
      <h1 className="title">Gradient Generator</h1>
      <p className="subtitle">Create beautiful CSS gradients with ease</p>

      <div className="grid">
        <div className="preview-section">
          <div
            ref={previewRef}
            className="gradient-preview"
            style={{ background: buildGradient() }}
          />

          <div className="controls">
            <div className="gradient-type">
              <h3 className="section-title">Gradient Type</h3>
              <div className="buttons">
                {['linear','radial','conic'].map(type => (
                  <button
                    key={type}
                    onClick={() => setGradientType(type)}
                    className={`gradient-type-btn ${gradientType===type?'active':''}`}
                  >
                    {type[0].toUpperCase()+type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {gradientType !== 'radial' && (
              <div className="direction-controls">
                <h3 className="section-title">Direction</h3>
                <div className="angle-control">
                  <input type="range" min="0" max="360" value={angle}
                    onChange={e => setAngle(+e.target.value)} />
                  <span className="angle-value">{angle}°</span>
                </div>
              </div>
            )}
          </div>

          <div className="color-stops">
            <h3 className="section-title">Color Stops</h3>
            <div className="gradient-bar-container">
              <div className="gradient-bar" style={{ background: buildGradient() }} />
              {colorStops.map(stop => (
                <div
                  key={stop.id}
                  className="color-stop-handle"
                  style={{ left: `${stop.position}%`, backgroundColor: stop.color }}
                  onMouseDown={() => handleMouseDown(stop.id)}
                />
              ))}
            </div>

            <div className="color-controls">
              {colorStops.map(stop => (
                <div key={stop.id} className="color-stop-control">
                  <input type="color" value={stop.color}
                    onChange={e => handleColorChange(stop.id, e.target.value)} />
                  <input type="range" min="0" max="100" value={stop.position}
                    onChange={e => handlePositionChange(stop.id, +e.target.value)} />
                  <span className="position-label">{Math.round(stop.position)}%</span>
                  <button onClick={() => removeColorStop(stop.id)} className="remove-btn">✕</button>
                </div>
              ))}
            </div>

            <div className="add-color-stop">
              <input type="color" className="new-color-input"
                value={newColor}
                onChange={e => setNewColor(e.target.value)}
              />
              <button onClick={addColorStop} className="add-btn">+ Add Color Stop</button>
            </div>
          </div>
        </div>

        <div className="output-section">
          <div className="css-output">
            <h3 className="section-title">CSS Code</h3>
            <pre
              ref={preRef}
              contentEditable
              suppressContentEditableWarning
              onInput={onPreInput}
            />
            <button onClick={copyToClipboard} className="copy-btn">Copy CSS</button>
          </div>

          <div className="presets">
            <h3 className="section-title">Presets</h3>
            <div className="preset-grid">
              {[
                'linear-gradient(90deg, rgba(139,92,246,1) 0%, rgba(59,130,246,1) 100%)',
                'linear-gradient(90deg, rgba(236,72,153,1) 0%, rgba(244,63,94,1) 100%)',
                'linear-gradient(90deg, rgba(16,185,129,1) 0%, rgba(20,184,166,1) 100%)',
                'linear-gradient(90deg, rgba(250,204,21,1) 0%, rgba(239,68,68,1) 100%)',
                'linear-gradient(135deg, rgba(17,24,39,1) 0%, rgba(55,65,81,1) 100%)',
                'radial-gradient(circle, rgba(88,28,135,1) 0%, rgba(49,46,129,1) 100%)'
              ].map((g, i) => (
                <div
                  key={i}
                  className="preset-item"
                  style={{ background: g }}
                  onClick={() => applyPreset(g)}
                />
              ))}
            </div>
          </div>

          <div className="export-options">
            <h3 className="section-title">Export</h3>
            <button onClick={downloadPNG} className="export-btn">Download PNG</button>
            <button onClick={savePreset} className="export-btn">Save as Preset</button>
          </div>
        </div>
      </div>
      <GradientyReact />
      <Blob
        className="w-screen h-screen overflow-hidden bg-slate-100 relative"
        size="30vw"
        initialColor="#00C9A7"
        glow={true}
        animate={true}
        speed={3000}
        blend={true}
        controlledShape={null} // pass a path string to control shape externally
      />
    </div>
  );
};

export default GradientMaker;
