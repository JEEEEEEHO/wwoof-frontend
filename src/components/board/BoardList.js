import { Link } from "react-router-dom";
import classese from "./BoardList.module.css";

function BoardList({ boards }) {
  // const events = useLoaderData();

  return (
    <div>
      <h1>게시판</h1>
      <div>
        <table className={classese.styledtable}>
          <thead>
            <tr>
              <th>게시글번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>최종수정일</th>
            </tr>
          </thead>
          <tbody>
            {boards.map((board) => (
              <tr>
                <td key={board.pnum}>{board.pnum}</td>
                <Link to={board.pnum}>
                  <td>{board.title}</td>
                </Link>
                <td>{board.author}</td>
                <td>{board.modifiedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <div>
            <a href="/" role="button">
              글 등록
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardList;
