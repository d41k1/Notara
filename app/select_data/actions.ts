"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function SelectData() {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    redirect("/");
  }

  const { data, error } = await supabase.from("notes").select();

  if (error) {
    console.log(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
}
