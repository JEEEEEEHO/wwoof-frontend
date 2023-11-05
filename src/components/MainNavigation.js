import classes from "./MainNavigation.module.css";
import { NavLink, useRouteLoaderData, Form } from "react-router-dom";

function MainNavigation() {
  const token = useRouteLoaderData("root");

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
            <NavLink to="hosts">호스트 찾기</NavLink>
          </li>
        </ul>
      </nav>
      <nav>
        <ul>
          {!token && (
            <li>
              <NavLink to="login">로그인</NavLink>
            </li>
          )}
          {token && (
            <li>
              <NavLink to="mypage">마이페이지</NavLink>
            </li>
          )}
          {token && (
            <li>
              <Form action="/logout" method="post">
                <button className={classes.button}>로그아웃</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
