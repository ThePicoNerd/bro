import dayjs from "dayjs";
import ky from "ky-universal";
import useSWR from "swr";
import { Entry } from "../lib/entry";

export default function Home() {
  const { data } = useSWR(`/history`, async () =>
    ky.get("/api/history").json<Entry[]>()
  );

  console.log(data);

  return (
    <>
      <h1>Bro</h1>
      <a href="https://github.com/ThePicoNerd/bro">
        github.com/ThePicoNerd/bro
      </a>
      <h2>Koordinater</h2>
      {data ? (
        <ul>
          {data?.map(({ timestamp, lat, lon }) => (
            <li key={timestamp}>
              <a
                href={`http://www.google.com/maps/place/${lat.toString()},${lon.toString()}`}
              >
                <code>
                  {lat.toString()}, {lon.toString()}
                </code>
              </a>{" "}
              ({dayjs(timestamp).format("HH:mm:ss")})
            </li>
          ))}
        </ul>
      ) : (
        <p>Hämtar ...</p>
      )}
    </>
  );
}
