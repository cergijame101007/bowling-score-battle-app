import Link from "next/link";

const Home = () => {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">ボウリング対戦</h1>
      <p className="text-sm">スコアを共有して、チーム戦で対決！</p>
      <div className="flex gap-3">
        <Link
          href="/signup"
          className="rounded-lg border px-4 py-2"
        >
          サインアップ
        </Link>
        <Link
          href="/login"
          className="rounded-lg bg-black px-4 py-2 text-white dark:bg-white dark:text-black"
        >
          ログイン
        </Link>
      </div>
      <div className="flex gap-3">
        <Link
          href="/users/ABC123"
          className="rounded-lg border px-4 py-2"
        >
          マイページへ(ABC123)
        </Link>
        <Link
          href="/rooms/new"
          className="rounded-lg bg-black px-4 py-2 text-white dark:bg-white dark:text-black"
        >
          ルームを作成
        </Link>
        <Link
          href="/rooms/join"
          className="rounded-lg border px-4 py-2"
        >
          ルームに参加
        </Link>
      </div>
    </main>
  );
}

export default Home
