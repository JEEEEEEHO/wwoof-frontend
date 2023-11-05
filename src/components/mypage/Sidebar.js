import { Link } from "react-router-dom";

function Sidebar(){
    return(
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3>김지호</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <Link to="">나의정보</Link>
                        </li>
                        <li className="sidebarListItem">
                            <Link to="hostInfo">호스트신청</Link> 
                            {/* 신청한사람은 정보보기 */}
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Sidebar;