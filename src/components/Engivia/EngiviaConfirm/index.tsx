import type { FC } from "react";
import { EngiviaType } from "src/types/interface";
import { deleteEngivia } from "src/lib/db";
import { EngiviaInput } from "src/components/Engivia/EngiviaInput";
import {
  useBroadcastId,
  useIsEngiviaEditScreen,
  useEngivia,
} from "src/hooks/useSharedState";

type Props = {
  engivia?: EngiviaType;
};

export const EngiviaConfirm: FC<Props> = ({ engivia }) => {
  const { broadcastId, setBroadcastId } = useBroadcastId();
  const { setEngivia } = useEngivia();
  const { isEngiviaEditScreen, setIsEngiviaEditScreen } =
    useIsEngiviaEditScreen();
  const onDeleteEngivia = () => {
    if (engivia) {
      deleteEngivia(broadcastId, engivia.id);
      setEngivia({});
      setBroadcastId("");
    }
  };

  const onEditEngivia = () => {
    setIsEngiviaEditScreen(true);
  };

  const onBackBroadcasts = () => {
    setBroadcastId("");
  };

  return (
    <>
      {engivia && isEngiviaEditScreen ? (
        <EngiviaInput engivia={engivia} />
      ) : (
        engivia && (
          <div className="mx-auto max-w-3xl">
            <div className="py-7 px-10 mb-5 bg-white rounded-lg">
              <div className="flex flex-col items-center mb-10">
                <p className="mb-5 text-xl font-bold text-[#0284C7]">
                  {`エンジビアかな???`}
                </p>
                <p className="text-4xl">{engivia?.body}</p>
              </div>
              <div className="flex justify-between items-end">
                <div className="flex items-center">
                  <img
                    className="mr-2 h-8 rounded-full"
                    src={engivia?.postUser?.photoUrl}
                    alt="avatar"
                  />
                  <span>{engivia.postUser.name}</span>
                </div>
              </div>
            </div>
            <div className="flex relative justify-center">
              <button
                onClick={onEditEngivia}
                className="items-center py-2 px-4 mr-2 text-white bg-light-blue-600 rounded-md"
              >
                編集する
              </button>
              <button
                onClick={onDeleteEngivia}
                className="py-2 px-4 mr-2 text-blue-600 bg-light-blue-100 rounded-md"
              >
                削除する
              </button>
              <button
                onClick={onBackBroadcasts}
                className="absolute right-0 items-center py-2 px-4 mr-2 text-white bg-light-blue-600 rounded-md"
              >
                放送一覧に戻る
              </button>
            </div>
          </div>
        )
      )}
    </>
  );
};
