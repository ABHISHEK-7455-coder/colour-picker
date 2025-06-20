import './AppHeader.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '../ThemeContext';
import CustomDropdown from './Dropdown';

const bgColors = ['#ffffff', '#d1d3d7', '#f8f9fa', '#222831', '#282c34'];
const textColors = ['#000000', '#ffffff', '#ff3e3e', '#2d61f2', '#00a676'];

export default function Header({ history }) {
  const navigate = useNavigate();
  const { updateTheme } = useTheme();
  const [showPicker, setShowPicker] = useState(false);

  return (
    <header className="header">
      <div className="headerContainer">
        <div className="logo">Color Picker</div>
        <nav className="navLinks">
          <CustomDropdown />
          <Link to="/">Home</Link>
          <Link to="/upload">Upload</Link>
          <a href="#">Tools</a>
          <a href="#">Sign In</a>
          <button className="themeBtn" onClick={() => setShowPicker(!showPicker)}>
            🎨 Theme
          </button>
          {history.length > 0 && (
            <button className="historyBtn" onClick={() => navigate('/history')}>
              View History
            </button>
          )}
        </nav>
      </div>

      {showPicker && (
        <div className="themePicker">
          <div>
            <strong>Background:</strong>
            <div className="colorOptions">
              {bgColors.map((color) => (
                <div
                  key={color}
                  className="colorCircle"
                  style={{ backgroundColor: color }}
                  onClick={() => updateTheme({ backgroundColor: color })}
                />
              ))}
            </div>
          </div>
          <div>
            <strong>Text:</strong>
            <div className="colorOptions">
              {textColors.map((color) => (
                <div
                  key={color}
                  className="colorCircle"
                  style={{ backgroundColor: color }}
                  onClick={() => updateTheme({ textColor: color })}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
