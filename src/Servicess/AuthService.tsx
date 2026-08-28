import { jwtDecode } from "jwt-decode";
import axios from "axios"

const baseUrl = "http://localhost:8080/auth/"

const loginAuth = async (login: any) => {

  return axios.post(`${baseUrl}login`, login)
  .then((response) => response.data)
  .catch((error) => {throw error})

}

const navigateToLogin =(navigate:any) =>{
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/login");
}



interface JwtPayload {
  exp: number;
}

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);

    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

export {loginAuth, navigateToLogin, isTokenExpired};