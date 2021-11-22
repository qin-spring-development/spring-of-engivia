import type { FC, ChangeEvent, Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { createEngivia, updateEngivia, createJoinUsers } from "src/lib/db";
import { EngiviaType } from "src/types/interface";
import { Button } from "src/components/Button";
import { useUser } from "src/hooks/useSharedState";

type Props = {
  userEngivia: EngiviaType;
  broadcastId: string;
  setConfirm: Dispatch<SetStateAction<boolean>>;
};

export const EngiviaInput: FC<Props> = ({
  userEngivia,
  broadcastId,
  setConfirm,
}) => {
  const { user } = useUser();
  const [engiviaBody, setEngiviaBody] = useState<string>(userEngivia?.body);
  const handleOnChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEngiviaBody(e.target.value);
  };

  const HandleCreateEngivia = async () => {
    // await createEngivia(broadcastId, engiviaBody, user);
    const engivia = await createEngivia(broadcastId, engiviaBody, user);
    createJoinUsers(broadcastId, engivia.id, user);
    setConfirm(true);
  };

  const HandleUpdateEngivia = async () => {
    updateEngivia(broadcastId, userEngivia.id, engiviaBody);
    setConfirm(true);
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
            userEngivia.id !== "" ? HandleUpdateEngivia : HandleCreateEngivia
          }
        >
          保存する
        </Button>
      </div>
    </div>
  );
};
