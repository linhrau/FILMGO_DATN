import { useEffect, useState } from "react";
import { getProvinces } from "@/apis/provincesService";
import { getCinemasByProvinceId } from "@/apis/cinemasService";
import { getScreensByCinemaId } from "@/apis/screensService";
import { Select } from "antd";

function Seat() {
  const [selectedProvince, setSelectedProvince] = useState(undefined);
  const [provinces, setProvinces] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(undefined);
  const [screens, setScreens] = useState([]);
  const [selectedScreen, setSelectedScreen] = useState(undefined);
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
      setCinemas([]); // Reset danh sách rạp phim nếu không có tỉnh thành nào được chọn
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
      setScreens([]); // Reset danh sách rạp phim nếu không có tỉnh thành nào được chọn
    }
  }, [selectedCinema]); // Gọi lại useEffect khi selectedProvince thay đổi

  const handleChangeProvince = (value) => {
    setSelectedProvince(value);
    // console.log("ID tỉnh thành đã chọn:", value); // In ID ra console
  };

  const handleChangeCinema = (value) => {
    setSelectedCinema(value);
  };

  const handleChangeScreen = (value) => {
    setSelectedScreen(value);
  };

  return (
    <>
      <div className="container">
        <h2 className="mt-3 mb-3">Quản lý ghế</h2>
        <div className="flex">
          {provinces.length > 0 && (
            <Select
              value={selectedProvince}
              onChange={handleChangeProvince} // Truyền handleChangeProvince
              options={provinces.map((province) => ({
                value: province.id,
                label: province.name,
              }))}
              placeholder="Tỉnh thành"
              style={{ width: 200 }} // Thêm style
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
              style={{ width: 200 }} // Thêm style
            />
          )}
          {screens.length > 0 && (
            <Select
              value={selectedScreen}
              onChange={handleChangeScreen} // Truyền handleChangeCinema
              options={screens.map((screen) => ({
                value: screen.id,
                label: screen.name,
              }))}
              placeholder="Chọn rạp chiếu"
              style={{ width: 200 }} // Thêm style
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Seat;
