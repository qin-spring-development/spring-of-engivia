import type { FC } from "react";
import { useState } from "react";
import { BroadcastItem } from "src/components/Broadcast/BroadcastItem";
import { BroadcastCreate } from "src/components/Broadcast/BroadcastCreate";
import { BroadcastType } from "src/types/interface";
import { useIsEngiviaCreateScreen } from "src/hooks/useSharedState";

type Props = {
  broadcasts: BroadcastType[];
};

export const BroadCastList: FC<Props> = ({ broadcasts }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { isEngiviaCreateScreen, setIsEngiviaCreateScreen } =
    useIsEngiviaCreateScreen();

  const onCreateBroadcast = () => {
    setIsEngiviaCreateScreen(true);
  };

  const onHandleAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div className="mx-auto max-w-3xl">
      {isEngiviaCreateScreen ? (
        <BroadcastCreate />
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <h1 className="py-10 text-4xl font-bold">放送一覧</h1>
            <div>
              <button
                onClick={onHandleAdmin}
                className="py-2 px-4 mr-2 text-gray-500 bg-gray-300 rounded-md"
              >
                {isAdmin ? "管理者" : "ユーザー"}
              </button>
              {isAdmin && (
                <button
                  onClick={onCreateBroadcast}
                  className="py-2 px-4 mr-2 text-white bg-light-blue-600 rounded-md"
                >
                  放送を作成する
                </button>
              )}
            </div>
          </div>
          {broadcasts?.map((broadcast) => {
            return (
              <div key={broadcast.id}>
                <BroadcastItem broadcast={broadcast} isAdmin={isAdmin} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
