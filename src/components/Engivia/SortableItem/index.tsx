import type { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSubscribeEngivia } from "src/hooks/useSubscribe";
import { BroadcastType, EngiviaType } from "src/types/interface";

type Props = {
  engivia: EngiviaType;
  broadcast: BroadcastType | undefined;
  inFeatureId: string | undefined;
};

export const SortableItem: FC<Props> = ({
  engivia,
  broadcast,
  inFeatureId,
}) => {
  const snapshotEngivia = useSubscribeEngivia(
    broadcast?.id as string,
    engivia.id
  );

  const isDisable = (engiviaId: string) => {
    /** 放送中でなければ、移動不可 */
    if (broadcast?.status !== "IN_PROGRESS") {
      return true;
    }
    /** feature中のidがある場合、他のengiviaの移動は不可 */
    if (inFeatureId !== "" && inFeatureId !== engiviaId) {
      return true;
    }
    return false;
  };
  const sortable = useSortable({
    id: engivia.id,
    disabled: isDisable(engivia.id),
  });
  const { attributes, setNodeRef, listeners, transform, transition } = sortable;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="z-10 py-4 px-4 bg-white rounded-md shadow-md">
        <span className="text-lg">{engivia.body}</span>
        <div className="flex items-center mt-3">
          <img
            className="mr-1 h-5 rounded-full"
            src={engivia.postUser.image}
            alt="avatar"
          />
          <span className="text-sm">{engivia.postUser.name}</span>
        </div>
        <div className="mt-3 text-right">
          <span className="py-1 px-2 mr-2 text-xs text-gray-600 bg-gray-200 rounded-full">
            {`参加人数: ${
              snapshotEngivia?.joinUsersCount
                ? snapshotEngivia?.joinUsersCount
                : 0
            }`}
          </span>
          <span className="py-1 px-2 text-xs text-gray-600 bg-gray-200 rounded-full">
            {`エンジビア数: ${
              snapshotEngivia?.totalLikes ? snapshotEngivia?.totalLikes : 0
            }`}
          </span>
        </div>
      </div>
    </div>
  );
};
