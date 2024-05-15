import { useSelector } from "react-redux"
import { selectCheckUser } from "./authSlice"
import { Navigate } from "react-router-dom"


function Protected({children}) {
  const user = useSelector(selectCheckUser) 
  if(user){
    return children
  }
  else{
    return <Navigate to="/login" /> 
  }
}

export default Protected