import React, { useState } from 'react';
import './Filters.css';

function Filters({ onApplyFilter }) {
  const [priceFilter, setPriceFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [screenSizeFilter, setScreenSizeFilter] = useState('');

  const handleApplyFilter = () => {
    const filters = {
      price:null,
      company:null,
      screenSize:null
    };
    if (priceFilter !== '') filters.price = parseInt(priceFilter);
    if (companyFilter !== '') filters.company = companyFilter;
    if (screenSizeFilter !== '') filters.screenSize = parseInt( screenSizeFilter);

    onApplyFilter(filters);
  };

  return (
    <div className="filters">
      <input
        className="filter-inp"
        placeholder={'price'}
        type={'text'}
        value={priceFilter}
        onChange={(e) => setPriceFilter(e.target.value)}
      />

      <input
        className="filter-inp"
        placeholder={'company'}
        type={'text'}
        value={companyFilter}
        onChange={(e) => setCompanyFilter(e.target.value)}
      />

      <input
        className="filter-inp"
        placeholder={'screen-size'}
        type={'text'}
        value={screenSizeFilter}
        onChange={(e) => setScreenSizeFilter(e.target.value)}
      />

      <button type="button" onClick={handleApplyFilter}>
        Apply Filters
      </button>
    </div>
  );
}

export default Filters;
