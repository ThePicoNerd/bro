import { useState } from "react";
import useSWR from "swr";
import { Entry } from "./entry";
import ky from "ky-universal";

function useEntries(): [Entry[], Date] {
  const [lastUpdate, setLastUpdate] = useState<Date>();

  const { data } = useSWR(
    `/history`,
    async () => {
      const entries = await ky.get("/api/history").json<Entry[]>();

      setLastUpdate(new Date());

      return entries;
    },
    {
      refreshInterval: 10000,
    }
  );

  return [data, lastUpdate];
}

export default useEntries;
