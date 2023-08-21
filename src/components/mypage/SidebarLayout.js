import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function SidebarLayout() {
  return (
    <>
      <div style={{display : 'flex'}}>
        <Sidebar />
        <div style={{ flex: '4' }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
export default SidebarLayout;
