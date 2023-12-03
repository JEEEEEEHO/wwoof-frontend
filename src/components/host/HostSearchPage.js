
import { useState, useEffect } from "react";
import HostList from "./HostList";
import HostOption from "./HostOption";
import HostMap from "./HostMap";

import { useLoaderData, json } from "react-router-dom";

 const HostSearchPage = () => {
    const hosts = useLoaderData();

    const [hostsList, setHostsList] = useState([]);
    
    // 가장 처음 페이지 렌더링 될 때 
    useEffect(()=>{
        setHostsList(hosts);
    }, []);

    

    return (
        <>
            <HostOption setHostsList={setHostsList} />  
            {/* 검색에서 찾음 */}
            <HostList hosts={hostsList} />
            {/* 검색에서 찾은 값을 리스트로 보냄 */}
            <HostMap />
        </>
    )
 } 

 export default HostSearchPage;

 export async function loader() {

    let headers = new Headers({
      "Content-Type": "application/json",
    });
    
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken && accessToken !== null) {
      headers.append("Authorization", "Bearer " + accessToken);
    }
  
    const response = await fetch("http://localhost:8080/api/host/list", {
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
