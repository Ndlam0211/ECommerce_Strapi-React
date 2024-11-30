import { useEffect, useState } from "react"
import apiCategory from "../../../api/apiCategory"
import apiBrand from "../../../api/apiBrand"
import axiosInstance from "../../../api/axios"
import apiProduct from "../../../api/apiProduct"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function ProductAdd(){
    const [productName,setProductName] = useState('')
    const [slug,setSlug] = useState('')
    const [catId,setCatId] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState(0)
    const [brandId,setBrandId] = useState('')
    const [isOnSale,setIsOnSale] = useState(false)
    const [salePrice,setSalePrice] = useState(null)
    const [image,setImage] = useState(null)

    const [categories,setCategories] = useState([])
    const [brands,setBrands] = useState([])

    const navigate = useNavigate()

    // get categories
    useEffect(() => {
        apiCategory.getAll().then((res) => {
          try {
            const categoriesData = res.data.map((category) => {
              return {
                id: category.id,
                name: category.attributes.category_name,
              };
            });
            setCategories(categoriesData);
          } catch (error) {
            console.log("Failed to fetch categories at product-add: ", error.message);
          }
        });
    },[])

    // get brands
    useEffect(() => {
        apiBrand.getAll().then((res) => {
            try {
                const brandsData = res.data.map((brand) => {
                    return {
                      id: brand.id,
                      name: brand.attributes.brand_name,
                    };
                })
                setBrands(brandsData)
            } catch (error) {
                console.log("Failed to fetch brands at product-add: ",error.message)
            }
        })
    },[])

    // Thực hiện thêm product
    const handleSubmit = async (e) => {
        e.preventDefault()
        // Dữ liệu product cần thêm
        const productData = {
            product_name: productName,
            price: price,
            description:description,
            slug:slug,
            is_on_sale:isOnSale,
            sale_price:salePrice,
            cat_id: catId,
            brand_id: brandId,
            image:[],
            category:catId,
        }

        let file = new FormData()
        file.append("files",image)

        axiosInstance.enableUploadFile();
        axiosInstance.post("/upload",file)
        .then( async (res) => {
            // Lấy id của image trong upload
            const imageId = res.data[0].id
            // push id đó vào image trong dữ liệu của product cần thêm mới
            productData.image.push(imageId)
            // Trở về dạng json
            axiosInstance.enableJson()
            // Thực hiện thêm 
            const response = await apiProduct.createProduct({data : productData})
            // Thông báo cho người dùng
            toast.info(`Added ${productData.product_name} successfully`, {
                position:"top-right",
                autoClose:3000
            })
            navigate("/admin/products/1")
        })
        .catch((error) => {
            // Thông báo cho người dùng nếu lỗi xảy ra
            toast.error(
              `Failed to add ${productData.product_name}: ${error.response.data.error.details.errors[0].message}`,
              {
                position: "top-right",
                autoClose: 3000,
              }
            );
        })
    }

    return (
        <>
            <h1 className="mt-4">Product Management</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Product Add</li>
            </ol>
            <div style={{"width":"500px"}}>
                <form onSubmit={handleSubmit}>
                    <div className="form_group mb-3" >
                        <label for="product_name" className="form-label" >Tên sản phẩm</label>
                        <input type="text" className="form-control" name="product_name" id="product_name" onChange={(e) => setProductName(e.target.value)} required/>
                    </div>
                    <div className="form_group mb-3" >
                        <label for="description" className="form-label" >Mô tả</label>
                        <textarea cols="3" rows="2" className="form-control" name="description" id="description" onChange={(e) => setDescription(e.target.value)}  required></textarea>
                    </div>
                    <div className="form_group mb-3" >
                        <label for="image" className="form-label" >Hình ảnh</label>
                        <input type="file" className="form-control" name="image" id="image" onChange={(e) => setImage(e.target.files[0])} required/>
                    </div>
                    <div className="form_group mb-3" >
                        <label for="cat_id" className="form-label" >Danh mục:</label>
                        <select id="cat_id" name="cat_id" className="form-control" onChange={(e) => setCatId(e.target.value)} required>
                            {
                                categories.map((cate, index) => {
                                    return (
                                        <option key={index} value={cate.id}>
                                            {cate.name}
                                        </option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    <div className="form_group mb-3" >
                        <label for="price" className="form-label" >Giá</label>
                        <input type="text" className="form-control" name="price" id="price" pattern="?\d+(\.\d*)?" title="Enter a number"  onChange={(e) => setPrice(e.target.value)} required/>
                    </div>
                    <div className="form_group mb-3" >
                        <label for="is_on_sale" className="form-label mr-4" >Giảm giá</label>
                        <input type="checkbox" className="form-check-input" name="is_on_sale" id="is_on_sale" onChange={(e) => setIsOnSale(e.target.checked)} checked={isOnSale}/>
                    </div>
                    {
                        isOnSale?
                        <div className="form_group mb-3" >
                            <label for="sale_price" className="form-label" >Giá khuyến mãi</label>
                            <input type="text" className="form-control" name="sale_price" id="sale_price" pattern="?\d+(\.\d*)?" title="Enter a number"  onChange={(e) => setSalePrice(e.target.value)}/>
                        </div>
                        : ""
                    }
                    <div className="form_group mb-3" >
                        <label for="brand_name" className="form-label" >Brand Name</label>
                        <select className="form-control" name="brand_name" id="brand_name"  onChange={(e) => setBrandId(e.target.value)}>
                            {
                                brands.map((brand, index) => {
                                    return (
                                      <option key={index} value={brand.id}>
                                        {brand.name}
                                      </option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    <div className="form_group mb-3" >
                        <label for="slug" className="form-label" >Slug</label>
                        <input type="text" className="form-control" name="slug" id="slug" onChange={(e) => setSlug(e.target.value)}/>
                    </div>
                    <input type="submit" className="btn btn-primary" value="THÊM"></input>
                </form>
            </div>
        </>
    )
}

export default ProductAdd