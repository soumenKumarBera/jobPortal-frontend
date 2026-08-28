import { jwtDecode } from "jwt-decode";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";


interface ProectedRouteProps{
  children: JSX.Element;
 allowedRole?: string[];
}


const ProtectedRoute: React.FC<ProectedRouteProps>=({children, allowedRole}) =>{
  const token = useSelector((state:any) => state.jwt);
  if(!token){
    return <Navigate to ="/login" />
  }

  // const decoded:any= jwtDecode(token);
  // if(allowedRole && !allowedRole.includes(decoded.accountType))     return <Navigate to ="/unauthorized" />



  return children;



}

export default ProtectedRoute;