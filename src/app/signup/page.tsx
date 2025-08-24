'use client'
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Button from "../components/Button";

const SignUpPage = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');
  const [rawPassword, setRawPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    if (!userId || !nickname || !rawPassword) {
      setMessage('すべての項目を入力してください')
      return
    };
    if (!/^BWLP\d{4}$/.test(userId)) {
      setMessage("ユーザーIDは BWLP0000 ~ BWLP9999 の形式で入力してください");
      return;
    }

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, nickname, rawPassword }),
    });

    const result = await response.json();

    if (!response.ok) {
      setMessage(result.error || 'サインアップ失敗')
      return
    };

    const dummyEmail = `${userId}@dummy.local`;
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: dummyEmail,
      password: rawPassword,
    });

    if (signInError) {
      setMessage(`サインインに失敗しました: ${signInError.message}`);
      return;
    }

    router.push(`/users/${userId}`);
  }
  return (
    <main className="container py-10">
      <h2 className="text-2xl font-semibold">サインアップ</h2>
      <input
        type="text"
        placeholder="ニックネーム"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="w-full border px-3 py-2 mt-2"
        required
      />
      <input
        type="text"
        placeholder="ユーザーIDを入力 (BWLP0000~BWLP9999)"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="w-full border px-3 py-2"
        required
      />
      <input
        type="password"
        placeholder="パスワードを入力"
        value={rawPassword}
        onChange={(e) => setRawPassword(e.target.value)}
        className="w-full border px-3 py-2"
        required
      />
      <Button
        onClick={handleSignUp}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        登録してログインページへ
      </Button>
      {message && <p className="text-sm text-gray-700">{message}</p>}
    </main>
  );
};

export default SignUpPage;
