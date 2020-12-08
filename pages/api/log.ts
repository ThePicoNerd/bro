// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiHandler } from "next";
import { insertCoordinates } from "../../lib/sheet";
const { SECRET } = process.env;

const log: NextApiHandler<string> = async (req, res) => {
  const { query } = req;

  function forbid(message: string) {
    return res.status(400).send(message);
  }

  if (!SECRET) {
    throw new Error("No secret! This is really bad.");
  }

  if (query.secret?.toString() !== SECRET) {
    return forbid(`missing or incorrect \`secret\``);
  }

  const latlon = query.latlon?.toString();

  if (!latlon) {
    return forbid("missing `latlon` query parameter");
  }

  const [lat, lon] = latlon?.split(",")?.map((axis) => parseFloat(axis));

  if (!lat || Math.abs(lat) > 90) {
    return forbid(
      `missing or invalid \`lat\` (got: \`${lat}\`, must be between -90 and 90)`
    );
  }

  if (!lon || Math.abs(lon) > 180) {
    return forbid(
      `missing or invalid \`lon\` (got: \`${lon}\`, must be between -180 and 180)`
    );
  }

  await insertCoordinates(lat, lon);

  res.send("success");
};

export default log;
