export const BroadcastEnd = () => {
  const foge = [
    {
      title: "エンジビア1",
      text: "HTMLにはポータルという便利な要素がある",
      name: "松平 ケン",
      count: "85",
    },
    {
      title: "エンジビア2",
      text: "HTMLにはポータルという便利な要素がある",
      name: "松平 ケン",
      count: "85",
    },
  ];

  return (
    <div className="flex flex-col pt-10 mx-auto max-w-screen-md text-center">
      <div>
        <span className="py-1 px-3 text-sm text-gray-900 bg-gray-200 rounded-full">
          放送済み
        </span>
      </div>
      <h1 className="mt-5 text-3xl font-bold">第4回エンジビアの泉</h1>
      <input
        className="py-2 px-2 mt-5 rounded-md border-2 border-gray-300 border-solid"
        placeholder="URLを入力する"
      />
      <div className="mt-5">
        <button
          className="py-4 px-6 text-white bg-light-blue-600 rounded-lg"
          // onClick=""
        >
          保存する
        </button>
      </div>
      {foge.map((foge) => {
        return (
          <div key={foge.title} className="mt-5 bg-white rounded-md border">
            <h2 className="mt-8 text-2xl font-bold text-light-blue-700">
              {foge.title}
            </h2>
            <div className="mx-20">
              <p className="py-5 text-4xl text-left">{foge.text}</p>
            </div>
            <div className="flex justify-between mx-20 mb-10">
              <div className="flex items-end">{foge.name}</div>
              <div className="py-6 px-8 text-4xl font-bold text-light-blue-700 bg-orange-100 rounded-lg">
                {foge.count}
                <span className="text-2xl">へぇ</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
