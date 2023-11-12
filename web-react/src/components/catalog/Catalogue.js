import React from 'react';
import CatalogueCards from './CatalogueCards';
import Filters from "./Filters"
import './Catalogue.css';

const laptops_catalog = [
    {
        id: 1,
        model: "HP",
        properties: "15-dw1015ua (2F3G3EA) Silver",
        price: 900
    },
    {
        id: 2,
        model: "Dell",
        properties: "Inspiron 3530",
        price: 870
    },
    {
        id: 3,
        model: "MacBook",
        properties: "Air 13 256GB Space Gray",
        price: 1200
    },
    {
        id: 4,
        model: "Asus",
        properties: "TUF Gaming F15",
        price: 1010
    },
    {
        id: 5,
        model: "HP",
        properties: "15-dw1015ua (2F3G3EA) Silver",
        price: 900
    },
    {
        id: 6,
        model: "Dell",
        properties: "Inspiron 3530",
        price: 870
    },
    {
        id: 7,
        model: "MacBook",
        properties: "Air 13 256GB Space Gray",
        price: 1200
    },
    {
        id: 8,
        model: "Asus",
        properties: "TUF Gaming F15",
        price: 1010
    }
]

const Catalogue = () => {
    return (
        <div className="catalogue-laptops">
            <div className='head'>
                <h3>Catalogue</h3>
                <Filters/>
            </div>
                <div className="cards-container">
                    {laptops_catalog.map(laptops_catalog => (
                        <CatalogueCards
                            key={laptops_catalog.id}
                            model={laptops_catalog.model}
                            properties={laptops_catalog.properties}
                            price={laptops_catalog.price}
                        />
                    ))}
                </div>
        </div>
    );
};

export default Catalogue;

