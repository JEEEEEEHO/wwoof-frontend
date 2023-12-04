import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import isEqual from "lodash-es"

const HostList = (props) => {
  const [existHost, setExistHost] = useState(true); // 아무것도 없음
  for(const {hnum} of props.hosts){
    console.log("현재 호스트 정보 : " + typeof hnum)
    if(hnum < 0){
      setExistHost(false);
      break;
    }
  }
  console.log("existHost "+existHost);

  useEffect(() => {
    console.log("매번 렌더링 마다 실행됨 ");
  }, [existHost]);

  return (
    <>
    {!existHost &&<p>검색결과없음</p>}
      <ul>
        {existHost && props.hosts.map((host) => (
          <li key={host.hnum}>
            <img
              src={host.hostMainImg.fileUri}
              alt={host.hostMainImg.filename}
              style={{ width: "200px", height: "150px" }}
            />
            <Link to={host.hnum}>{host.shortintro}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HostList;
