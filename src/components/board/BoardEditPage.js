import { useRouteLoaderData } from "react-router-dom";
import BoardForm from "./BoardForm";

function BoardEditPage() {

    const data = useRouteLoaderData("board-detail");
    return(
        <BoardForm method='PUT' board={data} />
    )
}

export default BoardEditPage;

