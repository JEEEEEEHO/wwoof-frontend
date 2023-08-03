import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import classes from "./BoardForm.module.css";

function BoardForm({ method, board }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";
  const data = useActionData();
  const formType  = methodType();
  
  function cancelHandler() {
    navigate("..");
  }
  
  function methodType({method}){
    return method=='fetch'?true:false;
  }

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={board ? board.title : ""}
        />
      </p>
      <p>
        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="text"
          name="author"
            {method}
          defaultValue={board ? board.author : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={board ? board.date : ""}
        />
      </p>
      <p>
        <label htmlFor="content">content</label>
        <textarea
          id="content"
          name="content"
          rows="5"
          required
          defaultValue={board ? board.content : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmiting}>
          Cancel
        </button>
        <button disabled={isSubmiting}>Save</button>
      </div>
    </Form>
  );
}

export default BoardForm;
