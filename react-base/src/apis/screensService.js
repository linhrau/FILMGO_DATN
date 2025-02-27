import axiosClient from "./axiosClient";

const getScreensByCinemaId = async (cinema_id) => {
  try {
    const res = await axiosClient.post("/screens", { cinema_id });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi gọi Api screen", error);
  }
};

export { getScreensByCinemaId };
