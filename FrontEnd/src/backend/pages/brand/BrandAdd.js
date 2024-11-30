import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiBrand from "../../../api/apiBrand";

export default function BrandAdd() {
    const navigate = useNavigate()
    const [brandName, setBrandName] = useState("")
    const [slug, setSlug] = useState("")
    const [address, setAddress] = useState("")

  // Thực hiện thêm brand
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dữ liệu brand cần thêm
    const brandData = {
      brand_name: brandName,
      slug: slug,
      address: address
    };

    try{
        // Thực hiện thêm
        const response = await apiBrand.createBrand({ data: brandData });
        // Thông báo cho người dùng
        toast.info(`Added ${brandData.brand_name} successfully`, {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/admin/brands/1");
      }
      catch(error) {
        // Thông báo cho người dùng nếu lỗi xảy ra
        toast.error(
          `Failed to add ${brandData.brand_name}: ${error.response.data.error.details.errors[0].message}`,
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      }
  };
  return (
    <div>
      <div>
        <h1 className="mt-4">Brand Management</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active">Brand Add</li>
        </ol>
        <div className="row px-5">
          <div className="col-md-12">
            <h2 style={{ "text-align": "center" }} className="text-success">
              Thêm Brand
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label for="username" className="form-label">
                  Tên nhà cung cấp
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  onChange={(e) => setBrandName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label for="dienthoai" className="form-label">
                  Slug
                </label>
                <input
                  type="text"
                  id="dienthoai"
                  name="phone"
                  className="form-control"
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label for="diachi" className="form-label">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  id="diachi"
                  name="address"
                  className="form-control"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-success" name="submit">
                Thêm
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
