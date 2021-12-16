import type { FC, Dispatch, SetStateAction } from "react";
import { useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createEngivia, updateEngivia } from "src/lib/db";
import { EngiviaType } from "src/types/interface";
import { Button } from "src/components/Button";
import { TextArea } from "src/components/Form/TextArea";
import schemas from "src/lib/yupSchema/engiviaSchema";
import { useSession } from "next-auth/client";
import { User } from "next-auth";

type Props = {
  userEngivia: EngiviaType;
  broadcastId: string;
  setConfirm: Dispatch<SetStateAction<boolean>>;
};

type EngiviaForm = {
  engivia: string;
};

export const EngiviaInput: FC<Props> = ({
  userEngivia,
  broadcastId,
  setConfirm,
}) => {
  const [session] = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EngiviaForm>({
    resolver: yupResolver(schemas().pick(["engivia"])),
  });

  const HandleEngivia: SubmitHandler<EngiviaForm> = useCallback(
    async (data) => {
      if (userEngivia.id !== "") {
        updateEngivia(broadcastId, userEngivia.id, data.engivia);
        setConfirm(true);
      } else {
        await createEngivia(broadcastId, data.engivia, session?.user as User);
        setConfirm(true);
      }
    },
    [broadcastId, session?.user, setConfirm, userEngivia.id]
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit(HandleEngivia)}>
        <TextArea
          id="engivia"
          cols={60}
          rows={3}
          value={userEngivia.body}
          placeholder="エンジビアを入力する"
          register={register("engivia")}
          className="p-4 mt-2 rounded-md border border-gray-300 focus:ring focus:outline-none"
        />
        {errors.engivia?.message && (
          <span className="text-base text-red-500">
            {errors.engivia?.message}
          </span>
        )}
        <div className="flex justify-center mt-5">
          <Button type="submit" isPrimary>
            保存する
          </Button>
        </div>
      </form>
    </div>
  );
};
