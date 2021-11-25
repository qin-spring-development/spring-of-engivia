import type { FC, ChangeEvent, Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createEngivia, updateEngivia } from "src/lib/db";
import { EngiviaType } from "src/types/interface";
import { Button } from "src/components/Button";
import { useUser } from "src/hooks/useSharedState";
import { engiviaSchema } from "src/lib/yupSchema/engiviaSchema";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(engiviaSchema) });

  const handleOnChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEngiviaBody(e.target.value);
  };

  const HandleEngivia = async (data: { engivia: string }) => {
    if (userEngivia.id !== "") {
      updateEngivia(broadcastId, userEngivia.id, data.engivia);
      setConfirm(true);
    } else {
      await createEngivia(broadcastId, data.engivia, user);
      setConfirm(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit(HandleEngivia)}>
        {errors.engivia?.message ? (
          <span className="text-red-500">{errors.engivia?.message}</span>
        ) : (
          <div className="h-6"></div>
        )}
        <div className="flex flex-col">
          <textarea
            id="engivia"
            cols={60}
            rows={3}
            placeholder="エンジビアを入力する"
            value={engiviaBody}
            className="p-4 mt-2 rounded-md border border-gray-300 focus:ring focus:outline-none"
            {...register("engivia", { required: true, maxLength: 100 })}
            onChange={handleOnChangeInput}
          />
        </div>
        <div className="flex justify-center mt-5">
          <Button
            isSubmitting={false}
            type="submit"
            isPrimary={true}
            // onClick={
            //   userEngivia.id !== "" ? HandleUpdateEngivia : HandleCreateEngivia
            // }
          >
            保存する
          </Button>
        </div>
      </form>
    </div>
  );
};
