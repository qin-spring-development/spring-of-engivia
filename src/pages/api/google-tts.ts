import type { NextApiRequest, NextApiResponse } from "next";
import * as googleTTS from "google-tts-api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const googleTtsAudio = await googleTTS.getAllAudioBase64(
    "海賊王に、俺はなる",
    {
      lang: "ja",
      slow: false,
      host: "https://translate.google.com",
      timeout: 10000,
      splitPunct: ",.?",
    }
  );
  const base64String = "data:audio/mp3;base64," + googleTtsAudio[0].base64;
  res.status(200).json({ base64String });
};
