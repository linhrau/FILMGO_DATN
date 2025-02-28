import axiosClient from "./axiosClient"

const getSeatsByScreenID = async (screen_id) => {
    try{
        const res = await axiosClient.post('/seats', { screen_id });
        return res.data;
    }catch(error){
        console.error("Lỗi khi gọi Api seats", error);
    }
}

const updateSeat = async (id) => {
    try {
      const response = await axiosClient.put(`/seats/${id}`); // Hoặc patch nếu API dùng PATCH
      return response.data;
    } catch (error) {
      console.error("Lỗi khi cập nhật ghế:", error);
      throw error; // Ném lỗi để component xử lý
    }
  };

export { getSeatsByScreenID, updateSeat }