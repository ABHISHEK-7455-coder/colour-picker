import React, { useState, useCallback } from 'react';
import './GradientyReact.css';

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

  const cssText = useCallback(() => {
    return `linear-gradient(${dir}, ${colors.join(', ')})`;
  }, [dir, colors]);

  const copyCode = () => {
    const code = `${cssText()}`;
    navigator.clipboard.writeText(code);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'center' }}>
      <h1 className="gradient-text" style={{ background: `linear-gradient(${dir}, ${colors.join(', ')})` }}>
        Gradient Text
      </h1>

      <div className="controls">
        <label>
          Direction:
          <select value={dir} onChange={e => setDir(e.target.value)}>
            {DIRECTIONS.map(d => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </label>

        {colors.map((clr, i) => (
          <label key={i}>
            Color stop {i + 1}:
            <input
              type="color"
              value={clr}
              onChange={e => updateColor(i, e.target.value)}
            />
          </label>
        ))}

        <button type="button" onClick={randomize}>🎲 Randomize</button>
        <button type="button" className="copy" onClick={copyCode}>📋 Copy CSS</button>
      </div>
    </div>
  );
}
