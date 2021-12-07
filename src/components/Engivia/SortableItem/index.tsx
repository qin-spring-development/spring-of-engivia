import type { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BroadcastType, EngiviaType } from "src/types/interface";
import {
  useSubscribeJoinUsers,
  useSubscribeTotalLikes,
} from "src/hooks/useSubscribe";

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
  const totalLikes = useSubscribeTotalLikes(
    broadcast?.id as string,
    engivia.id
  );
  const joinUsersCount = useSubscribeJoinUsers(
    broadcast?.id as string,
    engivia.id
  ).length;

  const currentTotalLikes =
    Math.round((totalLikes / joinUsersCount) * 5 * 10) / 10;

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
        <div className="flex flex-row justify-between items-baseline">
          <div>
            <span className="text-lg">{engivia.body}</span>
            <div className="flex items-center mt-4">
              <img
                className="mr-1 h-5 rounded-full"
                src={engivia.postUser.image}
                alt="avatar"
              />
              <span className="text-sm">
                {engivia.postUser.name.length > 18
                  ? `${engivia.postUser.name.slice(0, 18)}…`
                  : engivia.postUser.name}
              </span>
            </div>
          </div>
          {inFeatureId === engivia.id && (
            <div className="flex flex-col space-y-2">
              <span className="py-1 px-2 text-xs text-gray-600 bg-gray-200 rounded-full">
                {`人: ${joinUsersCount}`}
              </span>
              <span className="py-1 px-2 text-xs text-gray-600 bg-gray-200 rounded-full">
                {`数: ${currentTotalLikes ? currentTotalLikes : 0}`}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
