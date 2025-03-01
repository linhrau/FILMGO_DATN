import { useState } from "react";
import PropTypes from "prop-types";
import seatVIPImage from "@/assets/images/Seat.png";
import setNormalImage from "@/assets/images/seatnormal.png";
import setCoupleImage from "@/assets/images/seatcouple.png";
import UpdateSeatForm from "@/components/admin/SeatPage/UpdateSeatForm/UpdateSeatForm";
import { updateSeat } from "@/apis/seatsService";

const Seat = ({ seat, refetchSeats }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  let seatLabel = `${seat.row}${seat.number}`;
  let seatImage = setNormalImage;
  if (seat.type === "Ghế VIP") {
    seatImage = seatVIPImage;
  } else if (seat.type === "Ghế đôi") {
    seatImage = setCoupleImage;
  }

  const handleClick = () => {
    setShowUpdateForm(true);
  };
  const handleCancel = () => {
    setShowUpdateForm(false);
  };

  const handleUpdate = async (updatedSeat) => {
    try {
      const response = await updateSeat(updatedSeat.id,updatedSeat);
      console.log("Update successful:", response.data);
      setShowUpdateForm(false);
      refetchSeats();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <>
      <span
        className="relative h-[30px] m-[5px] border-none cursor-pointer"
        onClick={() => handleClick()}
      >
        <img src={seatImage} alt="Seat" className="w-full h-full" />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[10px]">
          {seatLabel}
        </span>
        {seat.status === "reserved" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[30px]">
            X
          </div>
        )}
      </span>
      <UpdateSeatForm
        seat={seat}
        visible={showUpdateForm}
        onCancel={handleCancel}
        onUpdate={handleUpdate}
      />
    </>
  );
};

Seat.propTypes = {
  // Thêm propTypes ở đây
  seat: PropTypes.object.isRequired,
  refetchSeats: PropTypes.func.isRequired,
};

export default Seat;
