import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export const POST = async (request: Request) => {
  try {
    const { userId, nickname, rawPassword } = await request.json();

    if (!/^BWLP\d{4}$/.test(userId)) {
      return NextResponse.json(
        { error: "ユーザーIDは BWLP0000 ~ BWLP9999 の形式で入力してください" },
        { status: 400 }
      );
    };
    if (!nickname || !rawPassword) {
      return NextResponse.json(
        { error: "ニックネームとパスワードは必須です" },
        { status: 400 }
      );
    };

    const dummyEmail = `${userId}@dummyEmail.local`;
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: dummyEmail,
      password: rawPassword
    });
    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    };
    const authUser = authData.user;
    if (!authUser) {
      return NextResponse.json({ error: "ユーザー作成に失敗しました" }, { status: 500 });
    };

    const { error: dbError } = await supabase.from("users").insert({
      id: authUser.id,
      user_id: userId,
      nickname,
    });
    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 400 })
    };

    return NextResponse.json({ message: "ユーザー登録に成功しました" }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
