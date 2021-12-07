import { FC, useEffect, useState } from "react";
import { EngiviaType } from "src/types/interface";

type Props = {
  engivia: EngiviaType;
  currentTotalLikes: number;
};

export const EngiviaCardWithTotalLikes: FC<Props> = ({
  engivia,
  currentTotalLikes,
}) => {
  const [audioString, setAudioString] = useState("");
  useEffect(() => {
    const getAudio = async () => {
      const res = await fetch("/api/google-tts", {
        method: "POST",
        cache: "no-cache",
        body: engivia.body,
      });
      const base64String = await res.json();
      setAudioString(base64String.base64String);
    };
    getAudio();
  }, []);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="py-7 px-10 mb-2 bg-white rounded-lg">
        <div className="flex flex-col items-center mb-10">
          <p className="mb-5 text-xl font-bold text-[#0284C7]">
            {`エンジビア${engivia?.engiviaNumber}`}
          </p>
          <p className="text-4xl">{engivia?.body}</p>
          {audioString !== "" && (
            <audio autoPlay>
              <source src={audioString} type="audio/mp3" />
              <track
                src="captions_en.vtt"
                kind="captions"
                srcLang="ja"
                label="english_captions"
              ></track>
            </audio>
          )}
        </div>
        <div className="flex justify-between items-end">
          <div className="flex items-center">
            <img
              className="mr-2 h-8 rounded-full"
              src={engivia?.postUser?.image}
              alt="avatar"
            />
            <span>
              {engivia?.postUser?.name ? engivia.postUser?.name : "No name"}
            </span>
          </div>
          <div className="inline py-3 px-10 text-4xl font-bold text-[#0284C7] bg-[#FEF3C7] rounded-lg">
            <span>{currentTotalLikes}</span>
            <span className="text-xl">へえ</span>
          </div>
        </div>
      </div>
    </div>
  );
};
