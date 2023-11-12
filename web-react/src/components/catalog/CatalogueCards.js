import './CatalogueCards.css';
import hp from '../../assets/img/hp.png'



function CatalogueCards(props) {
    return(
      <div className="catalog-cards">
        <li>
          <img src={hp} alt="" className={'hp'}/>
          <h4>{props.model}</h4>
          <p>{props.properties}</p>
          <p className="price">{props.price + '$'}</p>
        </li>
        </div>
    )
}

export default CatalogueCards;