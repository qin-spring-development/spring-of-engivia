import type { FC } from "react";
import { db, firebase } from "src/lib/firebase";
import { EngiviaType } from "src/types/interface";

type Props = {
  engivia: EngiviaType;
  broadcastId: string;
  index: number;
};

export const BroadcastFeatureItem: FC<Props> = (props) => {
  const { body, totalLikes, postUser, id, featureStatus } = props.engivia;

  const handleClick = () => {
    const docRef = db
      .collection("broadcasts")
      .doc(props.broadcastId)
      .collection("engivias")
      .doc(id);
    docRef.update({ totalLikes: firebase.firestore.FieldValue.increment(1) });
  };

  return (
    <div>
      <div className="py-7 px-10 mb-2 bg-white rounded-lg">
        <div className="flex flex-col items-center mb-10">
          <p className="mb-5 text-xl font-bold text-[#0284C7]">
            {`エンジビア${props.index + 1}`}
          </p>
          <p className="text-4xl">{body}</p>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex items-center">
            <img
              className="mr-2 h-8 rounded-full"
              src={postUser?.photoUrl}
              alt="avatar"
            />
            <span>{postUser?.name ? postUser?.name : "No name"}</span>
          </div>
          <div className="inline py-3 px-10 text-4xl font-bold text-[#0284C7] bg-[#FEF3C7] rounded-lg">
            <span>{totalLikes}</span>
            <span className="text-xl">へえ</span>
          </div>
        </div>
      </div>
      <div className="flex items-center my-10">
        <button
          className="py-2 px-4 text-white bg-red-500 rounded-lg"
          onClick={handleClick}
        >
          へえボターン
        </button>
        <div className="inline ml-10 text-4xl font-bold text-[#0284C7]">
          <span>{totalLikes}</span>
          <span className="text-xl">へえ</span>
        </div>
      </div>
    </div>
  );
};
