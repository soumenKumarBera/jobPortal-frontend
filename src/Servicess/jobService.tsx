import axiosInstance from "../Intercepter/AxiosIntercepter";



const postJob = async (job: any) => {
  return axiosInstance
    .post(`/job/post`, job)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

const getAllJobs = async () => {
  return axiosInstance
    .get(`/job/getAll`)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

const getJob = async (id: any) => {
  return axiosInstance
    .get(`/job/get/${id}`)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

const ApplyJob = async (id: any, applicant: any) => {
  return axiosInstance
    .post(`/job/apply/${id}`, applicant)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

const getJobPostedBy = async (id: any) => {
  return axiosInstance
    .get(`/job/postedBy/${id}`)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

const changeAppStatus = async (application: any) => {
  return axiosInstance
    .post(`/job/changeApplicationStatus`, application)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

export { postJob, getAllJobs, getJob, ApplyJob, getJobPostedBy, changeAppStatus };
