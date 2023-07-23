import { Outlet } from "react-router-dom";
import EventsNavigation from "../EventsNavigation"

function EventRootLayout(){
    return(
        <>
            <EventsNavigation />
            <Outlet></Outlet>
        </>
    )

}
export default EventRootLayout;