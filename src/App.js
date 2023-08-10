import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "./components/pages/Homepage";
import RoutLayout from "./components/RoutLayout";
import ErrorPage from "./components/pages/Error";

import BoardsPage, { loader as boardsLoader } from "./components/board/Board";
import BoardDetailPage, {
  loader as boardDetailLoader,
  action as deleteBoardAction,
} from "./components/board/BoardDetailPage";
import NewBoardPage from "./components/board/NewBoardPage";
import BoardEditPage from "./components/board/BoardEditPage";
import { action as manipulateBoardAction } from "./components/board/BoardForm";
import HostSearch from "./components/search/HostSearch";
import HostDetailPage from "./components/search/HostDetailPage";
import Login from "./components/login/Login";
import {action as signinAction} from "./components/login/LoginForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RoutLayout />,
    //errorElement: <ErrorPage />,
    id: 'root',
    children: [
      { index: true, element: <Homepage /> },

      {
        path: "login",
        element: <Login />,
        action : signinAction
      },

      {
        path: "hostSearch",
        children: [
          {
            index: true,
            element: <HostSearch />,
          },
          {
            path: ":hostId",
            children: [{ index: true, element: <HostDetailPage /> }],
          },
        ],
      },

      {
        path: "boards",
        children: [
          {
            index: true,
            element: <BoardsPage />,
            loader: boardsLoader,
          },
          {
            path: "new",
            element: <NewBoardPage />,
            action: manipulateBoardAction,
          },
          {
            path: ":boardNum",
            id: "board-detail",
            loader: boardDetailLoader,
            children: [
              {
                index: true,
                element: <BoardDetailPage />,
                action: deleteBoardAction,
              },
              {
                path: "edit",
                element: <BoardEditPage />,
                action: manipulateBoardAction,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
