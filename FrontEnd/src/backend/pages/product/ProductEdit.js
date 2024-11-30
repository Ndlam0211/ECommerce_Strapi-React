import { useEffect, useState } from "react";
import apiCategory from "../../../api/apiCategory";
import apiBrand from "../../../api/apiBrand";
import axiosInstance from "../../../api/axios";
import apiProduct from "../../../api/apiProduct";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { imageURL } from "../../../api/config";

function ProductEdit() {
    const {slug} = useParams()
  const [productName, setProductName] = useState("");
  const [slugProduct, setSlug] = useState("");
  const [catId, setCatId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [brandId, setBrandId] = useState("");
  const [isOnSale, setIsOnSale] = useState(false);
  const [salePrice, setSalePrice] = useState(null);
  const [image, setImage] = useState('');
  const [imageId,setImageId] = useState(0)
  const [productId,setProductId] = useState(0)

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const navigate = useNavigate()

  // Thực hiện lấy dữ liệu của sản phẩm cần sửa
  useEffect(() => {
    apiProduct.getProductBySlug(slug).then((res) => {
        try {
            const productAttributes = res.data[0].attributes
            setProductName(productAttributes.product_name)
            setProductId(res.data[0].id)
            setSlug(productAttributes.slug);
            setCatId(productAttributes.cat_id);
            setDescription(productAttributes.description);
            setPrice(productAttributes.price);
            setBrandId(productAttributes.brand_id);
            setIsOnSale(productAttributes.is_on_sale);
            setSalePrice(productAttributes.sale_price);
            setImage(productAttributes.image.data.attributes.url);
            setImageId(productAttributes.image.data.id);
        } catch (error) {
            console.log("Error: ",error.message)
        }
    })
  },[slug])

  // Lấy danh sách danh mục
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
        console.log(
          "Failed to fetch categories at product-add: ",
          error.message
        );
      }
    });
  }, []);

  // Lấy danh sách brand
  useEffect(() => {
    apiBrand.getAll().then((res) => {
      try {
        const brandsData = res.data.map((brand) => {
          return {
            id: brand.id,
            name: brand.attributes.brand_name,
          };
        });
        setBrands(brandsData);
      } catch (error) {
        console.log("Failed to fetch brands at product-add: ", error.message);
      }
    });
  }, []);

  // Thực hiện Update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dữ liệu product cần update
    const productData = {
      product_name: productName,
      price: price,
      description: description,
      slug: slug,
      is_on_sale: isOnSale,
      sale_price: salePrice,
      cat_id: catId,
      brand_id: brandId,
      image: [imageId], // id của ảnh cũ, nếu người dùng có cập nhập ảnh mới thì sẽ thay thế bằng id của ảnh mới đó
      category: catId,
    };

    let file = new FormData();
    file.append("files", image);

    const fileObject = file.get("files") // Lấy dữ liệu của file từ FormData
    if(fileObject instanceof File){
        // Người dùng có thay đổi hình ảnh
        if(fileObject !== ""){
            axiosInstance.enableUploadFile()
            // upload file
            const response = await axiosInstance.post("/upload",file)
            // Lấy id của ảnh mới
            const fileId = response.data[0].id
            // Cập nhật lại ảnh mới
            productData.image[0] = fileId
        }
    }else {
        console.log("File be selected is not a file")
    }
    axiosInstance.enableJson();
    // Thực hiện update
    try {
      const response = await apiProduct.updateProduct(productId, {
        data: productData,
      });
      // Thông báo cho người dùng
      toast.info(`Updated ${productData.product_name} successfully`, {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/admin/products/1")
      
    } catch (error) {
       toast.error(`Failed to updated ${productData.product_name}: ${error.response.data.error.message}`, {
         position: "top-right",
         autoClose: 3000,
       });
    }
  };

  return (
    <div>
      <h1 className="mt-4">Product Management</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">Product Edit</li>
      </ol>
      <div style={{ width: "500px" }}>
        <form onSubmit={handleSubmit}>
          <div className="form_group mb-3">
            <label for="product_name" className="form-label">
              Tên sản phẩm
            </label>
            <input
              type="text"
              className="form-control"
              name="product_name"
              id="product_name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="form_group mb-3">
            <label for="description" className="form-label">
              Mô tả
            </label>
            <textarea
              cols="3"
              rows="2"
              className="form-control"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form_group mb-3">
            <label for="image" className="form-label mr-2">
              Hình ảnh:
            </label>
            <img
              style={{ height: "200px" }}
              src={imageURL + image}
              alt={productName}
            ></img>
            <input
              type="file"
              className="form-control mt-3"
              name="image"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="form_group mb-3">
            <label for="cat_id" className="form-label">
              Danh mục:
            </label>
            <select
              id="cat_id"
              name="cat_id"
              className="form-control"
              value={catId}
              onChange={(e) => setCatId(e.target.value)}
            >
              {categories.map((cate, index) => {
                return (
                  <option key={index} value={cate.id}>
                    {cate.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form_group mb-3">
            <label for="price" className="form-label">
              Giá
            </label>
            <input
              type="text"
              className="form-control"
              name="price"
              id="price"
              pattern="?\d+(\.\d*)?"
              title="Enter a number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form_group mb-3">
            <label for="is_on_sale" className="form-label mr-4">
              Giảm giá
            </label>
            <input
              checked={isOnSale}
              type="checkbox"
              className="form-check-input"
              name="is_on_sale"
              id="is_on_sale"
              onChange={(e) => setIsOnSale(e.target.checked)}
            />
          </div>
          {
            isOnSale?

          <div className="form_group mb-3">
            <label for="sale_price" className="form-label">
              Giá khuyến mãi
            </label>
            <input
              type="text"
              className="form-control"
              name="sale_price"
              id="sale_price"
              pattern="?\d+(\.\d*)?"
              title="Enter a number"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
            />
          </div>
            :""
          }
          <div className="form_group mb-3">
            <label for="brand_name" className="form-label">
              Brand Name
            </label>
            <select
              className="form-control"
              name="brand_name"
              id="brand_name"
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
            >
              {brands.map((brand, index) => {
                return (
                  <option key={index} value={brand.id}>
                    {brand.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form_group mb-3">
            <label for="slug" className="form-label">
              Slug
            </label>
            <input
              type="text"
              className="form-control"
              name="slug"
              id="slug"
              value={slugProduct}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary"
            value="UPDATE"
          ></input>
        </form>
      </div>
    </div>
  );
}

export default ProductEdit;
