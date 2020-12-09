import dayjs from "dayjs";
import useSWR from "swr";
import LiveMap from "../components/LiveMap";
import { Entry } from "../lib/entry";

export default function Home() {
  return (
    <>
      <h1>Bro</h1>
      <a href="https://github.com/ThePicoNerd/bro">
        github.com/ThePicoNerd/bro
      </a>
      <LiveMap />
      {/* <h2>Koordinater</h2>
      <p>Uppdaterades senast {dayjs(data?.updatedAt).format("HH:mm:ss")}</p>
      {data ? (
        <ul>
          {entries?.map(({ timestamp, lat, lon }) => (
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
      )} */}
    </>
  );
}
