import { redirect } from "react-router-dom";


export function action() {
  localStorage.removeItem('ACCESS_TOKEN');
  console.log(localStorage.getItem('ACCESS_TOKEN'));
  alert("logout success")
  return redirect('/');
}