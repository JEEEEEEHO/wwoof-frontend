import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "./components/pages/Homepage";
import RoutLayout from "./components/RoutLayout";
import ErrorPage from "./components/pages/Error";

import Board, { loader as boardsLoader } from "./components/board/Board";
import BoardDetailPage, {
  loader as boardDetailLoader,
  action as deleteBoardAction,
} from "./components/board/BoardDetail";
import NewBoard from "./components/board/NewBoard";
import BoardEdit from "./components/board/BoardEdit";
import { action as manipulateBoardAction } from "./components/board/BoardForm";
import HostSearch from "./components/host/HostSearch";
import Login from "./components/login/Login";
import { action as signinAction } from "./components/login/LoginForm";
import Join from "./components/login/Join";
import { action as joinAction } from "./components/login/JoinForm";
import { action as logoutAction } from "./components/login/Logout";
import { tokenLoader } from "./components/auth";
import SocialLogin from "./components/login/SocialLogin";

import SidebarLayout from "./components/mypage/SidebarLayout"
import Myinfo from "./components/mypage/Myinfo"
import MyinfoHost, { loader as hostLoader }  from "./components/mypage/MyinfoHost"; 
import HostRegisterForm from "./components/mypage/HostRegisterForm"
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
        path: "hosts",
        children: [
          {
            index: true,
            element: <HostSearch />,
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
            path : "myinfoHost",
            children :[
              {
                index : true,
                element : <MyinfoHost />,
                loader : hostLoader,
              }, 
              {
                path : "newHost",
                element : <HostRegisterForm />,
              }, 
            ]
          }
        ]
      },

      // Footer
      {
        path: "boards",
        children: [
          {
            index: true,
            element: <Board />,
            loader: boardsLoader,
          },
          {
            path: "newBoard",
            element: <NewBoard />,
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
                element: <BoardEdit />,
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
