import axiosClient from "./axiosClient"

const getSeats = async () => {
    const res = await axiosClient.get('/seats');
    console.log(res);
}

export { getSeats }