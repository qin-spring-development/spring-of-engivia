// import { title } from "process";

export const BroadcastList = () => {
  const Datas = [
    {
      title: "第4回エンジビアの泉",
      date: "2021年9月8日",
      state: "放送中",
      count: "エンジビア数 8",
    },
    {
      title: "第3回エンジビアの泉",
      date: "2021年8月18日",
      state: "放送済み",
      count: "エンジビア数 5",
    },
    {
      title: "第2回エンジビアの泉",
      date: "2021年7月12日",
      state: "放送済み",
      count: "エンジビア数 4",
    },
    {
      title: "第1回エンジビアの泉",
      date: "2021年5月24日",
      state: "放送済み",
      count: "エンジビア数 10",
    },
  ];
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-gray-900">放送一覧</h1>
      {Datas.map((data) => {
        return (
          <>
            <p className="text-sm text-blue-400">{data.title}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="flex-1 w-5 h-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-gray-400">{data.date}</p>
            <p className="py-3 px-6 text-gray-600 rounded-full">{data.state}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            <p className="text-sm text-gray-400">{data.count}</p>
          </>
        );
      })}
    </div>
  );
};
