import { AcademicCapIcon, CalendarIcon } from "@heroicons/react/solid";

export const BroadcastList = () => {
  const Datas = [
    {
      title: "第4回エンジビアの泉",
      date: "2021年9月8日",
      status: "放送中",
      count: "エンジビア数 8",
    },
    {
      title: "第3回エンジビアの泉",
      date: "2021年8月18日",
      status: "放送済み",
      count: "エンジビア数 5",
    },
    {
      title: "第2回エンジビアの泉",
      date: "2021年7月12日",
      status: "放送済み",
      count: "エンジビア数 4",
    },
    {
      title: "第1回エンジビアの泉",
      date: "2021年5月24日",
      status: "放送済み",
      count: "エンジビア数 10",
    },
  ];
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-end">
        <h1 className=" mt-10 text-3xl font-bold text-gray-900">放送一覧</h1>
      </div>
      <div className="mt-5">
        {Datas.map((data) => {
          return (
            <>
              <div className="flex justify-between py-5 px-8 bg-white rounded border border-gray-100">
                <div className="pr-64">
                  <p className="pb-2 text-blue-400">{data.title}</p>
                  <div className="flex items-center">
                    <CalendarIcon className=" h-5 text-gray-400" />
                    <p className="text-gray-400">{data.date}</p>
                  </div>
                </div>
                <div className="pl-64">
                  <p className="py-1 px-3 w-2/4 h-6 text-sm text-gray-600 bg-gray-200 rounded-full">
                    {data.status}
                  </p>
                  <div className="flex items-center">
                    <AcademicCapIcon className="pt-2 h-8 text-gray-400" />
                    <p className="pt-2 text-gray-400">{data.count}</p>
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
