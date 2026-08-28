
import axiosInstance from "../Intercepter/AxiosIntercepter";


const getProfile = async (id:number) => {

  return axiosInstance.get(`/profiles/get/${id}`)
  .then((response) => response.data)
  .catch((error) => {throw error})

}

const updateProfile = async (profile: any) => {

  return axiosInstance.put(`/profiles/update`, profile)
  .then((response) => response.data)
  .catch((error) => {throw error})

}

const getProfileAll = async () => {

  return axiosInstance.get(`/profiles/getAllProfile`)
  .then((response) => response.data)
  .catch((error) => {throw error})

}

export {getProfile, updateProfile, getProfileAll};