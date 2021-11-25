import type { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BroadcastType, EngiviaType } from "src/types/interface";
import { adjustScale } from "@dnd-kit/core/dist/utilities";

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
    // opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="z-10 py-4 px-4 bg-white rounded-md shadow-md">
        <span className="text-lg">{engivia.body}</span>
        <div className="flex items-center mt-4">
          <img
            className="mr-2 h-6 rounded-full"
            src={engivia.postUser.image}
            alt="avatar"
          />
          <span>{engivia.postUser.name}</span>
        </div>
      </div>
    </div>
  );
};
