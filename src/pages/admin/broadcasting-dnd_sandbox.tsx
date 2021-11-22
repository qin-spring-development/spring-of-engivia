import React from "react";
import { createPortal } from "react-dom";
import {
  CancelDrop,
  closestCorners,
  CollisionDetection,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  Modifiers,
  PointerSensor,
  useDroppable,
  UniqueIdentifier,
  useSensors,
  useSensor,
  defaultDropAnimation,
  DropAnimation,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  SortingStrategy,
} from "@dnd-kit/sortable";

import { Item, SortableItem } from "src/components/Engivia/Item";

const defaultInitializer = (index: number) => index;

export function createRange<T = number>(
  length: number,
  initializer: (index: number) => any = defaultInitializer
): T[] {
  return [...new Array(length)].map((_, index) => initializer(index));
}
// export default {
//   title: "Presets/Sortable/Multiple Containers",
// };

function DroppableContainer({
  children,
  columns = 1,
  id,
  items,
  getStyle = () => ({}),
}: {
  children: React.ReactNode;
  columns?: number;
  id: string;
  items: string[];
  getStyle: ({
    isOverContainer,
  }: {
    isOverContainer: boolean;
  }) => React.CSSProperties;
}) {
  const { over, isOver, setNodeRef } = useDroppable({
    id,
  });
  const isOverContainer = isOver || (over ? items.includes(over.id) : false);

  return (
    <ul ref={setNodeRef} className={"p-2 bg-gray-200 rounded"}>
      <div className="flex justify-between py-1">
        <h3 className="text-sm ">Completed</h3>
      </div>
      <div className="grid gap-2 mt-2 text-sm">{children}</div>
    </ul>
  );
}
const dropAnimation: DropAnimation = {
  ...defaultDropAnimation,
  dragSourceOpacity: 0.5,
};
export const defaultContainerStyle = ({
  isOverContainer,
}: {
  isOverContainer: boolean;
}) => ({
  marginTop: 40,
  backgroundColor: isOverContainer
    ? "rgb(235,235,235,1)"
    : "rgba(246,246,246,1)",
});

type Items = Record<string, string[]>;

interface Props {
  adjustScale?: boolean;
  cancelDrop?: CancelDrop;
  collisionDetection?: CollisionDetection;
  columns?: number;
  getItemStyles?(args: {
    value: UniqueIdentifier;
    index: number;
    overIndex: number;
    isDragging: boolean;
    containerId: UniqueIdentifier;
    isSorting: boolean;
    isDragOverlay: boolean;
  }): React.CSSProperties;
  wrapperStyle?(args: { index: number }): React.CSSProperties;
  getContainerStyle?(args: { isOverContainer: boolean }): React.CSSProperties;
  itemCount?: number;
  items?: Items;
  handle?: boolean;
  renderItem?: any;
  strategy?: SortingStrategy;
  modifiers?: Modifiers;
  trashable?: boolean;
  vertical?: boolean;
}

export const VOID_ID = "void";

export function MultipleContainers({
  itemCount = 3,
  cancelDrop,
  collisionDetection = closestCorners,
  columns,
  items: initialItems,
  getContainerStyle = defaultContainerStyle,
  modifiers,
  strategy = verticalListSortingStrategy,
  trashable = false,
  vertical = false,
}: Props) {
  const [items, setItems] = React.useState<Items>(
    () =>
      initialItems ?? {
        フィーチャー前: createRange(itemCount, (index) => `A${index + 1}`),
        フィーチャー中: createRange(itemCount, (index) => `B${index + 1}`),
        フィーチャー後: createRange(itemCount, (index) => `C${index + 1}`),
      }
  );
  const [clonedItems, setClonedItems] = React.useState<Items | null>(null);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const findContainer = (id: string) => {
    if (id in items) {
      return id;
    }

    const container = Object.keys(items).find((key) => items[key].includes(id));
    return container;
  };

  const onDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containrs
      setItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={({ active }) => {
        setActiveId(active.id);
        setClonedItems(items);
      }}
      onDragOver={({ active, over }) => {
        const overId = over?.id;
        if (!overId) {
          return;
        }

        const overContainer = findContainer(overId);
        const activeContainer = findContainer(active.id);

        if (!overContainer || !activeContainer) {
          return;
        }

        if (activeContainer !== overContainer) {
          setItems((items) => {
            const activeItems = items[activeContainer];
            const overItems = items[overContainer];
            const overIndex = overItems.indexOf(overId);
            const activeIndex = activeItems.indexOf(active.id);

            let newIndex: number;

            if (overId in items) {
              newIndex = overItems.length + 1;
            } else {
              const isBelowLastItem =
                over &&
                overIndex === overItems.length - 1 &&
                active.rect.current.translated &&
                active.rect.current.translated.offsetTop >
                  over.rect.offsetTop + over.rect.height;

              const modifier = isBelowLastItem ? 1 : 0;
              newIndex =
                overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            return {
              ...items,
              [activeContainer]: [
                ...items[activeContainer].filter((item) => item !== active.id),
              ],
              [overContainer]: insert(
                items[overContainer],
                newIndex,
                items[activeContainer][activeIndex]
              ),
              // [overContainer]: [
              //   ...items[overContainer].slice(0, newIndex),
              //   items[activeContainer][activeIndex],
              //   ...items[overContainer].slice(
              //     newIndex,
              //     items[overContainer].length
              //   )
              // ]
            };
          });
        }
      }}
      onDragEnd={({ active, over }) => {
        const activeContainer = findContainer(active.id);
        if (!activeContainer) {
          setActiveId(null);
          return;
        }

        const overId = over?.id as string;

        // if (overId === VOID_ID) {
        //   setItems((items) => ({
        //     ...(trashable && over?.id === VOID_ID ? items : clonedItems),
        //     [VOID_ID]: [],
        //   }));
        //   setActiveId(null);
        //   return;
        // }

        const overContainer = findContainer(overId);

        if (activeContainer && overContainer) {
          const activeIndex = items[activeContainer].indexOf(active.id);
          const overIndex = items[overContainer].indexOf(overId);

          if (activeIndex !== overIndex) {
            setItems((items) => ({
              ...items,
              [overContainer]: arrayMove(
                items[overContainer],
                activeIndex,
                overIndex
              ),
            }));
          }
        }

        setActiveId(null);
      }}
      cancelDrop={cancelDrop}
      onDragCancel={onDragCancel}
      modifiers={modifiers}
    >
      <div className="inline-grid grid-flow-col gap-4 items-start p-8 w-full h-screen font-sans bg-blue-400">
        {Object.keys(items).map((containerId) => {
          return (
            <SortableContext
              key={containerId}
              items={items[containerId]}
              strategy={strategy}
            >
              <DroppableContainer
                id={containerId}
                columns={columns}
                items={items[containerId]}
                getStyle={getContainerStyle}
              >
                {items[containerId].map((value, index) => {
                  return (
                    <SortableItem key={value} id={value}>
                      {value}
                    </SortableItem>
                  );
                })}
              </DroppableContainer>
            </SortableContext>
          );
        })}
      </div>
      {createPortal(
        <DragOverlay dropAnimation={dropAnimation} adjustScale={true}>
          {activeId ? <Item id={activeId}>{activeId}</Item> : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}
function insert<T>(arr: T[], index: number, elem: T) {
  const copy = arr.slice();
  copy.splice(index, 0, elem);
  return copy;
}

export default MultipleContainers;
