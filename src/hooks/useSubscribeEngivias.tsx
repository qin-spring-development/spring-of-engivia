import { useState, useEffect } from "react";
import { db } from "src/lib/firebase";
import { EngiviaType } from "src/types/interface";

export const useSubscribeEngivias = (broadcastId: string) => {
  const [engivias, setEngivias] = useState<EngiviaType[]>();

  useEffect(() => {
    const unsubscribe = db
      .collection("broadcasts")
      .doc(broadcastId)
      .collection("engivias")
      .onSnapshot((snapshots) => {
        const engivias = snapshots.docChanges().map((snapshot) => {
          return snapshot.doc.data() as EngiviaType;
        });
        setEngivias(engivias);
      });
    return () => unsubscribe();
  }, []);

  return engivias;
};
