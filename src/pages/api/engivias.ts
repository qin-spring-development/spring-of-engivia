import type { NextApiRequest, NextApiResponse } from "next";
// import { adminAuth } from "src/lib/firebase-admin";
import { getEngivias } from "src/lib/db-admin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const engivias = await getEngivias(req.query.broadcastId as string);
    res.status(200).json({ engivias });
  } catch (error) {
    console.error(error);
  }
};
