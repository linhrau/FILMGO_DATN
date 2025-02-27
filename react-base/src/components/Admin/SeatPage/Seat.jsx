import { useEffect, useState } from "react";
import { getProvinces } from "@/apis/provincesService";
import { getCinemasByProvinceId } from "@/apis/cinemasService";
import { getScreensByCinemaId } from "@/apis/screensService";

import Select from "@/components/Select/Select";

function Seat() {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState("");
  const [screens, setScreens] = useState([]);
  const [selectedScreen, setSelectedScreen] = useState("");
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

  const handleChangeProvince = (event) => {
    const selectedId = event.target.value; // Lấy giá trị ID từ option được chọn
    setSelectedProvince(selectedId);
    // console.log("ID tỉnh thành đã chọn:", selectedId); // In ID ra console
  };

  const handleChangeCinema = (event) => {
    const selectedId = event.target.value;
    setSelectedCinema(selectedId);
  };

  const handleChangeScreen = (event) => {
    const selectedId = event.target.value;
    setSelectedScreen(selectedId);
  };

  return (
    <>
      <div className="m-auto">
        <div>Quản lý ghế</div>
        {provinces.length > 0 && (
            <Select
              value={selectedProvince}
              onChange={handleChangeProvince}
              options={provinces}
              label="Chọn tỉnh thành"
              className="border border-black w-45"
            />
          )}
        {cinemas.length > 0 && (
          <Select
            value={selectedCinema}
            onChange={handleChangeCinema}
            options={cinemas}
            label="Chọn rạp phim"
            className="border border-black w-100"
          />
        )}
        {screens.length > 0 && (
          <Select
            value={selectedScreen}
            onChange={handleChangeScreen}
            options={screens}
            label="Chọn phòng chiếu"
            className="border border-black w-100"
          />
        )}
      </div>
    </>
  );
}

export default Seat;
