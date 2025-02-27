import axiosClient from "./axiosClient";

const getScreensByCinemaId = async (cinema_id) => {
  try {
    const res = await axiosClient.post("/screens", { cinema_id });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi gọi Api cinema", error);
  }
};

export { getScreensByCinemaId };
