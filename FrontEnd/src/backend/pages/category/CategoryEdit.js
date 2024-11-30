import React,{ useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiCategory from "../../../api/apiCategory";
import { toast } from "react-toastify";

function CategoryEdit(){
    const {id} = useParams()
    const [catName, setCatName] = useState("")
    const [parentId, setParentId] = useState(0)
    const [slug, setSlug] = useState("")
    const [status, setStatus] = useState("0")
    const [hasChild, setHasChild] = useState(false)
    const [initialParent,setInitialParent] = useState(0)

    const navigate = useNavigate()

    const [categories, setCategories] = useState([])

    // Lấy dữ liệu của Category cần sửa
    useEffect(() => {
        apiCategory.getCategoryById(id).then((res) => {
            try {
                const catData = res.data.data.attributes

                setCatName(catData.category_name)
                setParentId(catData.parent_id)
                setSlug(catData.slug)
                setStatus(catData.status)
                setHasChild(catData.has_child)
                setInitialParent(catData.parent_id)
            } catch (error) {
                console.log("Error occur when get category that need to edit: ",error.message)
            }
        })
    },[id])

    // Lấy dữ liệu của tất cả Category
    useEffect(() => {
      apiCategory.getAll().then((res) => {
        try {
          const categoriesData = res.data.map((category) => {
            return {
              id: category.id,
              name: category.attributes.category_name,
              parent: category.attributes.parent_id,
              status: category.attributes.status,
              slug: category.attributes.slug,
              hasChild: category.attributes.has_child,
            };
          });
          setCategories(categoriesData);
        } catch (error) {
          console.log("Error: ", error.message);
        }
      });
    }, []);

    // Edit category
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Lấy dữ liệu của cate sau khi người dùng chỉnh sửa
        const category = {
            category_name: catName,
            parent_id: parseInt(parentId),
            slug: slug,
            status: status,
            has_child: hasChild,
        };

        // So sánh cate cha cũ và mới giống nhau hay là khác nhau
        const compare = initialParent!==category.parent_id
        // Nếu cate cha sau khi edit khác cate cha ban đầu thì 
        if (compare) {
          // Thực hiện kiểm tra xem cate sau khi edit có cate cha hay không
          if (category.parent_id !== 0) {
            apiCategory.getCategoryById(category.parent_id).then((res) => {
              try {
                const catData = res.data.data.attributes;
                // Dữ liệu cate cha
                const cate = {
                  category_name: catData.category_name,
                  parent_id: parseInt(catData.parent_id),
                  slug: catData.slug,
                  status: catData.status,
                  has_child: catData.has_child,
                };

                // Thực hiện kiểm tra cate cha mới, has_child đã true hay chưa
                // nếu chưa thì phải sửa has_child của cate cha thành true
                if (!cate.has_child) {
                  cate.has_child = true;
                  // Edit cate cha
                  apiCategory.editCategory(category.parent_id, {
                    data: cate,
                  });
                }
              } catch (error) {
                console.log(
                  "Error occur when get category that need to edit: ",
                  error.message
                );
              }
            });
          }
        }

        // Thực hiện kiểm tra has_child mới sau khi chỉnh sửa là true hay false
        // Nếu true thì phải kiểm tra các cate khác có parent_id là cate này hay không, nếu không có thì không cho chỉnh sửa
        // Nếu false thì phải kiểm tra các cate khác có parent_id là cate này hay không, nếu có thì cũng không được chỉnh sửa

        // Thực hiện edit category
        try {
          const response = await apiCategory.editCategory(id, {
            data: category,
          });

          toast.info(`Edited successfully`, {
            position: "top-right",
            autoClose: 3000,
          });
          navigate("/admin/category/1");
        } catch (error) {
          console.log("Error occur when editing category: ", error.message);
        }
    }

    return (
      <>
        <h1 className="mt-4">Category Management</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active">Category Edit</li>
        </ol>
        <div style={{ width: "300px" }}>
          <form onSubmit={handleSubmit}>
            <div className="form_group" style={{ "margin-bottom": "10px" }}>
              <label for="cate_name" className="form-label">
                Tên danh mục
              </label>
              <input
                type="text"
                className="form-control"
                name="category_name"
                id="category_name"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
              />
            </div>
            <div className="form_group" style={{ "margin-bottom": "10px" }}>
              <label for="parent_id" className="form-label">
                Danh mục cha
              </label>
              <select
                className="form-control"
                name="parent_id"
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
              >
                <option value="0">Không có danh mục cha</option>
                {categories.map((cate, index) => {
                  return (
                    cate.id!=id?
                    cate.parent!=id?
                    <option key={index} value={cate.id}>
                      {cate.name}
                    </option>
                    :""
                    :""
                  );
                })}
              </select>
            </div>
            <div className="form_group" style={{ "margin-bottom": "10px" }}>
              <label for="slug" className="form-label">
                Slug
              </label>
              <input
                type="text"
                className="form-control"
                name="slug"
                id="slug"
                placeholder="Nhập slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <div className="form_group" style={{ "margin-bottom": "10px" }}>
              <label for="status" className="form-label">
                Status
              </label>
              <select
                className="form-control"
                name="status"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="1">Hiển thị</option>
                <option value="0">Không hiển thị</option>
              </select>
            </div>
            <div className="form_group" style={{ "margin-bottom": "10px" }}>
              <label for="has_child" className="form-label">
                Has Child
              </label>
              <select
                className="form-control"
                name="has_child"
                id="has_child"
                value={hasChild}
                onChange={(e) => setHasChild(e.target.value)}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <input
              type="submit"
              className="btn btn-primary"
              value="UPDATE"
            ></input>
          </form>
        </div>
      </>
    );
}

export default CategoryEdit