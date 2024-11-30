import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import apiBrand from "../../../api/apiBrand";

export default function BrandEdit() {
    const {slug} = useParams()
    const navigate = useNavigate();
    const [brandName, setBrandName] = useState("");
    const [slugBrand, setSlug] = useState("");
    const [address, setAddress] = useState("");
  const [brandId, setBrandId] = useState(null);

    useEffect(() => {
        apiBrand.getBrandBySlug(slug).then((res) => {
            try {
                const brandAttribute = res.data[0].attributes;
                setBrandName(brandAttribute.brand_name)
                setSlug(brandAttribute.slug)
                setAddress(brandAttribute.address)
                setBrandId(res.data[0].id);
            } catch (error) {
                console.log("Failed to get brand by slug: ",error.message)
            }
        })
    },[slug])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dữ liệu brand cần update
    const brandData = {
      brand_name: brandName,
      slug: slugBrand,
      address: address,
    };

    try {
      // Thực hiện update
      const response = await apiBrand.updateBrand(brandId,{ data: brandData });
      // Thông báo cho người dùng
      toast.info(`Updated ${brandData.brand_name} successfully`, {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/admin/brands/1");
    } catch (error) {
      // Thông báo cho người dùng nếu lỗi xảy ra
      toast.error(
        `Failed to update ${brandData.brand_name}: ${error.response.data.error.details.errors[0].message}`,
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
          <li className="breadcrumb-item active">Brand Edit</li>
        </ol>
        <div className="row px-5">
          <div className="col-md-12">
            <h2 style={{ "text-align": "center" }} className="text-success">
              Update Brand
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
                  value={brandName}
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
                  value={slugBrand}
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
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-success" name="submit">
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
