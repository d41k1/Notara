"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function InsertData(formData: FormData) {
  const supabase = await createClient();
  const { data, error: userError } = await supabase.auth.getUser();

  if (userError || !data?.user) {
    redirect("/");
  }

  const noteData = {
    user_id: data.user.id,
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    status: formData.get("status") as string,
    is_urgent: formData.get("urgency") === "true",
    is_important: formData.get("importance") === "true",
    is_pinned: formData.get("pin") === "true",
    is_bookmarked: formData.get("bookmark") === "true",
    doing_date: formData.get("doingDate") as string,
    done_date: formData.get("doneDate") as string,
    tags: formData.get("tags")
      ? (formData.get("tags") as string).split(",")
      : [],
  };

  const { error } = await supabase.from("notes").insert([noteData]);

  if (error) {
    console.log(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
}
