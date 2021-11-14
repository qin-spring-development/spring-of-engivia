import type { FC, ChangeEvent } from "react";
import { useState } from "react";
import { createEngivia, updateEngivia, createJoinUsers } from "src/lib/db";
import { EngiviaType } from "src/types/interface";
import {
  useBroadcastId,
  useIsEngiviaEditScreen,
  useUserEngivia,
  useUser,
} from "src/hooks/useSharedState";

type Props = {
  userEngivia?: EngiviaType;
};

export const EngiviaInput: FC<Props> = ({ userEngivia }) => {
  const { user } = useUser();
  const [engiviaBody, setEngiviaBody] = useState<string | undefined>(
    userEngivia?.body
  );
  const { broadcastId, setBroadcastId } = useBroadcastId();
  const { setIsEngiviaEditScreen } = useIsEngiviaEditScreen();
  const { setUserEngivia } = useUserEngivia();

  const onChangeInputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEngiviaBody(e.target.value);
  };

  const onCreateEngivia = async () => {
    if (engiviaBody) {
      const engivia = await createEngivia(broadcastId, engiviaBody, user);
      setUserEngivia(engivia);
      setIsEngiviaEditScreen(false);
      createJoinUsers(broadcastId, engivia.id, user);
    }
  };

  const onUpdateEngivia = async () => {
    if (userEngivia && engiviaBody) {
      updateEngivia(broadcastId, userEngivia.id, engiviaBody);
      setIsEngiviaEditScreen(false);
    }
  };

  const onBackBroadcasts = () => {
    setBroadcastId("");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <textarea
        name="body"
        id="body"
        cols={60}
        rows={3}
        placeholder="エンジビアを入力する"
        value={engiviaBody}
        className="p-4 mb-10 focus:outline-none"
        onChange={onChangeInputHandler}
      />
      {userEngivia ? (
        <div className="flex justify-center">
          <button
            onClick={onUpdateEngivia}
            className="items-center py-2 px-4 mr-2 text-white bg-light-blue-600 rounded-md"
          >
            保存する
          </button>
          <button
            onClick={onBackBroadcasts}
            className="py-2 px-4 mr-2 text-blue-600 bg-light-blue-100 rounded-md"
          >
            キャンセル
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            onClick={onCreateEngivia}
            className="items-center py-2 px-4 mr-2 text-white bg-light-blue-600 rounded-md"
          >
            保存する
          </button>
          <button
            onClick={onBackBroadcasts}
            className="py-2 px-4 mr-2 text-blue-600 bg-light-blue-100 rounded-md"
          >
            放送一覧に戻る
          </button>
        </div>
      )}
    </div>
  );
};
