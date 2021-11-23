import { FC } from "react";
import { JoinUserType } from "src/types/interface";

type Props = {
  joinUsers: JoinUserType[];
};

export const EngiviaJoinUsers: FC<Props> = ({ joinUsers }) => {
  return (
    <div>
      <div className="absolute top-0 right-0 mt-5 mb-3 divide-y">
        {joinUsers.map((joinUser) => (
          <div key={joinUser.uid}>
            <div className="flex justify-between items-center my-3">
              <div className="flex items-center">
                <img
                  className="mr-2 h-10 rounded-full"
                  src={joinUser.image}
                  alt="avatar"
                />
                <h1>{joinUser.name}</h1>
              </div>
              <span className="py-1 px-3 text-sm text-gray-700 bg-white rounded-full border-2">
                {`${joinUser.likes} へえ`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
