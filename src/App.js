import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "./components/pages/Homepage";
import RoutLayout from "./components/RoutLayout";
import ErrorPage from "./components/pages/Error";

// Board
import BoardPage, {
  loader as boardsLoader,
} from "./components/board/BoardPage";
import BoardDetailPage, {
  loader as boardDetailLoader,
  action as deleteBoardAction,
} from "./components/board/BoardDetailPage";
import NewBoard from "./components/board/NewBoard";
import BoardEdit from "./components/board/BoardEdit";
import { action as manipulateBoardAction } from "./components/board/BoardForm";

// Host Serach
import HostSearchPage, {
  loader as hostsLoader,
} from "./components/host/HostSearchPage";

import HostDetailPage, {loader as hostDetailLoader} from "./components/host/HostDetailPage";

// WishList
import WishListPage from "./components/wishlist/WishListPage";

// Login Logout Join
import LoginPage from "./components/login/LoginPage";
import { action as signinAction } from "./components/login/LoginForm";
import JoinPage from "./components/login/JoinPage";
import { action as joinAction } from "./components/login/JoinForm";
import { action as logoutAction } from "./components/login/Logout";
import { tokenLoader } from "./components/auth";
import SocialLogin from "./components/login/SocialLogin";

// Mypage
import SidebarLayout from "./components/mypage/SidebarLayout";
import MyinfoPage from "./components/mypage/MyinfoPage";
import MyinfoHostPage, {
  loader as hostLoader,
} from "./components/mypage/MyinfoHostPage";

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
        element: <LoginPage />,
        action: signinAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "join",
        element: <JoinPage />,
        action: joinAction,
      },
      {
        path: "socialLogin",
        element: <SocialLogin />,
      },

      // WishList
      {
        path: "wishList",
        element: <WishListPage />,
      },

      // Host Search
      {
        path: "hosts",
        children: [
          {
            index: true,
            element: <HostSearchPage />,
            loader: hostsLoader,
          },
          {
            path: ":hostNum",
            id: "host-detail",
            loader: hostDetailLoader,
            children: [
              {
                index: true,
                element: <HostDetailPage />,
                //action: deleteBoardAction,
              },
            ],
          },
        ],
      },

      // My Page
      {
        path: "mypage",
        element: <SidebarLayout />,
        children: [
          {
            index: true,
            element: <MyinfoPage />,
          },
          {
            path: "hostInfo",
            children: [
              {
                index: true,
                element: <MyinfoHostPage />,
                loader: hostLoader,
              },
            ],
          },
        ],
      },

      // Footer
      {
        path: "boards",
        children: [
          {
            index: true,
            element: <BoardPage />,
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
