import hp from '../../assets/img/hp.png'
import './LaptopCard.css'

function LaptopCard(props) {
    return(
      <div className="cards">
        <li>
         <img src={hp} alt="" className={'hp'}/>
          <h4>{props.model}</h4>
          <p>{props.properties}</p>
          <p className="price">{props.price + '$'}</p>
        </li>
        </div>
    )
}

export default LaptopCard;