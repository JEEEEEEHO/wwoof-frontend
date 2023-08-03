import { NavLink } from 'react-router-dom';

import classes from './EventsNavigation.module.css';

function BoardsNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/boards"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Events
            </NavLink>
          </li>

        </ul>
      </nav>
    </header>
  );
}

export default BoardsNavigation;