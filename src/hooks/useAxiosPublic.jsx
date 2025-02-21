import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://task-server-ten-theta.vercel.app'
})
const useAxiosPublic = () => {

    return axiosPublic;
};

export default useAxiosPublic;