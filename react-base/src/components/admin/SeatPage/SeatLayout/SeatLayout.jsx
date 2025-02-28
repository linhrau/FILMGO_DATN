import Seat from "@/components/admin/SeatPage/Seat/Seat";
import PropTypes from "prop-types"; // Import PropTypes
import setScreenImage from "@/assets/images/ic-screen.png";

const SeatLayout = ({ seats}) => {
  // Nhóm ghế theo row
  const groupedSeats = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {});

  return (
    <div className="w-[1000px] mx-auto mt-5">
      <img src={setScreenImage} alt="Seat" className="w-full h-full " />
      {Object.keys(groupedSeats).map((row) => (
        <div key={row} className="flex justify-center flex-wrap">
          {groupedSeats[row].slice(0, 20).map((seat) => (
            <Seat
              key={seat.id}
              id={Number(seat.id)}
              row={seat.row}
              number={seat.number}
              type={seat.type}
              price={seat.price}
              />
          ))}
        </div>
      ))}
    </div>
  );
};

SeatLayout.propTypes = {
  seats: PropTypes.arrayOf(
    PropTypes.shape({
      // Khai báo kiểu dữ liệu cho seats
      id: PropTypes.number.isRequired,
      row: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SeatLayout;
