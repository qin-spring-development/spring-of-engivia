import type { NextApiRequest, NextApiResponse } from "next";
import * as googleTTS from "google-tts-api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const googleTtsAudio = await googleTTS.getAudioBase64(req.body, {
    lang: "ja",
    slow: true,
    host: "https://translate.google.com",
    timeout: 10000,
  });
  const base64String = "data:audio/mp3;base64," + googleTtsAudio;
  res.status(200).json({ base64String });
};
