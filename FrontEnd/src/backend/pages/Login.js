import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiUser from "../../api/apiUser";
import { storeAdmin } from "../../helpers";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!email || !password) {
        toast.warning("Email and Password are required", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      const loginData = {
        email: email,
        password: password,
      };
      try {
        // Thực hiện login và lấy response trả về
        const response = await apiUser.loginAdmin(loginData);

        // Lưu admin và jwt vào localStorage
        storeAdmin(response.data.data);

        // Thông báo login success
        toast.info("Login successfully", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/admin");
      } catch (error) {
        toast.error(`${error.response.data.error.message}`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };
  return (
    <div className="bg-primary">
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-5">
                  <div class="card shadow-lg border-0 rounded-lg mt-5">
                    <div class="card-header">
                      <h3 class="text-center font-weight-light my-4">Login</h3>
                    </div>
                    <div class="card-body">
                      <form onSubmit={handleSubmit}>
                        <div class="form-floating mb-3">
                          <input
                            class="form-control"
                            id="inputEmail"
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            onChange={e => setEmail(e.target.value)}
                          />
                          <label for="inputEmail">Email address</label>
                        </div>
                        <div class="form-floating mb-3">
                          <input
                            class="form-control"
                            id="inputPassword"
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                          />
                          <label for="inputPassword">Password</label>
                        </div>
                        <div class="form-check mb-3">
                          <input
                            class="form-check-input"
                            id="inputRememberPassword"
                            type="checkbox"
                            value=""
                          />
                          <label
                            class="form-check-label"
                            for="inputRememberPassword"
                          >
                            Remember Password
                          </label>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <a class="small" href="password.html">
                            Forgot Password?
                          </a>
                          <button
                            type="submit"
                            class="btn btn-primary"
                            name="submit"
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                    <div class="card-footer text-center py-3">
                      <div class="small">
                        <a href="register.php">Need an account? Sign up!</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div id="layoutAuthentication_footer">
          <footer class="py-4 bg-light mt-auto">
            <div class="container-fluid px-4">
              <div class="d-flex align-items-center justify-content-between small">
                <div class="text-muted">
                  Copyright &copy; Nguyễn Đình Lâm 2023
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
