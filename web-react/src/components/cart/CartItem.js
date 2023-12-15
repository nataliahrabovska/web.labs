import './Cart.css'
import hp from './../../assets/img/hp.png'
import {useEffect, useState} from "react";
import {cartActions} from "../../store/store";
import {useDispatch} from "react-redux";
import { Link } from 'react-router-dom';

export const CartItem = (props) => {
    console.log(props.id)
    const [countOfItems, setCountOfItems] = useState(props.item.countOfSameLaptops)
    const dispatch = useDispatch();
    const handleCountOfItems = (event) => {
        const newCount = event.target.value;
        dispatch(cartActions.changeCountOfItem({item:props.item,count:newCount}))
        setCountOfItems(newCount);
    }

    const linkTo = `/laptop/${props.id}`;

    useEffect(() => {
        setCountOfItems(props.item.countOfSameLaptops)
    }, [props.item.countOfSameLaptops]);

    function deleteFromCart() {
        dispatch(cartActions.deleteFromCart(props.item))
    }

    function addSameItem() {
        dispatch(cartActions.addSameItem(props.item))
    }

    function deleteSameItem() {
        dispatch(cartActions.deleteSameItem(props.item))
    }
    return (
        <>
            <div className="item">
                <div className="buttons">
                    <button onClick={deleteFromCart}>Delete</button>
                </div>
                <div className="image">
                    <img src={hp} alt=""/>
                </div>
                <div className="description">
                    <Link to={linkTo}>
                        <span>{props.model}</span>
                    </Link>
                </div>
                <div className="quantity">
                    <button className="minus-btn" type="button" name="button"
                            onClick={deleteSameItem}>
                        -
                    </button>
                    <input type="number" name="name"
                           value={countOfItems}
                           onChange={handleCountOfItems}
                    />
                    <button className="plus-btn" type="button" name="button"
                            onClick={addSameItem}>
                        +
                    </button>
                </div>
                <div className="total-price">{props.price + "$"} </div>
            </div>
        </>
    )
}