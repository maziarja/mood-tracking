"use server";

import { signIn } from "@/config/auth";

export async function googleLogIn() {
  await signIn("google", { redirectTo: "/" });
}
