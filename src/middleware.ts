import { updateSession } from "@/lib/supabase/middleware";
import type { NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => updateSession(request)

export const config = {
  matcher: ["/rooms/:path*", "/users/:path*"],
};
