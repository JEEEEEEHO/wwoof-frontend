import classes from "./FooterNavigation.module.css";
import { NavLink } from "react-router-dom";

function FooterNavigation() {
  return (
    <header className={classes.footer}>
      <nav>
        <ul>
          <li>
            <NavLink to="/">
              <div className={classes.logo}>WWOOF KOREA</div>
            </NavLink>
          </li>
        </ul>
      </nav>
      <nav>
        <ul>
          <li>
            <NavLink to="boards">공지사항</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default FooterNavigation;
