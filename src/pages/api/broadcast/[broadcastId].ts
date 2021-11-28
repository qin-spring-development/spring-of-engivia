import type { NextApiRequest, NextApiResponse } from "next";
import { getBroadcast } from "src/lib/db-admin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const broadcast = await getBroadcast(req.query.broadcastId as string);
  res.status(200).json({ broadcast });
};
