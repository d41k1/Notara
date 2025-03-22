import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();
    const supabase = await createClient();
    
    const { data: searchData, error } = await supabase.rpc("search_notes", {
      query: data,
    });
    
    if (error) {
      console.log(error)
    }

    return NextResponse.json(
      { message: "Data saved successfully", data: searchData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
