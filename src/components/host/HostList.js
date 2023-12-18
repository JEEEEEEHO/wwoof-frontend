import { Link } from "react-router-dom";

const HostList = (props) => {
  for (const { hnum } of props.hosts) {
    console.log("현재 호스트 정보 : " + typeof hnum);
    if (hnum < 0) {
      return <p>검색결과없음</p>;
      
    } else {
      return (
        <>
          <ul>
            {props.hosts.map((host) => (
              <li key={host.hnum}>
                <img
                  src={host.hostMainImg.fileUri}
                  alt={host.hostMainImg.filename}
                  style={{ width: "200px", height: "150px" }}
                />
                <Link to={host.hnum.toString()}>{host.shortintro}</Link>
              </li>
            ))}
          </ul>
        </>
      );
    }
    break;
  }
};

export default HostList;
