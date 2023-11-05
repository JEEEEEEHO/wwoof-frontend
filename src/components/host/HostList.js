import { Link } from "react-router-dom";

const HostSearchList= (props) => {
  return (
    <>
      <h1>HostSearchList</h1>

      <ul>
        {props.hosts.map((host) => (
          <li key={host.id}>
            <Link to={host.id}>{host.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default HostSearchList;
