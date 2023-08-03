import { Link } from "react-router-dom";
import classes from "./BoardList.module.css";

function BoardList({ boards }) {
  // const events = useLoaderData();

  return (
    <div className={classes.events}>
      <h1>게시판</h1>
      <ul className={classes.list}>
        {boards.map((board) => (
          <li key={board.pnum} className={classes.item}>
            <Link to={board.pnum.toString()}>
              <div className={classes.content}>
                <h2>{board.title}</h2>
                <p>{board.author}</p>
                <p>{board.pnum}</p>
                
                <time>{board.modifiedDate}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default BoardList;
