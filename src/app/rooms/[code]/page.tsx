import { RoomPageProps } from "@/types";

const RoomPage = ({ params }: RoomPageProps) => {
  return (
    <main className="container py-10">
      <h2 className="text-2xl font-semibold">ルーム: {params.code}</h2>
      <p className="mt-2 text-sm opacity-80">対戦画面</p>
    </main>
  );
};

export default RoomPage;
