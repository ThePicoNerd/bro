import { NextApiHandler } from "next";
import { Entry } from "../../lib/entry";
import { fetchEntries } from "../../lib/sheet";

const history: NextApiHandler<Entry[]> = async (req, res) => {
  const entries = await fetchEntries();

  return res.json(entries);
};

export default history;
