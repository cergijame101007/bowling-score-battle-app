import { UsersPageProps } from "@/types";

const UsersPage = ({ params }: UsersPageProps) => {
  return (
    <main className="container py-10">
      <h2 className="text-2xl font-semibold">マイページ: {params.id}</h2>
      <p className="mt-2 text-sm opacity-80">過去の成績</p>
    </main>
  );
};

export default UsersPage;
