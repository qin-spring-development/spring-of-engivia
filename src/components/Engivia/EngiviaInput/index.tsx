import type { FC, ChangeEvent, Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { createEngivia, updateEngivia, createJoinUsers } from "src/lib/db";
import { EngiviaType, BroadcastType } from "src/types/interface";
import { Button } from "src/components/Button";
import { useUser } from "src/hooks/useSharedState";
import router from "next/router";

type Props = {
  userEngivia: EngiviaType;
  broadcast: BroadcastType;
  engiviaBody: string;
  setEngiviaBody: Dispatch<SetStateAction<string>>;
};

export const EngiviaInput: FC<Props> = ({
  userEngivia,
  broadcast,
  engiviaBody,
  setEngiviaBody,
}) => {
  const { user } = useUser();
  const handleOnChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEngiviaBody(e.target.value);
  };

  const HandleCreateEngivia = async () => {
    const engivia = await createEngivia(broadcast.id, engiviaBody, user);
    createJoinUsers(broadcast.id, engivia.id, user);
    alert("保存しました");
    router.push("/broadcasts");
  };

  const HandleUpdateEngivia = async () => {
    updateEngivia(broadcast.id, userEngivia.id, engiviaBody);
    alert("変更しました");
    router.push("/broadcasts");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <textarea
        name="body"
        id="body"
        cols={60}
        rows={3}
        placeholder="エンジビアを入力する"
        value={engiviaBody}
        className="p-4 mb-10 focus:outline-none"
        onChange={handleOnChangeInput}
      />
      <div className="flex justify-center">
        <Button
          isSubmitting={false}
          type="button"
          isPrimary={true}
          onClick={
            userEngivia === undefined
              ? HandleCreateEngivia
              : HandleUpdateEngivia
          }
        >
          保存する
        </Button>
      </div>
    </div>
  );
};
