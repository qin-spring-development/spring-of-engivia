import type { NextApiRequest, NextApiResponse } from "next";
import { getUserEngivia } from "src/lib/db-admin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const userEngivia = await getUserEngivia(
    req.query.id as string,
    req.query.uid as string
  );
  res.status(200).json(userEngivia);
};
