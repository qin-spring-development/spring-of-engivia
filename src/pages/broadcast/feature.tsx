import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "src/lib/firebase";
import { BroadcastFeatureList } from "src/components/BroadcastFeatureList";
import { EngiviaType } from "src/types/interface";

const InFeature = () => {
  const router = useRouter();
  const broadcastId = router.query.id as string;
  const [engivias, setEngivias] = useState<EngiviaType[]>([]);

  useEffect(() => {
    db.collection("broadcasts")
      .doc(broadcastId)
      .collection("engivias")
      .onSnapshot((snapshot) =>
        setEngivias(snapshot.docs.map((doc) => doc.data()) as EngiviaType[])
      );
  }, [broadcastId]);

  return (
    <div className="h-screen bg-gray-100">
      <BroadcastFeatureList engivias={engivias} broadcastId={broadcastId} />
    </div>
  );
};

export default InFeature;
