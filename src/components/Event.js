import { useLoaderData, json, defer, Await } from "react-router-dom";
import { Suspense } from "react";

import EventsList from "../components/EventsList";

function EventsPage() {
  const { events } = useLoaderData();
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading</p>}>
      <Await resolve={events}>
        {(loadEvent) => <EventsList events={loadEvent} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvent() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}
export function loader() {
  // 해당 로드 안에서 response 즉 Promise를 기다리는 것을 피하기 위함 }
  return defer({
    events: loadEvent(),
  });
}
