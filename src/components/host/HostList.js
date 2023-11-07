import { Link } from "react-router-dom";

const HostList = (props) => {
  return (
    <>
      <h1>HostSearchList</h1>

      <ul>
        {props.hosts.map((host) => (
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
