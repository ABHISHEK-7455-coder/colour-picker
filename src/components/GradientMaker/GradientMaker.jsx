import { useState, useEffect } from 'react';
import './GradientMaker.css';
import Footer from '../Footer/Footer';

export default function GradientMaker() {
  const [stops, setStops] = useState([
    { color: '#398C7D', pos: 0 },
    { color: '#425747', pos: 50 },
  ]);
  const [angle, setAngle] = useState(90);
  const [mode, setMode] = useState('linear');
  const [customInput, setCustomInput] = useState('');
  const [gradientCSS, setGradientCSS] = useState('');


  useEffect(() => {
    if (!customInput) {
      const built = mode === 'linear'
        ? `linear-gradient(${angle}deg, ${stops.map(s => `${s.color} ${s.pos}%`).join(', ')})`
        : `radial-gradient(circle, ${stops.map(s => `${s.color} ${s.pos}%`).join(', ')})`;
      setGradientCSS(built);
    }
  }, [stops, angle, mode, customInput]);

  const updateStop = (i, key, val) => {
    setStops(arr => {
      const next = [...arr];
      next[i] = { ...next[i], [key]: key === 'pos' ? +val : val };
      return next;
    });
    setCustomInput('');
  };

  const applyCustom = () => {
    const trimmed = customInput.trim();
    if (trimmed) {
      setGradientCSS(trimmed);
    }
  };


  return (
    <>
      <div className="gm-container">
        <div className="gm-toggle">
          <button onClick={() => { setMode('linear'); setCustomInput(''); }} className={mode === 'linear' ? 'active' : ''}>Linear</button>
          <button onClick={() => { setMode('radial'); setCustomInput(''); }} className={mode === 'radial' ? 'active' : ''}>Radial</button>
        </div>

        {mode === 'linear' && (
          <label className="gm-angle">
            Angle:
            <input type="range" min="0" max="360" value={angle}
              onChange={e => { setAngle(+e.target.value); setCustomInput(''); }} />
            {angle}°
          </label>
        )}


        <div className="gm-preview" style={{ background: gradientCSS }} />

        <div className="gm-controls">
          {stops.map((s, i) => (
            <div key={i} className="gm-stop">
              <input type="color" value={s.color}
                onChange={e => updateStop(i, 'color', e.target.value)} />
              <input type="range" min="0" max="100" value={s.pos}
                onChange={e => updateStop(i, 'pos', e.target.value)} />
              <span>{s.pos}%</span>
            </div>
          ))}
        </div>

        <div style={{ alignItems: 'center', gap: '8px' }}>
          <textarea className="gm-css" readOnly rows={2}
            value={`${gradientCSS};`} />
          <button onClick={() => {
            navigator.clipboard.writeText(`background: ${gradientCSS};`);
          }} className='btnGray'>Copy CSS</button>
        </div>

        <div style={{ marginTop: '16px' }}>
          <label style={{ color: "#fff" }}>Paste any gradient :</label>
          <textarea
            className="gm-css2"
            rows={2}
            placeholder="e.g. linear-gradient(45deg, red, yellow)"
            value={customInput}
            onChange={e => setCustomInput(e.target.value)}
          />
          <button type="button" className='btnGray2' onClick={applyCustom}>Preview Custom</button>
        </div>
      </div>


      <Footer />

    </>

  );
}


// import { useState } from 'react';
// import './GradientMaker.css';
// import Footer from '../Footer/Footer';

// export default function GradientMaker() {
//   const [gradientCSS, setGradientCSS] = useState('linear-gradient(90deg, #398C7D 0%, #425747 50%)');
//   const [editingCSS, setEditingCSS] = useState(gradientCSS);
//   const [isEditing, setIsEditing] = useState(false);

//   const toggleEdit = () => setIsEditing(edit => {
//     if (!edit) setEditingCSS(gradientCSS);
//     return !edit;
//   });

//   const applyCSS = () => {
//     if (/^(linear|radial)-gradient/.test(editingCSS.trim())) {
//       setGradientCSS(editingCSS.trim());
//       setIsEditing(false);
//     } else {
//       alert('Enter valid gradient CSS starting with linear‑gradient or radial‑gradient');
//     }
//   };

//   const copyCSS = () => {
//     navigator.clipboard.writeText(`background: ${gradientCSS};`);
//   };

//   return (
//     <>
//       <div className="gm-container">
//         <div className="gm-preview" style={{ background: gradientCSS }} />

//         <textarea
//           className="gm-css"
//           rows={2}
//           value={editingCSS}
//           readOnly={!isEditing}
//           onChange={e => isEditing && setEditingCSS(e.target.value)}
//         />

