import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const email = String(body.email ?? "");
  const password = String(body.password ?? "");

  const validEmail = process.env.DEMO_USER_EMAIL ?? "admin@trezze.ai";
  const validPassword = process.env.DEMO_USER_PASSWORD ?? "trezze123";

  if (email !== validEmail || password !== validPassword) {
    return NextResponse.json(
      { error: "Credenciais invalidas." },
      { status: 401 }
    );
  }

  const res = NextResponse.json({
    user: {
      name: "Administrador Trezze",
      email,
      role: "admin",
    },
  });

  res.cookies.set("trezze_session", "demo-session", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return res;
}
