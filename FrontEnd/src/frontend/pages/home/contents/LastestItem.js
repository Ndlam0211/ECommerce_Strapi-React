import { Link } from "react-router-dom"
import { imageURL } from "../../../../api/config"

function LastestItem(props) {
    return (
        <Link to={`/product-detail/${props.product.slug}`} className="latest-product__item" key={props.key}>
            <div className="latest-product__item__pic">
                <img src={imageURL+props.product.image} alt={props.product.name} />
            </div>
            <div className="latest-product__item__text">
                <h6>{props.product.name}</h6>
                <span>${props.product.price}</span>
            </div>
        </Link>
    )
}

export default LastestItem