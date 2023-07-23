import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink to="/"><div className={classes.logo}>WWOOF KOREA</div></NavLink>
          </li>
          <li>
            <NavLink
              to="/"

            >
              호스트 찾기
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Newsletter
            </NavLink>
          </li>
        </ul>
      </nav>
      <nav>
        <ul>
          <li>
            <NavLink

            >
              회원가입
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
