import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import apiUser from "../../../api/apiUser"

export default function UserDetail() {
  const {id} = useParams()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  useEffect(() => {
    apiUser.getUserById(id).then((res) => {
      try {
        setUsername(res.username)
        setEmail(res.email)
        setPhone(res.phone)
        setAddress(res.address)
      } catch (error) {
        console.log("Error: ", error.message);
      }
    });
  }, [id])

  return (
    <div>
      <h1 className="mt-4">User Management</h1>
      <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active">User Detail</li>
      </ol>
      <div className="row px-5">
        <div className="col-md-12">
            <h2 style={{"text-align": "center"}} className="text-success">Cập nhật User</h2>
            <form>
                <div className="mb-3">
                    <label for="username" className="form-label">Tên đăng nhập</label>
                    <input type="text" id="username" name="username" className="form-control" value={username}/> 
                </div>
                <div className="mb-3">
                    <label for="email" className="form-label">Email</label>
                    <input type="email" id="email" name="email" className="form-control" value={email}/>
                </div>
                <div className="mb-3">
                    <label for="dienthoai" className="form-label">Điện thoại</label>
                    <input type="text" id="dienthoai" name="phone" className="form-control" value={phone}/>
                </div>
                <div className="mb-3">
                    <label for="diachi" className="form-label">Địa chỉ</label>
                    <input type="text" id="diachi" name="address" className="form-control" value={address}/>
                </div>
                
                <button type="submit" className="btn btn-success" name="submit">Cập Nhật</button>
            </form>
        </div>
      </div>
    </div>
  )
}
