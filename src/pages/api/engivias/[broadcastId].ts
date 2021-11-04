import type { NextApiRequest, NextApiResponse } from "next";
import { getEngivias } from "src/lib/db-admin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const engivias = await getEngivias(req.query.broadcastId as string);
  res.status(200).json({ engivias });
};
