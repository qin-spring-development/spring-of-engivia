import type { FC } from "react";
import { EngiviaType } from "src/types/interface";

type Props = {
  engivia: EngiviaType;
  totalLikes?: number;
};

export const EngiviaCardWithTotalLikes: FC<Props> = ({
  engivia,
  totalLikes,
}) => {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="py-7 px-10 mb-2 bg-white rounded-lg">
        <div className="flex flex-col items-center mb-10">
          <p className="mb-5 text-xl font-bold text-[#0284C7]">
            {`エンジビア${engivia?.engiviaNumber}`}
          </p>
          <p className="text-4xl">{engivia?.body}</p>
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
            <span>{totalLikes}</span>
            <span className="text-xl">へえ</span>
          </div>
        </div>
      </div>
    </div>
  );
};
