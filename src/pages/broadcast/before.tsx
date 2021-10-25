import { useRouter } from "next/router";

const BroadcastBefore = () => {
  const router = useRouter();
  return (
    <div>
      <h1>放送前</h1>
      <p>{router.query.id}</p>
    </div>
  );
};

export default BroadcastBefore;
