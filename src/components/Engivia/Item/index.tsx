import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Item = ({ children, ...rest }: any) => {
  return (
    <div className="p-2 text-sm bg-white rounded shadow-sm cursor-pointer">
      {children}
    </div>
  );
};

export function SortableItem({ id, children }: any) {
  const sortable = useSortable({
    id,
  });
  const { attributes, setNodeRef, listeners, transform, transition } = sortable;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item>{children}</Item>
    </div>
  );
}
