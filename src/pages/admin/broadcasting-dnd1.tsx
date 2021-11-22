import React from "react";
import {
  CancelDrop,
  closestCorners,
  CollisionDetection,
  DndContext,
  KeyboardSensor,
  Modifiers,
  PointerSensor,
  useDroppable,
  UniqueIdentifier,
  useSensors,
  useSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  SortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "src/components/Engivia/Item";

type TestType = {
  id: string;
  name: string;
};

type Items = Record<string, TestType[]>;

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

const DroppableContainer = ({
  children,
  id,
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
}) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <ul ref={setNodeRef} className={"p-2 bg-gray-200 rounded"}>
      <div className="grid gap-2 mt-2 text-sm">{children}</div>
    </ul>
  );
};

const defaultContainerStyle = ({
  isOverContainer,
}: {
  isOverContainer: boolean;
}) => ({
  marginTop: 40,
  backgroundColor: isOverContainer
    ? "rgb(235,235,235,1)"
    : "rgba(246,246,246,1)",
});

const MultipleContainers = ({
  cancelDrop,
  collisionDetection = closestCorners,
  columns,
  items: initialItems,
  getContainerStyle = defaultContainerStyle,
  modifiers,
  strategy = verticalListSortingStrategy,
}: Props) => {
  const [items, setItems] = React.useState<Items>(
    () =>
      initialItems ?? {
        フィーチャー前: [
          { id: "1", name: "one" },
          { id: "2", name: "twe" },
          { id: "3", name: "three" },
        ],
        フィーチャー中: [
          { id: "4", name: "four" },
          { id: "5", name: "five" },
          { id: "6", name: "six" },
        ],
        フィーチャー後: [
          { id: "7", name: "seven" },
          { id: "8", name: "eight" },
          { id: "9", name: "nine" },
        ],
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
    const container = Object.keys(items).find((key) =>
      items[key].find((value) => value.id === id)
    );
    return container;
  };

  const onDragCancel = () => {
    if (clonedItems) {
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
            const overIndex = overItems.findIndex((item) => item.id === overId);
            const activeIndex = activeItems.findIndex(
              (item) => item.id === active.id
            );

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
                ...items[activeContainer].filter(
                  (item) => item.id !== active.id
                ),
              ],
              [overContainer]: insert(
                items[overContainer],
                newIndex,
                items[activeContainer][activeIndex]
              ),
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

        const overContainer = findContainer(overId);

        if (activeContainer && overContainer) {
          const activeIndex = items[activeContainer].findIndex(
            (item) => item.id === active.id
          );
          const overIndex = items[overContainer].findIndex(
            (item) => item.id === overId
          );

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
        {Object.entries(items).map(([key, values]) => (
          <SortableContext key={key} items={values} strategy={strategy}>
            <DroppableContainer
              id={key}
              columns={columns}
              items={values.map((value) => value.id)}
              getStyle={getContainerStyle}
            >
              <h1>{key}</h1>
              {values.map((item) => (
                <SortableItem key={item.id} id={item.id}>
                  {item.name}
                </SortableItem>
              ))}
            </DroppableContainer>
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
};
function insert<T>(arr: T[], index: number, elem: T) {
  const copy = arr.slice();
  copy.splice(index, 0, elem);
  return copy;
}

export default MultipleContainers;
