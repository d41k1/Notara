"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function UpdatePassword(formData: FormData) {
  const supabase = await createClient();
  const new_password = formData.get("password") as string;

  const { data, error } = await supabase.auth.updateUser({
    password: new_password,
  });

  if (error) {
    console.log(error.message);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/login");
}
