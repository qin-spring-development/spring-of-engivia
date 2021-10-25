import { useRouter } from "next/router";

const BroadcastDone = () => {
  const router = useRouter();
  return (
    <div>
      <h1>放送ずみ</h1>
      <p>{router.query.id}</p>
    </div>
  );
};

export default BroadcastDone;
