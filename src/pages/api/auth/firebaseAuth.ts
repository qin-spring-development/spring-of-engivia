import { NextApiRequest, NextApiResponse } from "next";
import { toHash } from "src/lib/auth/hash";
import { adminAuth } from "src/lib/firebase-admin";

export type CustomTokenResponse = {
  token?: string;
  errorMessage?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CustomTokenResponse>
) {
  const userId = req.body?.userId;
  if (userId) {
    const hash = toHash(userId);
    const customToken = await adminAuth.createCustomToken(hash);
    res.status(200).json({ token: customToken });
  } else {
    res.status(400).json({ errorMessage: "userId is required" });
  }
}
