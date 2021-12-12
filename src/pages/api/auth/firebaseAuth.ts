import { hashSync } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
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
    const hash = hashSync(userId, process.env.SALT_VALUE as string);
    const customToken = await adminAuth.createCustomToken(hash);
    res.status(200).json({ token: customToken });
  } else {
    res.status(400).json({ errorMessage: "userId is required" });
  }
}
