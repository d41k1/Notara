"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function DeleteData(note_id:string) {
  const supabase = await createClient();
  const { data, error:userError } = await supabase.auth.getUser();
  if (userError || !data?.user) {
    redirect("/");
  }
  
  const { error } = await supabase
    .from("notes")
    .delete().match({
      user_id: data.user.id,
      note_id: note_id
    });

  if (error) {
    console.log(error)
    redirect("/error");
  }

  revalidatePath("/", "layout");
}