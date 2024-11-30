import { Link } from "react-router-dom"
import { imageURL } from "../../../api/config"
import { useDispatch } from "react-redux";
import { ADD } from "../../../redux/action/CartAction";

function ProductItem(props) {
    const dispatch = useDispatch()
    const handleAddToCart = () => {
        const product = {
            ...props.product,
            amount: parseInt(1),
        };
        dispatch(ADD(product));
    }

    return (
        <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="product__item" key={props.key}>  
                <div className="product__item__pic set-bg" data-setbg="img/product/product-1.jpg">
                    <img src={imageURL+props.product.image} alt={props.product.name}></img>
                    <ul className="product__item__pic__hover">
                        <li><a href="#"><i className="fa fa-heart"></i></a></li>
                        <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                        <li><a onClick={()=>handleAddToCart()}><i className="fa fa-shopping-cart"></i></a></li>
                    </ul>
                </div>
                <div className="product__item__text">
                    <h6><Link to={`/product-detail/${props.product.slug}`} key={props.key}>{props.product.name}</Link></h6>
                    <h5 key={props.key}>${props.product.price}</h5>
                </div>
            </div>
        </div>
    )
}

export default ProductItem