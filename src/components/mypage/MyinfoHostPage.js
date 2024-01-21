import { useLoaderData, json } from "react-router-dom";
import HostRegisterForm from "./MyinfoHostRegisterForm";

function MyinfoHost() {
  const host = useLoaderData();
  
  // loader를 이용해서 가져온 response 정보
  if (host.hostNum === null || host.hostNum === undefined) {
    return <HostRegisterForm method="POST" />; // insert
  } else {
    return <HostRegisterForm host={host} method="PUT" />; // update
  }
}
export default MyinfoHost;

export async function loader() {
  // 여기서 상세보기 조회 -> 값이 있으면 hostEdit -> hostRegisterForm에 method put으로
  // 매번 token header 에 넣어서 보내야하는지 모르겠음
  // user의 정보로 찾아야함
  let headers = new Headers({
    "Content-Type": "application/json",
  });
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }
  const response = await fetch("http://localhost:8080/api/host/info", {
    method: "GET",
    headers: headers,
  });
  if (!response.ok) {
    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}
