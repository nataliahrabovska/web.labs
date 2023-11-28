import React from 'react';
import { Link } from 'react-router-dom';
import './CatalogueCards.css';
import hp from '../../assets/img/hp.png';

function CatalogueCards(props) {
  const linkTo = `/laptop/${props.id}`;

  return (
    <div className="catalog-cards">
      <li>
        <img src={hp} alt="" className={'hp'} />
        <h4>{props.company}</h4>
        <p>{props.model}</p>
        <p>{props.properties}</p>
        <p className="screen-size">Screen Size: {props.screenSize} </p>
        <p className="price">{props.price + '$'}</p>
        <Link to={linkTo} className="view-more-button">
          View more
        </Link>
      </li>
    </div>
  );
}

export default CatalogueCards;
