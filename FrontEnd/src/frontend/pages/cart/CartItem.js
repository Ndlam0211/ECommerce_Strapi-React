import { useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { REMOVE,DECREASE,INCREASE } from "../../../redux/action/CartAction";
import { imageURL } from "../../../api/config";
import { useState } from "react";

function CartItem(props) {
    const [quantity,setQuantity] = useState(props.item.quantity)

    const dispatch = useDispatch()

    const removeItem = (item) => {
        dispatch(REMOVE(item))
    }

    const decrease = () => {
        if (quantity>1) {
            setQuantity(quantity - 1);
            dispatch(DECREASE(props.item))
        }
    }

    const increase = () => {
        setQuantity(quantity+1)
        dispatch(INCREASE(props.item));
    }

    console.log(quantity);

    return (
        <tr>
            <td className="shoping__cart__item">
                <img src={imageURL+props.item.image} alt=""/>
                <h5>{props.item.name}</h5>
            </td>
            <td className="shoping__cart__price">
                ${props.item.price}
            </td>
            <td className="shoping__cart__quantity">
                <div className="quantity">
                    <div className="input-group-btn">
                        <button className="btn btn-primary btn-minus" onClick={()=>decrease()}>
                            <i className="fa fa-minus"></i>
                        </button>
                    </div>
                    <div className="pro-qty">
                        <input type="text" value={quantity} min='1' onChange={(e) => setQuantity(e.target.value)}/>
                    </div>
                    <div className="input-group-btn">
                        <button className="btn btn-primary btn-plus" onClick={()=>increase()}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
            </td>
            <td className="shoping__cart__total">
                ${props.item.price*props.item.quantity}
            </td>
            <td className="shoping__cart__item__close">
                <FaTrash onClick={() => removeItem(props.item)}></FaTrash>
            </td>
        </tr>
    )
}

export default CartItem