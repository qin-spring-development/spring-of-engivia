import type { NextApiRequest, NextApiResponse } from "next";
import { getAllBroadcasts } from "src/lib/db-admin";

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const broadcasts = await getAllBroadcasts();
  res.status(200).json({ broadcasts });
};
