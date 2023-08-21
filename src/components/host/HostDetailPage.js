import { useParams } from "react-router-dom";

function HostDetailPage(){
    const params = useParams();

    return (
        <>
        <h1>Details</h1>
        <p>{params.hostId}</p>
        </>
    )
}

export default HostDetailPage;