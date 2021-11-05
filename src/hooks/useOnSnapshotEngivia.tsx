import { useState, useEffect } from "react";
import { db } from "src/lib/firebase";
import { EngiviaType } from "src/types/interface";
import { getEngivia } from "src/lib/db";

export const useOnSnapshotEngivia = (broadcastId: string) => {
  const [engivia, setEngivia] = useState<EngiviaType | null>();

  useEffect(() => {
    db.collection("broadcasts")
      .doc(broadcastId)
      .onSnapshot(async (doc) => {
        const broadcast = doc.data();
        if (broadcast?.featureId === null) {
          setEngivia(null);
        } else {
          const engivia = (await getEngivia(
            broadcastId,
            broadcast?.featureId
          )) as EngiviaType;
          setEngivia(engivia);
        }
      });
  }, []);

  return engivia;
};
