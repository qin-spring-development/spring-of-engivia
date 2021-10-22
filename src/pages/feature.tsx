interface EngibiaData {
  text: string,
  image: string,
  name: string,
  id: number
}

const Feature = () => {

  const FeatureText: string[] = [
    'フィーチャー前',
    'フィーチャー中',
    'フィーチャー済み'
  ]

  const beforeFeatureData: EngibiaData[] = [
    {
      text: 'HTMLにはポータルという便利な要素がある',
      image: '15007672.jpeg',
      name: '松平ケン',
      id:12345678
    },
    {
      text: 'HTMLにはポータルという便利な要素がある',
      image: '15007672.jpeg',
      name: '松平ケン',
      id:123456789
    },
    {
      text: 'HTMLにはポータルという便利な要素がある',
      image: '15007672.jpeg',
      name: '松平ケン',
      id:1234567890
    },
    {
      text: 'HTMLにはポータルという便利な要素がある',
      image: '15007672.jpeg',
      name: '松平ケン',
      id:12345678901
    },
  ]
  
  const featuringData: EngibiaData[] = [
    
  ]
  
  const afterFeatureData: EngibiaData[] = [
    {
      text: 'HTMLにはポータルという便利な要素がある',
      image: '15007672.jpeg',
      name: '松平ケン',
      id:12345678
    },
    {
      text: 'HTMLにはポータルという便利な要素がある',
      image: '15007672.jpeg',
      name: '松平ケン',
      id:1234567
    },
  ]

  return (
    <div className="h-screen bg-gray-100 container mx-auto">
      <div className='flex justify-between items-center pt-20'>
        <div className="text-center mx-auto pl-80">
          {/* <p className='text-[#065F46] bg-[#D1FAE5] rounded-2xl inline px-3 py-1'>放送中</p> */}
          <p className='text-[#9A3412] bg-[#FFEDD5] rounded-2xl inline px-3 py-1'>放送前・エンジビア募集中</p>
          <h1 className='text-[#111827] font-bold text-3xl mt-4'>第４回エンジビアの泉</h1>
        </div>
        <div>
          <button className='bg-[#0284C7] text-white px-8 py-3 rounded-md'>放送を開始する</button>
          <button className='px-8 py-3 rounded-md bg-[#E0F2FE] text-[#0369A1] ml-8'>編集する</button>
        </div>
      </div>
      <div className='mx-2 mt-16'>
        <div className='flex justify-between'>
          {FeatureText?.map((text) => (
            <p key={text} className='text-center w-96 h-14 pt-4 bg-gray-300 text-[#111827] rounded-lg'>{text}</p>
          ))}
        </div>
        <div className='flex justify-between'>
          <div>
            {beforeFeatureData.map((data) => (
              <div className='bg-white w-96 h-24 rounded-lg p-4 mt-4' key={data.id}>
                <p className='text-sm text-[#111827]'>
                  {data.text}
                </p>
                <div className='flex items-center pt-4'>
                  <img className="h-6 w-6 rounded-full" src={data.image} alt="avatar" />
                  <p className='text-xs text-[#374151] pl-4'>
                    {data.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className='w-96 h-24 rounded-lg mt-4 border-dashed border-2 border-gray-200'>
              <p className='text-center pt-9 text-[#9CA3AF]'>
                フィーチャーする
              </p>
            </div>
            {featuringData?.map((data) => (
              <div className='bg-white w-96 h-24 rounded-lg p-4 mt-4' key={data.id}>
                <p className='text-sm text-[#111827]'>
                  {data.text}
                </p>
                <div className='flex items-center pt-4'>
                  <img className="h-6 w-6 rounded-full" src={data.image} alt="avatar" />
                  <p className='text-xs text-[#374151] pl-4'>
                    {data.name}
                  </p>
                </div>
              </div>
            ))}
            <button className='bg-[#0284C7] text-white px-6 py-3 rounded-md block mx-auto mt-4'>タイトルコールする</button>
          </div>
          <div>
            {afterFeatureData?.map((data) => (
              <div className='bg-white w-96 h-24 rounded-lg p-4 mt-4' key={data.id}>
                <p className='text-sm text-[#111827]'>
                  {data.text}
                </p>
                <div className='flex items-center pt-4'>
                  <img className="h-6 w-6 rounded-full" src={data.image} alt="avatar" />
                  <p className='text-xs text-[#374151] pl-4'>
                    {data.name}
                  </p>
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