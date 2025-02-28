import { useEffect, useState } from "react";
import { getProvinces } from "@/apis/provincesService";
import { getCinemasByProvinceId } from "@/apis/cinemasService";
import { getScreensByCinemaId } from "@/apis/screensService";
import { Select } from "antd";
import { getSeatsByScreenID } from "@/apis/seatsService";
import SeatLayout from "../../../admin/SeatPage/SeatLayout/SeatLayout"

function FilterSeat() {
  const [selectedProvince, setSelectedProvince] = useState(undefined);
  const [provinces, setProvinces] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(undefined);
  const [screens, setScreens] = useState([]);
  const [selectedScreen, setSelectedScreen] = useState(undefined);
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    getProvinces().then((res) => {
      if (res && res.data && res.data.length > 0) {
        setProvinces(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      getCinemasByProvinceId(selectedProvince).then((res) => {
        if (res && res.data) {
          setCinemas(res.data);
        }
      });
    } else {
      setCinemas([]);
    }
  }, [selectedProvince]); // Gọi lại useEffect khi selectedProvince thay đổi

  useEffect(() => {
    if (selectedCinema) {
      getScreensByCinemaId(selectedCinema).then((res) => {
        if (res && res.data) {
          setScreens(res.data);
        }
      });
    } else {
      setScreens([]);
    }
  }, [selectedCinema]); // Gọi lại useEffect khi selectedProvince thay đổi

  useEffect(() => {
    if (selectedScreen) {
      getSeatsByScreenID(selectedScreen).then((res) => {
        if (res && res.data) {
          setSeats(res.data);
        }
      });
    }else{
      setSeats([]);
    }
  },[selectedScreen]);

  const handleChangeProvince = (value) => {
    setSelectedProvince(value);
    setSelectedCinema(undefined); // Reset cinema
    setScreens([]); // Reset screen
    setSelectedScreen(undefined); // Reset selectedScreen
    setSeats([]); // Reset seats
  };

  const handleChangeCinema = (value) => {
    setSelectedCinema(value);
    setSelectedScreen(undefined); // Reset screen
    setSeats([]); // Reset seats
  };

  const handleChangeScreen = (value) => {
    setSelectedScreen(value);
  };

  return (
    <>
      <div className="d-flex">
        {provinces.length > 0 && (
          <Select
            value={selectedProvince}
            onChange={handleChangeProvince} // Truyền handleChangeProvince
            options={provinces.map((province) => ({
              value: province.id,
              label: province.name,
            }))}
            placeholder="Tỉnh thành"
            style={{ width: "30%", marginRight: "3%" }} // Thêm style
          />
        )}
        {cinemas.length > 0 && (
          <Select
            value={selectedCinema}
            onChange={handleChangeCinema} // Truyền handleChangeCinema
            options={cinemas.map((cinema) => ({
              value: cinema.id,
              label: cinema.name,
            }))}
            placeholder="Chọn rạp phim"
            style={{ width: "30%", marginRight: "3%" }} // Thêm style
          />
        )}
        {screens.length > 0 && (
          <Select
            value={selectedScreen}
            onChange={handleChangeScreen} // Truyền handleChangeScreen
            options={screens.map((screen) => ({
              value: screen.id,
              label: screen.name,
            }))}
            placeholder="Chọn rạp chiếu"
            style={{ width: "30%" }} // Thêm style
          />
        )}
      </div>
      {seats.length > 0 && (
        <SeatLayout seats={seats} screens={screens}/>
      )}
    </>
  );
}

export default FilterSeat;
