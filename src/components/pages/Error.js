import PageContent from "../PageContent";
import { useRouteError } from "react-router-dom";

function ErrorPage(){
    const error = useRouteError();
    let title = 'An Error Occured'
    let message = 'Someting went wrong';

    if(error.status === 500){
        message = error.data.message;
    }

    if(error.status === 400){
        title = "NOT FOUND"
        message = 'Could not find resoure or page'
    }

 return <PageContent title={title}><p>{message}</p></PageContent>
}
export default ErrorPage;