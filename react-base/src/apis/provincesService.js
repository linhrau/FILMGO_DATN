import axiosClient from "./axiosClient"

const getProvinces = async () => {
    const res = await axiosClient.get('/provinces');
    return res.data;
}

export { getProvinces }