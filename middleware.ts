import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: Request) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
  }
  return NextResponse.next();
}

// export const config = { matcher: ["/log-in"] };
