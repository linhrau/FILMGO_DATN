import axiosClient from "./axiosClient"

const getSeats = async () => {
    const res = await axiosClient.get('/seats');
    return res.data;
}

export { getSeats }