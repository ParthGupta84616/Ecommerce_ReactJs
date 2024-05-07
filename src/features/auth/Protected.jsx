import { useSelector } from "react-redux"
import { selectLoggedUser } from "./authSlice"
import { Navigate } from "react-router-dom"


function Protected({children}) {
  const user = useSelector(selectLoggedUser) 
  if(user){
    return children
  }
  else{
    return <Navigate to="/login" /> 
  }
}

export default Protected