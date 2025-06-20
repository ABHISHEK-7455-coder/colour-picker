import React, { useState, useRef, useEffect } from 'react';
import ColorPickerButton from '../ColorPicker';

// Example components to render
const ComponentA = () => <div style={{ padding: 20 }}><ColorPickerButton /></div>;
const ComponentB = () => <div style={{ padding: 20 }}>🟣 Component B Content</div>;
const ComponentC = () => <div style={{ padding: 20 }}>🔵 Component C Content</div>;

// The dropdown dropdown
const CustomDropdown = () => {
  const options = [
    { label: 'Color Picker', value: 'A', component: ComponentA },
    { label: 'Option B', value: 'B', component: ComponentB },
    { label: 'Option C', value: 'C', component: ComponentC },
  ];

  const [selectedValue, setSelectedValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const SelectedComponent = options.find(o => o.value === selectedValue)?.component;

  return (
    <div ref={dropdownRef} style={{ position: 'relative', width: 200 }}>
      <button
        onClick={() => setIsOpen(open => !open)}
        style={{
          width: '100%',
          padding: '10px',
          cursor: 'pointer',
          background: '#fff',
          border: '1px solid #ccc',
          textAlign: 'left',
        }}
      >
        {selectedValue
          ? options.find(o => o.value === selectedValue).label
          : 'Select option...'}
        <span style={{ float: 'right' }}>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            margin: 0,
            padding: 0,
            listStyle: 'none',
            background: '#fff',
            border: '1px solid #ccc',
            maxHeight: 150,
            overflowY: 'auto',
            zIndex: 10,
          }}
        >
          {options.map(opt => (
            <li key={opt.value}>
              <button
                onClick={() => {
                  setSelectedValue(opt.value);
                  setIsOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: 20 }}>
        {SelectedComponent && <SelectedComponent />}
      </div>
    </div>
  );
};

export default CustomDropdown;
