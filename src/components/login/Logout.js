import { redirect } from "react-router-dom";


export function loader() {
  localStorage.removeItem('ACCESS_TOKEN');
  alert("logout success")
  return redirect('/');
}