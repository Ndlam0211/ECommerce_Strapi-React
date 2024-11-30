import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiUser from '../../../api/apiUser';
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function Signup(){
    const [user,setUser] = useState({username:'',email:'',password:'',phone:'',address:''})

    const navigate = useNavigate()

    const signUp = async (e)=>{
        e.preventDefault()
        try {
            if(!user.username){
                toast.warning("username is required", {
                  position: "top-right",
                  autoClose: 3000,
                });
                return
            }else if (!user.email) {
                 toast.warning("email is required", {
                   position: "top-right",
                   autoClose: 3000,
                 });
                 return;
            }else if (!user.password) {
                 toast.warning("password is required", {
                   position: "top-right",
                   autoClose: 3000,
                 });
                 return;
            }
            const response = await apiUser.createUser(user)
            toast.info("Signup successfully", {
                position: "top-right",
                autoClose:3000,
            })
            navigate("/login")
        } catch (error) {
            toast.error(
              `${error.response.data.error.message}`,
              {
                position: "top-right",
                autoClose: 3000,
              }
            );
        }
    }

    const handleUserChange = ({target})=>{
        const {name,value} = target
        setUser((currentUser)=>({
            ...currentUser,
            [name]:value
        }))
    }
    return (
        <section class="vh-100 bg-image"
            style={{"background-image": "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')"}}>
            <div class="mask d-flex align-items-center h-100 gradient-custom-3">
                <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                    <div class="card" style={{"border-radius": "15px"}}>
                        <div class="card-body p-5">
                        <h2 class="text-uppercase text-center mb-5">Create an account</h2>
                        <form onSubmit={signUp}>
                            <div data-mdb-input-init class="form-outline mb-2">
                            <label class="form-label" for="form3Example1cg">Username</label>
                            <input type="text" id="form3Example1cg" name="username" class="form-control form-control-lg" placeholder="username" value={user.username} onChange={handleUserChange}/>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-2">
                            <label class="form-label" for="form3Example3cg">Email</label>
                            <input type="email" id="form3Example3cg" name="email" class="form-control form-control-lg" placeholder="email" value={user.email} onChange={handleUserChange}/>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-2">
                            <label class="form-label" for="form3Example4cg">Password</label>
                            <input type="password" id="form3Example4cg" name="password" class="form-control form-control-lg" placeholder="password" value={user.password} onChange={handleUserChange}/>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-2">
                            <label class="form-label" for="form3Examplecdg">Address</label>
                            <input type="text" id="form3Examplecdg" name="address" class="form-control form-control-lg" placeholder="address" value={user.address} onChange={handleUserChange}/>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-2">
                            <label class="form-label" for="form3Example4cdg">Phone</label>
                            <input type="text" id="form3Example4cdg" name="phone" class="form-control form-control-lg" placeholder="phone" value={user.phone} onChange={handleUserChange}/>
                            </div>

                            <div class="d-flex justify-content-center">
                            <button  type="submit" class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                            </div>
                        </form>

                            <p class="text-center text-muted mt-4 mb-0">Have already an account? 
                                <Link to={"/login"}><u className='ml-1'>Login here</u></Link></p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}

export default Signup