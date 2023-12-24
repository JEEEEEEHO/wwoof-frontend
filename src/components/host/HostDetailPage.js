import { json, useRouteLoaderData } from "react-router-dom";

function HostDetailPage() {
  const data = useRouteLoaderData("host-detail");
  return (
    <>
      <h1>{data.hostNum}</h1>
      <ul>
        {data.hostImg.map((img) => (
          <li key={img.hostImg_turn}>
            <img
              src={img.fileUri}
              alt={img.filename}
              style={{ width: "200px", height: "150px" }}
            />
          </li>
        ))}

        <p>{data.shortintro}</p>
        <li>{data.region}</li>
        <li>{data.gender}</li>
        <li>{data.age}</li>
        <li>{data.farmsts}</li>
        <li>{data.intro}</li>
        <li>{data.maxPpl}</li>
      </ul>
    </>
  );
}

export default HostDetailPage;

export async function loader({ request, params }) {
  //params 로 작업 가능
  const hnum = params.hostNum;
  console.log("hnum : " + hnum);
  const response = await fetch("http://localhost:8080/api/host/" + hnum);

  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch detail for selected event",
      },
      { status: 500 }
    );
  } else {
    return response;
  }
}
