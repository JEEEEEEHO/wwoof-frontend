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
import HostSearch from "./components/host/HostSearch";
import HostDetailPage from "./components/host/HostDetailPage";
import Login from "./components/login/Login";
import { action as signinAction } from "./components/login/LoginForm";
import Join from "./components/login/Join";
import { action as joinAction } from "./components/login/JoinForm";
import { action as logoutAction } from "./components/login/Logout";
import { tokenLoader } from "./components/auth";
import SocialLogin from "./components/login/SocialLogin";

import SidebarLayout from "./components/mypage/SidebarLayout"
import NewHostPage from "./components/mypage/NewHostPage";
import {action as manipulateHostAction} from "./components/mypage/HostRegisterForm"
import Myinfo from "./components/mypage/Myinfo"

const router = createBrowserRouter([
  {
    //Header
    path: "/",
    element: <RoutLayout />,
    //errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <Homepage /> },

      {
        path: "login",
        element: <Login />,
        action: signinAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "join",
        element: <Join />,
        action: joinAction,
      },
      {
        path: "socialLogin",
        element: <SocialLogin />,
      },

      // Host Search
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

      // My Page
      {
        path : "mypage",
        element : <SidebarLayout />,
        children:[
          {
            index : true,
            element : <Myinfo />
          },
          {
            path : "newHost",
            element : <NewHostPage />,
            action : manipulateHostAction
          }
        ]
      },

      // Footer
      {
        path: "boards",
        children: [
          {
            index: true,
            element: <BoardsPage />,
            loader: boardsLoader,
          },
          {
            path: "newBoard",
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
