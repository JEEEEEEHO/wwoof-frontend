import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "./components/pages/Homepage";
import RoutLayout from "./components/RoutLayout";
import ErrorPage from "./components/pages/Error";

import BoardsPage, { loader as boardsLoader } from "./components/board/Board";
import BoardDetailPage, {
  loader as boardDetailLoader,
} from "./components/board/BoardDetailPage";
import BoardEditPage from "./components/board/BoardEditPage";
import HostSearch from "./components/search/HostSearch";

import HostDetailPage from "./components/search/HostDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RoutLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },

      {
        path: "hostSearch",
        children: [
          {
            index: true,
            element: <HostSearch />,
          },
          {
            path: ":hostId",
            children: [
              { index: true, element: <HostDetailPage /> }
            ],
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
            path: ":boardNum",
            id: "board-detail",
            loader: boardDetailLoader,
            children: [
              {
                index: true,
                element: <BoardDetailPage />,
                // action: deleteEventAction,
              },
              {
                index: "edit",
                element: <BoardEditPage />,
                // action: deleteEventAction,
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
