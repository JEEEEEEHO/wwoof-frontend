import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
  json,
  redirect
} from "react-router-dom";
import classes from "./BoardForm.module.css";

function BoardForm({ method, board }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";
  const data = useActionData();

  function cancelHandler() {
    navigate("..");
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
          disabled={board ? true : false}
          required={board ? false : true}
          defaultValue={board ? board.author : ""}
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

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const eventData = {
    title: data.get('title'),
    author: data.get('author'),
    content: data.get('content'),
  };

  let url = 'http://localhost:8080/api/post/save';

  if (method === 'PUT') {
    const id = params.boardNum; 
    url = 'http://localhost:8080/api/post/' + id;
  }
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });
  
  if(response.state === 422){
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not save board.' }, { status: 500 });
  }
  return redirect('/boards')
}