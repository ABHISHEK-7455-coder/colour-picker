import React, { useState, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { colorNameToCode } from 'color-name-to-code';
import './ColorPaletteSearch.css';
import Loader from './Loader'; // Ensure Loader.js + Loader.css are correctly set up
import BottomFooter from '../Footer/BottomFooter';

const ColorPaletteSearch = ({ colorData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [palettes, setPalettes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
   const [tooltip, setTooltip] = useState({ visible: false, color: '' });

  const allPalettes = useMemo(
    () =>
      Object.entries(colorData.Palettes).map(([id, p]) => ({
        id,
        colors: p.colors,
        category_id: p.category_id,
      })),
    [colorData.Palettes]
  );

  // ✅ Use useRef + lodash.debounce to create a stable debounced function
  const debouncedSearch = useRef(
    _.debounce((query, categoryId) => {
      setIsLoading(true);

      setTimeout(() => {
        const q = query.toLowerCase().trim();
         let hexFromName = '';
        try {
          if (q && !q.startsWith('#') && isNaN(parseInt(q,16))) {
            hexFromName = colorNameToCode(q, { lowercase: true });
          }
        } catch {}
        const results = allPalettes.filter((p) => {
          const matchQuery =
            !q ||
            p.id.toLowerCase().includes(q) ||
            p.colors.some((c) => c.toLowerCase().includes(q)); // substring match
          const matchCategory = !categoryId || p.category_id === categoryId;
          return matchQuery && matchCategory;
        });

        setPalettes(results);
        setIsLoading(false);
      }, 300); // artificial delay for visibility
    }, 300)
  ).current;

  // 🔁 Trigger search on input/category change
  useEffect(() => {
    debouncedSearch(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory, debouncedSearch]);

  // Manual search submission
  const handleSearch = (e) => {
    e.preventDefault();
    debouncedSearch(searchQuery, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color).then(() => {
      setTooltip({ visible: true, color });
      setTimeout(() => setTooltip({ visible: false, color: '' }), 1500);
    });
  };

  return (
    <>
      <div className="color-palette-search">
        <h1>Search All Cool Palettes</h1>
        <p>Color is the element that has the greatest impact on our emotions</p>

        <form className="search-controls">
          <div className="search-section">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by color name or hex code..."
              aria-label="Search color palettes"
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="results-grid">
            {palettes.length > 0 ? (
              palettes.map((palette) => (
                <div key={palette.id} className="palette-card">
                  <div className="palette-colors">
                    {palette.colors.map((color, index) => (
                      <div
                        key={index}
                        className="color-box"
                        style={{ backgroundColor: color }}
                        title={color}
                        aria-label={`Color ${color}`}
                        onClick={() => copyToClipboard(color)}
                        onMouseEnter={() => setTooltip({ visible: true, color })}
                        onMouseLeave={() => setTooltip({ visible: false, color: '' })}
                      >
                        <div className={`hexTooltip ${tooltip.visible && tooltip.color === color ? 'visible' : ''}`}>
                          {color}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* <div className="palette-info">
                    <p className="palette-category">{palette.category}</p>
                  </div> */}
                </div>
              ))
            ) : (
              <p className="no-results">
                {searchQuery ? `No palettes found for "${searchQuery}"` : 'No palettes found'}
              </p>
            )}
          </div>
        )}
      </div>
      <BottomFooter />
    </>
  );
};

ColorPaletteSearch.propTypes = {
  colorData: PropTypes.shape({
    categories: PropTypes.object.isRequired,
    Palettes: PropTypes.object.isRequired,
    colorNames: PropTypes.object,
  }).isRequired,
};

export default ColorPaletteSearch;
