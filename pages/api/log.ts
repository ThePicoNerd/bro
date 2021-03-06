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

  const mdloc = query.mdloc?.toString();

  if (!mdloc) {
    return forbid("missing `mdloc` query parameter");
  }

  const [lat, lng] = mdloc.split(",").map((axis) => parseFloat(axis));

  if (!lat || Math.abs(lat) > 90) {
    return forbid(
      `missing or invalid \`lat\` (got: \`${lat}\`, must be between -90 and 90)`
    );
  }

  if (!lng || Math.abs(lng) > 180) {
    return forbid(
      `missing or invalid \`lng\` (got: \`${lng}\`, must be between -180 and 180)`
    );
  }

  await insertCoordinates(lat, lng);

  res.send("success");
};

export default log;