//         <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
//           <button onClick={toggleEdit} className="btnGray2">
//             {isEditing ? 'Cancel' : 'Edit CSS'}
//           </button>

//           {isEditing ? (
//             <button onClick={applyCSS} className="btnGray2">Apply</button>
//           ) : (
//             <button onClick={copyCSS} className="btnGray">Copy CSS</button>
//           )}
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }


// import { useState, useEffect } from 'react';
// import './GradientMaker.css';
// import Footer from '../Footer/Footer';

// export default function GradientMaker() {
//   const [stops, setStops] = useState([
//     { color: '#398C7D', pos: 0 },
//     { color: '#425747', pos: 50 },
//   ]);
//   const [angle, setAngle] = useState(90);
//   const [mode, setMode] = useState('linear');

//   const [editingCSS, setEditingCSS] = useState('');
//   const [gradientCSS, setGradientCSS] = useState(
//     'linear-gradient(90deg, #398C7D 0%, #425747 50%)'
//   );
//   const [isEditing, setIsEditing] = useState(false);

//   // Rebuild gradient when using built-in controls
//   useEffect(() => {
//     if (!isEditing) {
//       const built =
//         mode === 'linear'
//           ? `linear-gradient(${angle}deg, ${stops
//               .map(s => `${s.color} ${s.pos}%`)
//               .join(', ')})`
//           : `radial-gradient(circle, ${stops
//               .map(s => `${s.color} ${s.pos}%`)
//               .join(', ')})`;
//       setGradientCSS(built);
//       setEditingCSS(built);
//     }
//   }, [stops, angle, mode, isEditing]);

//   const updateStop = (i, key, val) => {
//     setStops(prev => {
//       const arr = [...prev];
//       arr[i] = { ...arr[i], [key]: key === 'pos' ? +val : val };
//       return arr;
//     });
//     setIsEditing(false);
//   };

//   const toggleEdit = () => {
//     setIsEditing(edit => {
//       if (!edit) setEditingCSS(gradientCSS);
//       return !edit;
//     });
//   };

//   const applyCSS = () => {
//     const trimmed = editingCSS.trim();
//     if (/^(linear|radial)-gradient/.test(trimmed)) {
//       setGradientCSS(trimmed);
//       setIsEditing(false);
//     } else {
//       alert('Invalid gradient! Must start with linear‑gradient(...) or radial‑gradient(...)');
//     }
//   };

//   const copyCSS = () => {
//     navigator.clipboard.writeText(`background: ${gradientCSS};`);
//   };

//   return (
//     <>
//       <div className="gm-container">
//         {/* Mode switch */}
//         <div className="gm-toggle">
//           <button
//             onClick={() => { setMode('linear'); setIsEditing(false); }}
//             className={mode === 'linear' ? 'active' : ''}
//           >
//             Linear
//           </button>
//           <button
//             onClick={() => { setMode('radial'); setIsEditing(false); }}
//             className={mode === 'radial' ? 'active' : ''}
//           >
//             Radial
//           </button>
//         </div>

//         {/* Angle (only for linear) */}
//         {mode === 'linear' && (
//           <label className="gm-angle">
//             Angle:
//             <input
//               type="range" min="0" max="360" value={angle}
//               onChange={e => { setAngle(+e.target.value); setIsEditing(false); }}
//             />
//             {angle}°
//           </label>
//         )}

//         {/* Gradient preview */}
//         <div className="gm-preview" style={{ background: gradientCSS }} />

//         {/* Color stop sliders */}
//         <div className="gm-controls">
//           {stops.map((s, i) => (
//             <div key={i} className="gm-stop">
//               <input
//                 type="color" value={s.color}
//                 onChange={e => updateStop(i, 'color', e.target.value)}
//               />
//               <input
//                 type="range"
//                 min="0"
//                 max="100"
//                 value={s.pos}
//                 onChange={e => updateStop(i, 'pos', e.target.value)}
//               />
//               <span>{s.pos}%</span>
//             </div>
//           ))}
//         </div>

//         {/* Unified CSS editor */}
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
//           <textarea
//             className="gm-css"
//             rows={2}
//             value={editingCSS}
//             readOnly={!isEditing}
//             onChange={e => setEditingCSS(e.target.value)}
//           />

//           <div style={{ display: 'flex', gap: '8px' }}>
//             <button onClick={toggleEdit} className="btnGray2">
//               {isEditing ? 'Cancel' : 'Edit CSS'}
//             </button>

//             {isEditing ? (
//               <button onClick={applyCSS} className="btnGray2">Apply</button>
//             ) : (
//               <button onClick={copyCSS} className="btnGray">Copy CSS</button>
//             )}
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }
