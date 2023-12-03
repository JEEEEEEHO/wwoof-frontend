import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const HostList = (props) => {
  const [existHost, setExistHost] = useState(false); // 아무것도 없음
  console.log(props);

  useEffect(() => {
    props.hosts.map((host) => {
      console.log(host.hnum);
      if (host.hnum > 0) {
        setExistHost(true);
      }
    });
  }, []);

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
