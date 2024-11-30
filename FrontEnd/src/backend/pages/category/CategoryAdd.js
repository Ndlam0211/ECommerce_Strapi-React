import React, { useEffect, useState } from "react"
import apiCategory from "../../../api/apiCategory";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CategoryAdd(){
    const [catName,setCatName] = useState("")
    const [parentId,setParentId] = useState(0)
    const [slug,setSlug] = useState("")

    const navigate = useNavigate()

    const [categories, setCategories] = useState([]);

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Dữ liệu cate mới
        const cateData = {
            category_name: catName,
            parent_id: parseInt(parentId),
            slug:slug
        }

        // Thực hiện kiểm tra xem cate mới có cate cha hay không
        if(cateData.parent_id !== 0){
              apiCategory.getCategoryById(cateData.parent_id).then((res) => {
                try {
                  const catData = res.data.data.attributes;
                  // Dữ liệu cate cha
                  const cate = {
                    category_name: catData.category_name,
                    parent_id: parseInt(catData.parent_id),
                    slug: catData.slug,
                    status: catData.status,
                    has_child: catData.has_child,
                  }

                  // Thực hiện kiểm tra cate cha, has_child đã true hay chưa
                  // nếu chưa thì phải sửa has_child của cate cha thành true
                  if (!cate.has_child) {
                    cate.has_child = true;
                    // Edit cate cha
                    apiCategory.editCategory(cateData.parent_id, {
                      data: cate,
                    });
                  }
                } catch (error) {
                  console.log(
                    "Error occur when get category that need to add: ",
                    error.message
                  );
                }
              });
        }
        // Thực hiện thêm mới category
        try {
            const response = await apiCategory.createCategory({data:cateData})
            toast.info(`Added ${cateData.category_name} successfully`, {
              position: "top-right",
              autoClose: 3000,
            });
            navigate("/admin/category/1")
        } catch (error) {
            console.log("Error occur when added category: ",error.massage)
        }
    }
    return (
      <>
        <h1 class="mt-4">Category Management</h1>
        <ol class="breadcrumb mb-4">
          <li class="breadcrumb-item active">Category Add</li>
        </ol>
        <div style={{ width: "300px" }}>
          <form onSubmit={handleSubmit}>
            <div class="form_group" style={{ "margin-bottom": "10px" }}>
              <label for="category_name" class="form-label">
                Tên danh mục
              </label>
              <input
                type="text"
                class="form-control"
                name="category_name"
                id="category_name"
                placeholder="Nhập danh mục"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
              />
            </div>
            <div class="form_group" style={{ "margin-bottom": "10px" }}>
              <label for="parent_id" class="form-label">
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
                  return(
                    <option key={index} value={cate.id}>
                      {cate.name}
                    </option>
                  )
                })}
              </select>
            </div>
            <div class="form_group" style={{ "margin-bottom": "10px" }}>
              <label for="slug" class="form-label">
                Slug
              </label>
              <input
                type="text"
                class="form-control"
                name="slug"
                id="slug"
                placeholder="Nhập slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <input type="submit" class="btn btn-primary" value="SUBMIT"></input>
          </form>
        </div>
      </>
    );
}

export default CategoryAdd