import { forwardRef } from "react";
import { JoinUserType } from "src/types/interface";

type Props = {
  joinUsers: JoinUserType[];
};

// eslint-disable-next-line react/display-name
export const EngiviaJoinUsers = forwardRef<HTMLDivElement, Props>(
  ({ joinUsers }, ref) => {
    return (
      <div
        className="overflow-y-auto absolute top-0 right-0 mt-5 mr-6 mb-3 h-60 divide-y"
        ref={ref}
      >
        {joinUsers.map((joinUser) => (
          <div key={joinUser.id}>
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
    );
  }
);
