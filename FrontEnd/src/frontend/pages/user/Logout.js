import { useNavigate } from "react-router-dom"
import UserContext from "../../context/UserContext"
import { useContext, useEffect } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { removeUser } from "../../../helpers"

function Logout(){
    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)

    useEffect(()=>{
        setUser("")
        removeUser()
        toast.info("Logout successfully", {
            position: "top-right",
            autoClose:3000,
        })
        navigate("/login")
    })
}

export default Logout