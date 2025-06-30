import React, { useState, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './ColorPaletteSearch.css';
import Loader from './Loader'; // Ensure Loader.js + Loader.css are correctly set up
import BottomFooter from '../Footer/BottomFooter';

const ColorPaletteSearch = ({ colorData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [palettes, setPalettes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
              palettes.map((p) => (
                <div key={p.id} className="palette-card">
                  <div className="palette-colors">
                    {p.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="color-box"
                        style={{ backgroundColor: color }}
                        onClick={() => navigator.clipboard.writeText(color)}
                      >
                        <span className="hexTooltip">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-results">
                {searchQuery
                  ? `No palettes found for "${searchQuery}"`
                  : 'No palettes found'}
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
