import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./components/pages/Homepage";
import EventsPage, { loader as eventsLoader } from "./components/Event";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./components/pages/EventDetailPage";
import NewEventPage from "./components/pages/NewEventPage";
import EditEventPage from "./components/pages/EditEventPage";
import RoutLayout from "./components/RoutLayout";
import EventRootLayout from "./components/pages/EventRoot";
import ErrorPage from "./components/pages/Error";
import { action as manipulateEventAction } from "./components/EventForm";
import NewsletterPage, {
  action as newsletterAction,
} from "./components/Newsletter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RoutLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      {
        path: "events",
        element: <EventRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: manipulateEventAction,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
