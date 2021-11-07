import { AcademicCapIcon, CalendarIcon } from "@heroicons/react/solid";

export const BroadcastList = () => {
  const Datas = [
    {
      title: "第4回エンジビアの泉",
      date: "2021年9月8日",
      status: "放送前・エンジビア募集中",
      count: "8",
    },
    {
      title: "第3回エンジビアの泉",
      date: "2021年8月18日",
      status: "放送中",
      count: "5",
    },
    {
      title: "第2回エンジビアの泉",
      date: "2021年7月12日",
      status: "放送済み",
      count: "4",
    },
    {
      title: "第1回エンジビアの泉",
      date: "2021年5月24日",
      status: "放送済み",
      count: "10",
    },
  ];
  return (
    <div className="flex flex-col mx-auto max-w-4xl">
      <div className="flex ">
        <h1 className=" mt-10 text-3xl font-bold text-gray-900">放送一覧</h1>
      </div>
      <div className="mt-5">
        {Datas.map((data) => {
          return (
            <>
              <div className="flex justify-between py-5 px-8 bg-white rounded border border-gray-100">
                <div>
                  <p className="pb-2 text-blue-400">{data.title}</p>
                  <div className="flex items-center">
                    <CalendarIcon className=" h-5 text-gray-400" />
                    <p className="text-gray-400">{data.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`py-1 px-3 text-sm rounded-full ${
                      data.status === "放送前・エンジビア募集中"
                        ? "text-orange-700 bg-orange-100"
                        : data.status === "放送中"
                        ? "text-green-700 bg-green-100"
                        : "text-gray-900 bg-gray-200"
                    }`}
                  >
                    {data.status}
                  </span>
                  <div className="flex justify-end">
                    <AcademicCapIcon className="pt-2 h-8 text-gray-400" />
                    <span className="pt-2 text-gray-400">
                      エンジビア数{data.count}
                    </span>
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
