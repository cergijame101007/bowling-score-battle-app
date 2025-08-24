import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function POST(request: Request) {
  try {
    const { userId, rawPassword } = await request.json();

    if (!/^BWLP\d{4}$/.test(userId)) {
      return NextResponse.json(
        { error: "ユーザーIDは BWLP0000 ~ BWLP9999 の形式で入力してください" },
        { status: 400 }
      );
    };
    if (!userId || !rawPassword) {
      return NextResponse.json(
        { error: "ニックネームとパスワードは必須です" },
        { status: 400 }
      );
    };
    if (!rawPassword) {
      return NextResponse.json({ error: "パスワードは必須です" }, { status: 400 });
    }

    const dummyEmail = `${userId}@dummy.local`;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: dummyEmail,
      password: rawPassword,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    };

    return NextResponse.json({ success: true, user: data.user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  };
};