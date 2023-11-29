import { Link } from "react-router-dom";

const HostList = (props) => {
  const exist = props.hosts[0].hnum <0 ? false : true;

  return (
    <>
      <h1>HostSearchList</h1>

      <ul>
        {!exist && <p>검색결과없음</p>}


        {exist && props.hosts.map((host) => (
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
