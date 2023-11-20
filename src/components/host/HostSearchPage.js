
import { useState, Suspense, useEffect } from "react";
import HostList from "./HostList";
import HostOption from "./HostOption";
import HostMap from "./HostMap";

import { useLoaderData, json, defer, Await } from "react-router-dom";

 const HostSearchPage = () => {
    const hosts = useLoaderData();

    const [hostsList, setHostsList] = useState([]);
    console.log("hosts "+hosts);
    console.log("typeof hosts "+typeof hosts);
    
    // 가장 처음 페이지 렌더링 될 때 
    useEffect(()=>{
        setHostsList(hosts);
    }, []);

    

    return (
        <>
            <HostOption setHostsList={setHostsList} />
            <HostList hosts={hostsList} />
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
