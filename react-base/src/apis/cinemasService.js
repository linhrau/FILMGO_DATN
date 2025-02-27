import axiosClient from "./axiosClient";

const getCinemasByProvinceId = async (province_id) => {
  try {
    const res = await axiosClient.post("/cinemas", { province_id });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi gọi Api cinema", error);
  }
};

export { getCinemasByProvinceId };
