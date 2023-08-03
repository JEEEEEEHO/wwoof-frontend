import classes from "./BoardItem.module.css";
import { Link, useSubmit } from "react-router-dom";



function BoardItem({ board }) {

  const submit = useSubmit();

  function startDeleteHandler(){
    const proceed = window.confirm("삭제하시겠습니까?");

    if(proceed){
      submit(null, {
        method : 'DELETE'
      })
    }
  }

  return (
    <article className={classes.event}>
      <h1>{board.title}</h1>
      <p>{board.author}</p>
      <p>{board.content}</p>
      <menu className={classes.actions}>
          <Link to="edit">Edit</Link>
          <button onClick={startDeleteHandler}>삭제</button>
        </menu>
    </article>
  );
}

export default BoardItem;
