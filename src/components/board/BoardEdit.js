import { useRouteLoaderData } from "react-router-dom";
import BoardForm from "./BoardForm";

function BoardEdit() {

    const data = useRouteLoaderData("board-detail");
    return(
        <BoardForm method='PUT' board={data} />
    )
}

export default BoardEdit;

