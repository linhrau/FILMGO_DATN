import { useState } from "react";
import PropTypes from "prop-types";
import seatVIPImage from "@/assets/images/Seat.png";
import setNormalImage from "@/assets/images/seatnormal.png";
import setCoupleImage from "@/assets/images/seatcouple.png";

const Seat = ({ id,row, number, type }) => {

  const [isSelected, setIsSelected] = useState(false);

  let seatLabel = `${row}${number}`;

  let seatImage = setNormalImage;
  if (type === "Ghế VIP") {
    seatImage = seatVIPImage;
  } else if (type === "Ghế đôi") {
    seatImage = setCoupleImage;
  }

    const handleClick = (seat) => {
      setIsSelected(!isSelected);
      console.log('Ghế đã chọn:', seat);
    }

  return (
    <span className="relative h-[30px] m-[5px] border-none cursor-pointer" onClick={() => handleClick({ id, row, number, type })}>
      <img src={seatImage} alt="Seat" className="w-full h-full" />
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[10px]">
        {seatLabel}
      </span>
      {isSelected &&(
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[30px]">X</div>
      )}
    </span>
  );
};

Seat.propTypes = {
  // Thêm propTypes ở đây
  id: PropTypes.number.isRequired,
  row: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default Seat;
