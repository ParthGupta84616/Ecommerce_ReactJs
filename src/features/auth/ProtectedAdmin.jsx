import { useSelector } from "react-redux"
import { selectCheckUser } from "./authSlice"
import { Navigate } from "react-router-dom"

function ProtectedAdmin({children}) {
    const user = useSelector(selectCheckUser) 
    if(!user){
        return <Navigate to="/login" /> 
    }
    if(user && user.role!=="admin"){
        return <Navigate to="/" /> 
    }
    else{
      return 
    }
  }
export default ProtectedAdmin