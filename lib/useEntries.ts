import { useState } from "react";
import useSWR from "swr";
import { Entry } from "./entry";
import ky from "ky-universal";

function useEntries(): [Entry[], Date] {
  const [lastUpdate, setLastUpdate] = useState<Date>();

  const { data } = useSWR(
    `/history`,
    async () => ky.get("/api/history").json<Entry[]>(),
    {
      refreshInterval: 10000,
    }
  );

  return [data, lastUpdate];
}

export default useEntries;
