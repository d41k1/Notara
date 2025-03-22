"use server";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
export async function sendEmail(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:3000/password_reset/update_password/",
  });

  if (error) {
    console.log(error);
    redirect("/error");
  }

  redirect("/check_email");
}
