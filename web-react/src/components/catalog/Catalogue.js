import React, { useEffect, useState } from 'react';
import CatalogueCards from './CatalogueCards';
import Loader from '../loader/Loader';
import Filters from './Filters';
import './Catalogue.css';
import { getFilteredLaptops, getLaptops } from '../../services/fetchService';

const Catalogue = () => {
  const [laptops_catalog, setLaptops_catalog] = useState([]);
  const [filteredLaptops, setFilteredLaptops] = useState(laptops_catalog);
  const [itemsToShow, setItemsToShow] = useState(4);
  const [modelSeacrh, setModelSeacrh] = useState('');
  const [filterF, setFilterF] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoaded(false);
        const data = await getLaptops();
        setLaptops_catalog(data);
        setFilteredLaptops(data);
        setIsLoaded(true);
      } catch (error) {
        console.error(error);
        setIsLoaded(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (modelSeacrh === '') {
      setFilteredLaptops(laptops_catalog);
    }
  }, [modelSeacrh, laptops_catalog]);

  const handleApplyFilter = async (filters = {}) => {
    setIsLoaded(false);
    let filteredData = null;
    try {
      filteredData = await getFilteredLaptops(filters);
    } catch (error) {
      console.error(error);
    }

    setFilteredLaptops(filteredData || []);
    setItemsToShow(4);
    setIsLoaded(true);
  };

  const handleModelSearchChange = async (e) => {
    const newModelSearch = e.target.value.toLowerCase();
    setModelSeacrh(newModelSearch);

    let filteredData = null;
    await getFilteredLaptops(filterF).then((data) => {
      filteredData = data;
    });

    const filteredByModel = laptops_catalog.filter((laptop) =>
      laptop.model.toLowerCase().includes(newModelSearch)
    );

    const companySearchFilter = newModelSearch.toLowerCase();
    const filteredByCompany = filteredData.filter((laptop) =>
      laptop.model.toLowerCase().includes(companySearchFilter)
    );
    setFilteredLaptops(filteredByCompany);
    setItemsToShow(4);
  };

  return (
    <div className="catalogue-laptops">
      <div className="head">
        <h3>Catalogue</h3>
        <input
          className={'model'}
          type={'text'}
          placeholder={'Search by model'}
          value={modelSeacrh}
          onChange={handleModelSearchChange}
        />
        <Filters onApplyFilter={handleApplyFilter} />
      </div>
      <div className="cards-container">
        {!isLoaded ? (
          <Loader />
        ) : (
          filteredLaptops.map((laptop) => (
            <CatalogueCards
              key={laptop.id}
              id={laptop.id}
              company={laptop.company}
              model={laptop.model}
              properties={laptop.properties}
              price={laptop.price}
              screenSize={laptop.screenSize}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Catalogue;
