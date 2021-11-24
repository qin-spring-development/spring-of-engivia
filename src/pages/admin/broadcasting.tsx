import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  CancelDrop,
  closestCorners,
  CollisionDetection,
  DndContext,
  KeyboardSensor,
  // Modifiers,
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
import { SortableItem } from "src/components/Engivia/SortableItem";
import { getBroadcast, getEngivias } from "src/lib/db-admin";
import { GetServerSideProps } from "next";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import {
  updateBroadcastFeatureId,
  beginBroadcast,
  endBroadcast,
  addCreateNumber,
} from "src/lib/db";
import { useSubscribeBroadcast } from "src/hooks/useSubscribe";
import { BroadcastTitle } from "src/components/Broadcast/BroadcastTitle";
import { BroadcastType, EngiviaType } from "src/types/interface";
import { Button } from "src/components/Button";
import { useUser } from "src/hooks/useSharedState";

type Items = Record<string, EngiviaType[]>;
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
  // // modifiers?: Modifiers;
  trashable?: boolean;
  vertical?: boolean;
  engivias: EngiviaType[];
  broadcast: BroadcastType;
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
    <ul ref={setNodeRef}>
      <div className="grid gap-4">{children}</div>
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

const Broadcasting = ({
  cancelDrop,
  collisionDetection = closestCorners,
  columns,
  items: initialItems,
  getContainerStyle = defaultContainerStyle,
  // modifiers,
  strategy = verticalListSortingStrategy,
  engivias,
}: Props) => {
  const [items, setItems] = useState<Items>(
    () =>
      initialItems ?? {
        フィーチャー前: engivias,
        フィーチャー中: [],
        フィーチャー後: [],
      }
  );
  const [clonedItems, setClonedItems] = useState<Items | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [inFeatureId, setInFeatureId] = useState<string>("");
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const { user } = useUser();
  const router = useRouter();
  const broadcast = useSubscribeBroadcast(router.query.id as string);
  const broadcastId = broadcast?.id as string;

  // useEffect(() => {
  //   if (!user.isAdmin) {
  //     router.push("/broadcasts");
  //   }
  // }, [router, user]);

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

  const handleTitleCall = async () => {
    await updateBroadcastFeatureId(broadcastId, inFeatureId, false);
    await addCreateNumber(broadcastId, inFeatureId);
  };

  const handleBeginBroadcast = () => {
    beginBroadcast(broadcastId);
    router.reload();
  };

  const onEndBroadcast = () => {
    endBroadcast(broadcastId);
    router.push("/broadcasts");
  };

  const handleEditBroadcast = () => {
    router.push({
      pathname: "/admin/broadcast-registration",
      query: { id: router.query.id },
    });
  };

  return (
    <BaseLayout title="放送一覧">
      <div className="mx-auto max-w-6xl">
        <div className="flex relative justify-center items-center">
          <BroadcastTitle broadcast={broadcast} />
          <div className="absolute right-0">
            {broadcast?.status === "BEFORE" ? (
              <div>
                <Button
                  isSubmitting={false}
                  isPrimary={true}
                  type="button"
                  onClick={handleBeginBroadcast}
                >
                  放送を開始する
                </Button>
                <Button
                  isSubmitting={false}
                  isPrimary={false}
                  type="button"
                  onClick={handleEditBroadcast}
                >
                  編集する
                </Button>
              </div>
            ) : (
              <button
                onClick={onEndBroadcast}
                className="py-2 px-4 mr-2 text-light-blue-700 bg-light-blue-100 rounded-md"
              >
                放送を終了する
              </button>
            )}
          </div>
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={collisionDetection}
          onDragStart={({ active }) => {
            setActiveId(active.id);
            setClonedItems(items);
          }}
          onDragOver={({ active, over }) => {
            const overId = over?.id as string;
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
                const overIndex = overItems.findIndex(
                  (item) => item.id === overId
                );
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
                    overIndex >= 0
                      ? overIndex + modifier
                      : overItems.length + 1;
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
            if (items["フィーチャー中"].length > 1) {
              console.log("だめよ");
            } else {
              console.log("いいよ");
            }
            const activeContainer = findContainer(active.id);
            if (!activeContainer) {
              setActiveId(null);
              return;
            }

            const overId = over?.id as string;
            const overContainer = findContainer(overId);
            if (activeContainer && overContainer === "フィーチャー中") {
              setInFeatureId(overId);
            } else {
              setInFeatureId("");
              updateBroadcastFeatureId(broadcastId, overId, true);
            }
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
          // // modifiers={modifiers}
        >
          <div className="inline-grid grid-cols-3 gap-4 items-start w-full h-screen">
            {Object.entries(items).map(([key, values]) => (
              <SortableContext key={key} items={values} strategy={strategy}>
                <DroppableContainer
                  id={key}
                  columns={columns}
                  items={values.map((value) => value.id)}
                  getStyle={getContainerStyle}
                >
                  <h1 className="items-center py-4 text-xl font-bold text-center bg-gray-300 rounded-md">
                    {key}
                  </h1>
                  {values.map((engivia) => (
                    <SortableItem
                      key={engivia.id}
                      engivia={engivia}
                      broadcast={broadcast}
                    />
                  ))}
                </DroppableContainer>
              </SortableContext>
            ))}
            {inFeatureId !== "" && broadcast?.status === "IN_PROGRESS" && (
              <Button
                type="button"
                isSubmitting={inFeatureId === "" ? true : false}
                isPrimary={true}
                onClick={handleTitleCall}
              >
                タイトルコールする
              </Button>
            )}
          </div>
        </DndContext>
      </div>
    </BaseLayout>
  );
};
function insert<T>(arr: T[], index: number, elem: T) {
  const copy = arr.slice();
  copy.splice(index, 0, elem);
  return copy;
}

export default Broadcasting;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const broadcastId = context.query.id as string;
  const engivias = await getEngivias(broadcastId);
  const broadcast = await getBroadcast(broadcastId);

  return {
    props: { engivias, broadcast },
  };
};
