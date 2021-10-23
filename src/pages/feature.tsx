interface EngiviaData {
  text: string;
  image: string;
  name: string;
  id: number;
}

const Feature = () => {
  const FeatureText: string[] = [
    "フィーチャー前",
    "フィーチャー中",
    "フィーチャー済み",
  ];

  const beforeFeatureData: EngiviaData[] = [
    {
      text: "HTMLにはポータルという便利な要素がある",
      image: "15007672.jpeg",
      name: "松平ケン",
      id: 12345678,
    },
    {
      text: "HTMLにはポータルという便利な要素がある",
      image: "15007672.jpeg",
      name: "松平ケン",
      id: 123456789,
    },
    {
      text: "HTMLにはポータルという便利な要素がある",
      image: "15007672.jpeg",
      name: "松平ケン",
      id: 1234567890,
    },
    {
      text: "HTMLにはポータルという便利な要素がある",
      image: "15007672.jpeg",
      name: "松平ケン",
      id: 12345678901,
    },
  ];

  const featuringData: EngiviaData[] = [];

  const afterFeatureData: EngiviaData[] = [
    {
      text: "HTMLにはポータルという便利な要素がある",
      image: "15007672.jpeg",
      name: "松平ケン",
      id: 12345678,
    },
    {
      text: "HTMLにはポータルという便利な要素がある",
      image: "15007672.jpeg",
      name: "松平ケン",
      id: 1234567,
    },
  ];

  return (
    <div className="container mx-auto h-screen bg-gray-100">
      <div className="flex justify-between items-center pt-20">
        <div className="pl-80 mx-auto text-center">
          {/* <p className='text-[#065F46] bg-[#D1FAE5] rounded-2xl inline px-3 py-1'>放送中</p> */}
          <p className="inline py-1 px-3 text-[#9A3412] bg-[#FFEDD5] rounded-2xl">
            放送前・エンジビア募集中
          </p>
          <h1 className="mt-4 text-3xl font-bold text-[#111827]">
            第４回エンジビアの泉
          </h1>
        </div>
        <div>
          <button className="py-3 px-8 text-white bg-[#0284C7] rounded-md">
            放送を開始するよ
          </button>
          <button className="py-3 px-8 ml-8 text-[#0369A1] bg-[#E0F2FE] rounded-md">
            編集する
          </button>
        </div>
      </div>
      <div className="mx-2 mt-16">
        <div className="flex justify-between">
          {FeatureText?.map((text) => (
            <p
              key={text}
              className="pt-4 w-96 h-14 text-center text-[#111827] bg-gray-300 rounded-lg"
            >
              {text}
            </p>
          ))}
        </div>
        <div className="flex justify-between">
          <div>
            {beforeFeatureData.map((data) => (
              <div
                className="p-4 mt-4 w-96 h-24 bg-white rounded-lg"
                key={data.id}
              >
                <p className="text-sm text-[#111827]">{data.text}</p>
                <div className="flex items-center pt-4">
                  <img
                    className="w-6 h-6 rounded-full"
                    src={data.image}
                    alt="avatar"
                  />
                  <p className="pl-4 text-xs text-[#374151]">{data.name}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="mt-4 w-96 h-24 rounded-lg border-2 border-gray-200 border-dashed">
              <p className="pt-9 text-center text-[#9CA3AF]">
                フィーチャーする
              </p>
            </div>
            {featuringData?.map((data) => (
              <div
                className="p-4 mt-4 w-96 h-24 bg-white rounded-lg"
                key={data.id}
              >
                <p className="text-sm text-[#111827]">{data.text}</p>
                <div className="flex items-center pt-4">
                  <img
                    className="w-6 h-6 rounded-full"
                    src={data.image}
                    alt="avatar"
                  />
                  <p className="pl-4 text-xs text-[#374151]">{data.name}</p>
                </div>
              </div>
            ))}
            <button className="block py-3 px-6 mx-auto mt-4 text-white bg-[#0284C7] rounded-md">
              タイトルコールする
            </button>
          </div>
          <div>
            {afterFeatureData?.map((data) => (
              <div
                className="p-4 mt-4 w-96 h-24 bg-white rounded-lg"
                key={data.id}
              >
                <p className="text-sm text-[#111827]">{data.text}</p>
                <div className="flex items-center pt-4">
                  <img
                    className="w-6 h-6 rounded-full"
                    src={data.image}
                    alt="avatar"
                  />
                  <p className="pl-4 text-xs text-[#374151]">{data.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
