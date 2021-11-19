import type { FC } from "react";
import { useRouter } from "next/router";
import { BroadcastItem } from "src/components/Broadcast/BroadcastItem";
import { BroadcastType } from "src/types/interface";
import { useUser } from "src/hooks/useSharedState";
import { Button } from "src/components/Button";

type Props = {
  broadcasts: BroadcastType[];
};

export const BroadcastList: FC<Props> = ({ broadcasts }) => {
  const { user } = useUser();
  const router = useRouter();

  const handleRegistration = () => {
    router.push("/admin/broadcast-registration");
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex justify-between items-center">
        <h1 className="py-10 text-4xl font-bold">放送一覧</h1>
        {user.isAdmin && (
          <Button
            isSubmitting={false}
            isPrimary={true}
            type="button"
            onClick={handleRegistration}
          >
            放送を作成する
          </Button>
        )}
      </div>
      {broadcasts.map((broadcast, index) => (
        <div key={index}>
          <BroadcastItem broadcast={broadcast} />
        </div>
      ))}
    </div>
  );
};
