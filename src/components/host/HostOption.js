import { useState, json } from "react";
import HostOptionAdd from "./HostOptionAdd";

const HostOption = ({ setHostList }) => {
  const [hostGender, setHostGender] = useState("");
  const [hostFarmsts, setHostFarmsts] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    const getData = new FormData(e.target);

    const params = {
      startDate : getData.get("startDate"),
      endDate : getData.get("endDate"),
      people : getData.get("people"),
      gender : hostGender,
      farmsts : hostFarmsts
    }

    const queryParam = new URLSearchParams(params).toString();
    const baseurl = "http://localhost:8080/api/host/list";
    let url = `${baseurl}?${queryParam}`;

    try{
      const response = await fetch (url);
      if (!response.ok) {
        throw json(
          { message: "Could not search events." },
          {
            status: 500,
          }
        );
      } else {
          setHostList(response);
      }
    }catch (e){
      console.log(e);
    }


  };

  return (
      <div>
        <form onSubmit={handleSearch}>
          <div>
            <input
              type="date"
              placeholder="시작일"
              name="startDate"
              id="startDate"
            />
            <input
              type="date"
              placeholder="종료일"
              name="endDate"
              id="endDate"
            />
          </div>
          <div>
            <div>인원</div>
            <select name="people" id="people">
              <option selected="selected" value="1">
                1
              </option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div>
            <div>지역</div>
            <select name="region" id="region">
              <option selected="selected" value="">
                전체
              </option>
              <option value="1">경기도</option>
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
  );
};

export default HostOption;
