import product1 from '../../../assets/img/latest-product/lp-1.jpg'
import product2 from '../../../assets/img/latest-product/lp-2.jpg'
import product3 from '../../../assets/img/latest-product/lp-3.jpg'
import React, {useEffect,useState} from 'react'
import LastestItem from './LastestItem'
import apiProduct from '../../../../api/apiProduct'

function LastestProduct() {
    // Lấy 3 sản phẩm mới nhất
    const [products,setProducts] = useState([])
    useEffect(() => {
        apiProduct.get3LastestProduct().then((res) => {
            try {
                const productData = res.data.map((product) => {
                    return {
                        id: product.id,
                        name: product.attributes.product_name,
                        price: product.attributes.price,
                        description: product.attributes.description,
                        slug: product.attributes.slug,
                        image: product.attributes.image.data.attributes.url,
                    }
                })
                setProducts(productData)
            } catch (error) {
                console.log("Error: ",error.message)
            }
        })
    }, [])

    // Lấy 3 sản phẩm khuyến mãi
    const [saleProducts,setSaleProducts] = useState([])
    useEffect(() => {
        apiProduct.get3SaleOffProduct().then((res) => {
            try {
                const productData = res.data.map((product) => {
                    return {
                        id: product.id,
                        name: product.attributes.product_name,
                        price: product.attributes.price,
                        description: product.attributes.description,
                        slug: product.attributes.slug,
                        image: product.attributes.image.data.attributes.url,
                    }
                })
                setSaleProducts(productData)
            } catch (error) {
                console.log("Error: ",error.message)
            }
        })
    }, [])
    return (
        <section className="latest-product spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="latest-product__text">
                            <h4>Latest Products</h4>
                          
                            <div className="latest-product__slider">
                                <div className="latest-prdouct__slider__item">
                                    {
                                        products.map((product,index) => {
                                            return (
                                                <LastestItem key={index} product={product}/>
                                            )
                                        })
                                    }
                                    {/* <a href="#" className="latest-product__item">
                                        <div className="latest-product__item__pic">
                                            <img src={product1} alt="" />
                                        </div>
                                        <div className="latest-product__item__text">
                                            <h6>Crab Pool Security</h6>
                                            <span>$30.00</span>
                                        </div>
                                    </a>
                                    <a href="#" className="latest-product__item">
                                        <div className="latest-product__item__pic">
                                            <img src={product2} alt="" />
                                        </div>
                                        <div className="latest-product__item__text">
                                            <h6>Crab Pool Security</h6>
                                            <span>$30.00</span>
                                        </div>
                                    </a>
                                    <a href="#" className="latest-product__item">
                                        <div className="latest-product__item__pic">
                                            <img src={product1} alt="" />
                                        </div>
                                        <div className="latest-product__item__text">
                                            <h6>Crab Pool Security</h6>
                                            <span>$30.00</span>
                                        </div>
                                    </a> */}
                                </div>
                                <div className="latest-prdouct__slider__item">
                                    {/* <a href="#" className="latest-product__item">
                                        <div className="latest-product__item__pic">
                                            <img src={product1} alt="" />
                                        </div>
                                        <div className="latest-product__item__text">
                                            <h6>Crab Pool Security</h6>
                                            <span>$30.00</span>
                                        </div>
                                    </a>
                                    <a href="#" className="latest-product__item">
                                        <div className="latest-product__item__pic">
                                            <img src={product2} alt="" />
                                        </div>
                                        <div className="latest-product__item__text">
                                            <h6>Crab Pool Security</h6>
                                            <span>$30.00</span>
                                        </div>
                                    </a>
                                    <a href="#" className="latest-product__item">
                                        <div className="latest-product__item__pic">
                                            <img src={product3} alt="" />
                                        </div>
                                        <div className="latest-product__item__text">
                                            <h6>Crab Pool Security</h6>
                                            <span>$30.00</span>
                                        </div>
                                    </a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="latest-product__text">
                            <h4>Sale Off Products</h4>
                            <div className="latest-product__slider">
                                <div className="latest-prdouct__slider__item">
                                    {
                                        saleProducts.map((product,index) => {
                                            return (
                                                <LastestItem key={index} product={product}/>
                                            )
                                        })
                                    }
                                    {/* <a href="#" className="latest-product__item">
                                        <div className="latest-product__item__pic">
                                            <img src={product1} alt="" />
                                        </div>
                                        <div className="latest-product__item__text">
                                            <h6>Crab Pool Security</h6>
                                            <span>$30.00</span>
                                        </div>
                                    </a>
                                    <a href="#" className="latest-product__item">
                                        <div className="latest-product__item__pic">
                                            <img src={product2} alt="" />
                                        </div>
                                        <div className="latest-product__item__text">
                                            <h6>Crab Pool Security</h6>
                                            <span>$30.00</span>
                                        </div>
                                    </a>
                                    <a href="#" className="latest-product__item">
                                        <div className="latest-product__item__pic">
                                            <img src={product3} alt="" />
                                        </div>
                                        <div className="latest-product__item__text">
                                            <h6>Crab Pool Security</h6>
                                            <span>$30.00</span>
                                        </div>
                                    </a> */}
                                </div>
                                {/* <div className="latest-prdouct__slider__item">
                                    <a href="#" className="latest-product__item">
                                        <div className="latest-product__item__pic">
                                            <img src={product1} alt="" />
                                        </div>
                                        <div className="latest-product__item__text">
                                            <h6>Crab Pool Security</h6>
                                            <span>$30.00</span>
                                        </div>
                                    </a>
                                    <a href="#" className="latest-product__item">
                                        <div className="latest-product__item__pic">
                                            <img src={product2} alt="" />
                                        </div>
                                        <div className="latest-product__item__text">
                                            <h6>Crab Pool Security</h6>
                                            <span>$30.00</span>
                                        </div>
                                    </a>
                                    <a href="#" className="latest-product__item">
                                        <div className="latest-product__item__pic">
                                            <img src={product3} alt="" />
                                        </div>
                                        <div className="latest-product__item__text">
                                            <h6>Crab Pool Security</h6>
                                            <span>$30.00</span>
                                        </div>
                                    </a>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="latest-product__text">
                            <h4>Review Products</h4>
                            <div className="latest-product__slider">
                                <div className="latest-prdouct__slider__item">
                                    <a href="#" className="latest-product__item">
                                        <div className="latest-product__item__pic">
                                            <img src={product1} alt="" />
                                        </div>
                                        <div className="latest-product__item__text">
                                            <h6>Crab Pool Security</h6>
                                            <span>$30.00</span>
                                        </div>
                                    </a>
                                    <a href="#" className="latest-product__item">
                                        <div className="latest-product__item__pic">
                                            <img src={product2} alt="" />
                                        </div>
                                        <div className="latest-product__item__text">
                                            <h6>Crab Pool Security</h6>
                                            <span>$30.00</span>
                                        </div>
                                    </a>
                                    <a href="#" className="latest-product__item">
                                        <div className="latest-product__item__pic">
                                            <img src={product3} alt="" />
                                        </div>
                                        <div className="latest-product__item__text">
                                            <h6>Crab Pool Security</h6>
                                            <span>$30.00</span>
                                        </div>
                                    </a>
                                </div>
                                {/* <div className="latest-prdouct__slider__item">
                                    <a href="#" className="latest-product__item">
                                        <div className="latest-product__item__pic">
                                            <img src={product1} alt="" />
                                        </div>
                                        <div className="latest-product__item__text">
                                            <h6>Crab Pool Security</h6>
                                            <span>$30.00</span>
                                        </div>
                                    </a>
                                    <a href="#" className="latest-product__item">
                                        <div className="latest-product__item__pic">
                                            <img src={product2} alt="" />
                                        </div>
                                        <div className="latest-product__item__text">
                                            <h6>Crab Pool Security</h6>
                                            <span>$30.00</span>
                                        </div>
                                    </a>
                                    <a href="#" className="latest-product__item">
                                        <div className="latest-product__item__pic">
                                            <img src={product3} alt="" />
                                        </div>
                                        <div className="latest-product__item__text">
                                            <h6>Crab Pool Security</h6>
                                            <span>$30.00</span>
                                        </div>
                                    </a>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LastestProduct