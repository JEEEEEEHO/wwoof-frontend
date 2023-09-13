import { Link } from "react-router-dom";
import { useLoaderData, json, defer, Await} from "react-router-dom";
import { Suspense } from "react";
import HostRegisterForm from "./HostRegisterForm";

function MyinfoHost() {
  const { host } = useLoaderData();
  // loader를 이용해서 가져온 response 정보
  if ({host} == undefined) {
    return (
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading</p>}>
        <Await resolve={host}>
          {(loadHost) => <HostRegisterForm host={loadHost} method="PUT" />}
          {/* 수정으로 넘김 */}
        </Await>
      </Suspense>
    );
  } else {
    return (
      <>
        <h2>신청내역이 없음</h2>
        <Link to="newHost">
          <button type="button">글등록</button>
        </Link>
      </>
    );
  }
}
export default MyinfoHost;

async function loadHost() {
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
  const response = await fetch("http://localhost:8080/api/host/saveInfo", {
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
    const resData = await response.json();
    return resData;
  }
}

export function loader() {
  // 해당 로드 안에서 response 즉 Promise를 기다리는 것을 피하기 위함 }
  return defer({
    host: loadHost(),
  });
}
