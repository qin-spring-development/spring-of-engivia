import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Item = ({ children, ...rest }: any) => {
  return (
    <div className={`bg-white p-2 rounded cursor-pointer text-sm`}>
      {children}
    </div>
  );
};

export function SortableItem({ id, children }: any) {
  const sortable = useSortable({
    id,
  });
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = sortable;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item>{children}</Item>
    </div>
  );
}
