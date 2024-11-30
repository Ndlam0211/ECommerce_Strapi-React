import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiUser from "../../../api/apiUser";
import { toast } from "react-toastify";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [delUserItem, setDelUserItem] = useState(null);

    // Lấy user có phân trang
    useEffect(() => {
      apiUser.getAll().then((res) => {
        try {
          const usersData = res.map((user) => {
            return {
              id: user.id,
              username: user.username,
              email: user.email,
              phone: user.phone,
              address: user.address,
            };
          });
          setUsers(usersData);
        } catch (error) {
          console.log("Failed to get user list: ", error.message);
        }
      });
    }, [delUserItem]);

    const delUser = (id) => {
      apiUser.delUserById(id).then((res) => {
        try {
          toast.info("Delete user successfully", {
            position: "top-right",
            autoClose: 3000,
          });
          setDelUserItem(id)
        } catch (error) {
          toast.error("Failed to delete user", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      });
    };

  return (
    <div>
      <h1 className="mt-4">User Management</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">User List</li>
      </ol>
      <div style={{ margin: "20px 0" }}>
        <div>
          <Link>
            <button type="button" classNameName="btn btn-primary">
              Thêm
            </button>
          </Link>
        </div>
      </div>
      <table className="table table-bordered">
        <tr>
          <th>ID</th>
          <th>Tên người dùng</th>
          <th>Email</th>
          <th>Điện thoại</th>
          <th>Địa chỉ</th>
          <th>Sửa</th>
          <th>Xóa</th>
        </tr>
          {
              users.map((user) => {
                return (
                    <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                    <td>
                        <Link to={`/admin/user-detail/${user.id}`}>
                        <button type="button" className="btn btn-warning rounded">
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        </Link>
                    </td>
                    <td>
                        <a>
                        <button
                            type="button"
                            className="btn btn-danger rounded"
                            onClick={(e) => delUser(user.id)}
                        >
                            <i className="fa-solid fa-trash"></i>
                        </button>
                        </a>
                    </td>
                    </tr>
                )
            })
          }
      </table>
    </div>
  );
}
