import { AcademicCapIcon, CalendarIcon } from "@heroicons/react/solid";

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
    <div className="flex flex-col justify-center items-center">
      <h1 className="mt-10 text-3xl font-bold text-gray-900">放送一覧</h1>
      <div className="mt-5   ">
        {Datas.map((data) => {
          return (
            <>
              <div className="">
                <p className="text-sm text-blue-400">{data.title}</p>
                <div className="flex items-center">
                  <CalendarIcon className="h-5 text-gray-400" />
                  <p className="text-sm text-gray-400">{data.date}</p>
                </div>
                <div className="">
                  <p className="py-3 px-6 text-gray-600 rounded-full">
                    {data.state}
                  </p>
                  <div className="flex items-center">
                    <AcademicCapIcon className="h-5 text-gray-400" />
                    <p className="text-sm text-gray-400">{data.count}</p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};
