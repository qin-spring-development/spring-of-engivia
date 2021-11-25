import type { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BroadcastType, EngiviaType } from "src/types/interface";
import { adjustScale } from "@dnd-kit/core/dist/utilities";

type Props = {
  engivia: EngiviaType;
  broadcast: BroadcastType | undefined;
};

export const SortableItem: FC<Props> = ({ engivia, broadcast }) => {
  const isDisable = broadcast?.status === "IN_PROGRESS" ? false : true;
  const sortable = useSortable({ id: engivia.id, disabled: isDisable });
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
