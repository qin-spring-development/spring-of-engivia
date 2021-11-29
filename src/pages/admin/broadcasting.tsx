import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  closestCorners,
  CollisionDetection,
  DndContext,
  PointerSensor,
  useDroppable,
  useSensors,
  useSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
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
  incrementEngiviaNumber,
  updateEngiviaFeatureStatus,
} from "src/lib/db";
import { useSubscribeBroadcast } from "src/hooks/useSubscribe";
import { BroadcastTitle } from "src/components/Broadcast/BroadcastTitle";
import { BroadcastType, EngiviaType } from "src/types/interface";
import { Button } from "src/components/Button";
import { useUser } from "src/hooks/useSharedState";

type Items = Record<string, EngiviaType[]>;
interface Props {
  collisionDetection?: CollisionDetection;
  strategy?: SortingStrategy;
  items?: Items;
  engivias: EngiviaType[];
  broadcast: BroadcastType;
}

function insert<T>(arr: T[], index: number, elem: T) {
  const copy = arr.slice();
  copy.splice(index, 0, elem);
  return copy;
}

const DroppableContainer = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
  items: string[];
}) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <ul ref={setNodeRef}>
      <div className="grid gap-4">{children}</div>
    </ul>
  );
};

const Broadcasting = ({
  collisionDetection = closestCorners,
  strategy = verticalListSortingStrategy,
  engivias,
}: Props) => {
  const getContainerName = (key: string): string => {
    switch (key) {
      case "before":
        return "フィーチャー前";
      case "inFeature":
        return "フィーチャー中";
      case "done":
        return "フィーチャー後";
      default:
        return "";
    }
  };

  const beforeEngivias = engivias.filter((v) => v.featureStatus == "BEFORE");
  const featureEngivias = engivias.filter(
    (v) => v.featureStatus == "IN_FEATURE"
  );
  const doneEngivias = engivias.filter((val) => val.featureStatus == "DONE");

  const [items, setItems] = useState<Items>({
    before: beforeEngivias,
    inFeature: featureEngivias,
    done: doneEngivias,
  });

  const [clonedItems, setClonedItems] = useState<Items | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [inFeatureId, setInFeatureId] = useState<string>(
    items.inFeature[0] ? items.inFeature[0].id : ""
  );
  const sensors = useSensors(useSensor(PointerSensor));
  const { user } = useUser();
  const router = useRouter();
  const broadcast = useSubscribeBroadcast(router.query.id as string);
  const broadcastId = broadcast?.id as string;

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
    await incrementEngiviaNumber(broadcastId, inFeatureId);
    await updateBroadcastFeatureId(broadcastId, inFeatureId);
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

  useEffect(() => {
    return () => {
      items.before.forEach((engivia) =>
        updateEngiviaFeatureStatus(broadcastId, engivia.id, "BEFORE")
      );

      items.inFeature.forEach((engivia) =>
        updateEngiviaFeatureStatus(broadcastId, engivia.id, "IN_FEATURE")
      );

      items.done.forEach((engivia) =>
        updateEngiviaFeatureStatus(broadcastId, engivia.id, "DONE")
      );
    };
  });

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
              <Button
                isSubmitting={false}
                isPrimary={false}
                type="button"
                onClick={onEndBroadcast}
              >
                放送を終了する
              </Button>
            )}
          </div>
        </div>
        <div className="relative">
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
              const activeContainer = findContainer(active.id);
              if (!activeContainer) {
                setActiveId(null);
                return;
              }

              const overId = over?.id as string;
              const overContainer = findContainer(overId);

              switch (overContainer) {
                case "before": {
                  setInFeatureId("");
                  updateBroadcastFeatureId(broadcastId);
                  break;
                }
                case "inFeature":
                  setInFeatureId(overId);
                  break;
                case "done":
                  setInFeatureId("");
                  updateBroadcastFeatureId(broadcastId);
                  break;
              }

              if (overContainer) {
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
            onDragCancel={onDragCancel}
          >
            <div className="inline-grid grid-cols-3 gap-4 items-start w-full h-screen">
              {Object.entries(items).map(([key, values]) => (
                <SortableContext key={key} items={values} strategy={strategy}>
                  <DroppableContainer
                    id={key}
                    items={values.map((value) => value.id)}
                  >
                    <h1 className="items-center py-4 text-xl font-bold text-center bg-gray-300 rounded-md">
                      {getContainerName(key)}
                    </h1>
                    {values.map((engivia) => (
                      <SortableItem
                        key={engivia.id}
                        engivia={engivia}
                        broadcast={broadcast}
                        inFeatureId={inFeatureId}
                      />
                    ))}
                    {inFeatureId === "" &&
                      broadcast?.status === "IN_PROGRESS" &&
                      key === "inFeature" && (
                        <div className="py-8 px-4 text-center rounded-md border-2 border-gray-300 border-dashed">
                          <span className="text-lg text-gray-400">
                            フィーチャーする
                          </span>
                        </div>
                      )}
                    {broadcast?.status === "IN_PROGRESS" &&
                      key === "done" &&
                      broadcast.engiviaCurrentCount !== null && (
                        <div className="py-8 px-4 text-center rounded-md border-2 border-gray-300 border-dashed">
                          <span className="text-lg text-gray-400">
                            フィーチャーを終える
                          </span>
                        </div>
                      )}
                    {inFeatureId !== "" &&
                      broadcast?.status === "IN_PROGRESS" &&
                      key === "inFeature" && (
                        <div className="mx-auto">
                          <Button
                            type="button"
                            isSubmitting={inFeatureId === "" ? true : false}
                            isPrimary={true}
                            onClick={handleTitleCall}
                          >
                            タイトルコールする
                          </Button>
                        </div>
                      )}
                  </DroppableContainer>
                </SortableContext>
              ))}
            </div>
          </DndContext>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Broadcasting;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const broadcastId = context.query.id as string;
  const engivias = await getEngivias(broadcastId);
  const broadcast = await getBroadcast(broadcastId);

  return {
    props: { engivias, broadcast },
  };
};
