import type { FC } from "react";
import { useEffect, useState } from "react";
import { db } from "src/lib/firebase";
import { BroadcastType } from "src/types/interface";
import { BroadcastItem } from "src/components/BroadcastItem";

export const BroadCastList: FC = () => {
  const [broadcasts, setBroadcasts] = useState<BroadcastType[]>([]);

  useEffect(() => {
    // snapshot.docsは、firestoreのbroadcasts全てを配列でリアルタイムに取得

    db.collection("broadcasts").onSnapshot((snapshot) =>
      setBroadcasts(snapshot.docs.map((doc) => doc.data()) as BroadcastType[])
    );
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="mt-10">
        {broadcasts?.map((broadcast) => {
          return (
            <div key={broadcast.id}>
              <BroadcastItem broadcast={broadcast} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
