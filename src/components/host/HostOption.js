import { useState } from "react";
import HostOptionAdd from "./HostOptionAdd";

const HostOption = ({ setHostList }) => {
  const [hostGender, setHostGender] = useState("");
  const [hostFarmsts, setHostFarmsts] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    
    let headers = new Headers();

    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken && accessToken !== null) {
      headers.append("Authorization", "Bearer " + accessToken);
    }


  };

  return (
    <div>
      <div>
        <form onSubmit={handleSearch}>
          <div>
            <input
              type="date"
              placeholder="시작일"
              name="startdate"
              id="startdate"
            />
            <input
              type="date"
              placeholder="종료일"
              name="enddate"
              id="enddate"
            />
          </div>
          <div>
            <div>인원</div>
            <select name="people" id="people">
              <option selected="selected" value="one">
                1
              </option>
              <option value="two">2</option>
              <option value="three">3</option>
            </select>
          </div>
          <div>
            <div>지역</div>
            <select name="region" id="region">
              <option selected="selected" value="1">
                경기도
              </option>
              <option value="2">충청도</option>
            </select>
          </div>
          <HostOptionAdd
            setHostGender={setHostGender}
            setHostFarmsts={setHostFarmsts}
          />
          <div>
            <button type="submit">검색</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HostOption;
