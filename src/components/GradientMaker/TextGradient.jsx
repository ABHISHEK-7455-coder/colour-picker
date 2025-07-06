import React, { useState, useCallback } from 'react';
import './TextGradient.css';

const DIRECTIONS = [
  { label: '→ to right', value: 'to right' },
  { label: '← to left', value: 'to left' },
  { label: '↓ to bottom', value: 'to bottom' },
  { label: '↑ to top', value: 'to top' },
  { label: '↗ to top right', value: 'to top right' },
  { label: '↙ to bottom left', value: 'to bottom left' },
];

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
}

export default function GradientyReact() {
  const [dir, setDir] = useState('to right');
  const [colors, setColors] = useState([randomColor(), randomColor(), randomColor()]);

  const updateColor = (idx, val) =>
    setColors(c => c.map((col, i) => i === idx ? val : col));

  const randomize = () => setColors([randomColor(), randomColor(), randomColor()]);

 const gradient = `linear-gradient(${dir}, ${colors.join(', ')})`;

  const cssText = useCallback(() => {
    return gradient;
  }, [dir, colors]);

  const copyCode = () => {
    const code = `${cssText()}`;
    navigator.clipboard.writeText(code);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'center' }}>
      <div key={gradient}  style={{
    background: cssText(),                     
    WebkitBackgroundClip: 'text',              
    backgroundClip: 'text',                    
    color: 'transparent',                      
    WebkitTextFillColor: 'transparent',        
    display: 'inline-block',  
    width:"100%",
    fontSize: "80px",
    fontWeight: "600",
    fontFamily: "monospace"
    
  }} className="text-gradient">
        Gradient Text
      </div>

      <div className="controls">
        <div className="direction">
        
          <div><h2>Direction :</h2></div>
          <div className='select'>
          <select value={dir} onChange={e => setDir(e.target.value)}>
            {DIRECTIONS.map(d => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
          </div>
        
        </div>
        
        <div className='colors'>
        {colors.map((clr, i) => (
          <label key={i}>
            {/* Color stop {i + 1}: */}
            <input
              type="color"
              value={clr}
              onChange={e => updateColor(i, e.target.value)}
            />
          </label>
        ))}
        </div>

        <button type="button" onClick={randomize}>🎲 Randomize</button>
        <button type="button" className="copy" onClick={copyCode}>📋 Copy CSS</button>
      </div>
    </div>
  );
}