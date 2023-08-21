
import HostSearchList from "./HostSearchList";

const HOSTS = [
    { id: "e1", title: "event 1" },
    { id: "e2", title: "event 2" },
    { id: "e3", title: "event 3" },
  ];

 function HostSearch() {
    return (
        <>
            <HostSearchList hosts={HOSTS} />
        </>
    )
 } 

 export default HostSearch;