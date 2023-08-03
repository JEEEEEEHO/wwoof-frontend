import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink to="/">
              <div className={classes.logo}>WWOOF KOREA</div>
            </NavLink>
          </li>
          <li>
            <NavLink to="hostSearch">호스트 찾기</NavLink>
          </li>
        </ul>
      </nav>
      <nav>
        <ul>
          <li>
            <NavLink>로그인</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
