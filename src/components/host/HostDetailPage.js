import { json, useRouteLoaderData } from "react-router-dom";

import { useEffect} from "react";


function HostDetailPage() {
  const { hostDetail, ResrvDscn } = useRouteLoaderData("hostDetail", "ResrvDscn");


  // 예약 날짜 가져옴 
  // 페이지 한번 로딩 이후로 바뀔일 없음 
  useEffect(()=>{

    const bookedDates = ResrvDscn.json();
    const bookedDatesArr = [];

    bookedDates.then(result => result.forEach(element => {
      const start = new Date(element.startDate);
      const end = new Date(element.endDate);

      while (start <= end) {
        bookedDatesArr.push(start.toISOString().split('T')[0]);
        start.setDate(start.getDate() + 1);
      }

    }));
  })


  return (
    <>
    <div>
      <h1>{hostDetail.hostNum}</h1>
      <ul>
        {hostDetail.hostImg.map((img) => (
          <li key={img.hostImg_turn}>
            <img
              src={img.fileUri}
              alt={img.filename}
              style={{ width: "200px", height: "150px" }}
            />
          </li>
        ))}

        <p>{hostDetail.shortintro}</p>
        <li>{hostDetail.region}</li>
        <li>{hostDetail.gender}</li>
        <li>{hostDetail.age}</li>
        <li>{hostDetail.farmsts}</li>
        <li>{hostDetail.intro}</li>
        <li>{hostDetail.maxPpl}</li>
      </ul>
    </div>
    </>
  );
}

export default HostDetailPage;

export async function loader({ request, params }) {
  //params 로 작업 가능
  const hnum = params.hostNum;

  const [responseHostDetail, responseResrvDetail] = await Promise.all([
    fetch("http://localhost:8080/api/host/" + hnum, {
    }),
    fetch("http://localhost:8080/api/resrv/"+ hnum, {
    }),
  ]);

  if (!responseHostDetail.ok || !responseResrvDetail.ok) {
    throw json(
      {
        message: "Could not fetch detail for selected event",
      },
      { status: 500 }
    );
  } else {
    let hostDetail = await responseHostDetail.json();
    let resrvDscn = await responseResrvDetail.json();

    return { hostDetail, resrvDscn };
  }
}
