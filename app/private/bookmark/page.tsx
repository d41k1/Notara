import React from "react";
import "material-symbols";
import NavigationRail from "@/components/md/navigation";
import SearchBar from "@/components/md/search";
import MdAvatar from "@/components/md/avatar";
import Card from "@/components/md/card";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page(props: Props) {
  const { params, searchParams } = props;
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.search;
  const supabase = await createClient();

  const priorityParam = resolvedSearchParams.priority;
  const statusParam = resolvedSearchParams.status;

  const priorityFilters = Array.isArray(priorityParam)
    ? priorityParam
    : priorityParam
    ? [priorityParam]
    : [];

  const statusFilters = Array.isArray(statusParam)
    ? statusParam
    : statusParam
    ? [statusParam]
    : [];

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  let searchData = null;

  if (query) {
    const { data: searchResult, error: searchError } = await supabase.rpc(
      "search_notes",
      { query: query }
    );
    if (searchError) {
      console.log("Error fetching search results", searchError);
    }
    searchData = searchResult;
  }

  const userData = data.user;
  let userAllData = null;
  if (!query) {
    const { data: allNotes, error: userError } = await supabase
      .from("notes")
      .select()
      .order("is_pinned", { ascending: false })
      .order("priority", { ascending: true })
      .order("updated_at", { ascending: false });
    if (userError) {
      console.log("Error fetching notes", userError);
    }
    userAllData = allNotes?.filter((note: any) => note.is_bookmarked === true);
  }

  let filterData = null;
  if (priorityFilters?.length === 0 && statusFilters?.length === 0) {
    filterData = userAllData || searchData;
  } else {
    const { data: filterResult, error: filterError } = await supabase.rpc(
      "filter_notes",
      {
        priority_filters: priorityFilters || [],
        status_filters: statusFilters || [],
      }
    );
    if (filterError) {
      console.log("Error fetching filter results", filterError);
    }
    filterData = filterResult;
  }

  const filterSetData = new Set(
    filterData?.map((item: any) => `${item.note_id}-${item.user_id}`)
  );

  const hitData =
    searchData && searchData.length > 0
      ? searchData.filter(
          (item: any) =>
            filterSetData.has(`${item.note_id}-${item.user_id}`) &&
            item.is_bookmarked === true
        )
      : (userAllData || []).filter(
          (item: any) =>
            filterSetData.has(`${item.note_id}-${item.user_id}`) &&
            item.is_bookmarked === true
        );

  return (
    <div className="flex flex-col lg:flex-row items-start">
      <NavigationRail></NavigationRail>
      <div className="min-h-screen px-6 lg:px-12 lg:ml-20 py-12 w-full h-full lg:rounded-l-3xl bg-SurfaceContainer">
        <div className="flex justify-center lg:justify-between items-center">
          <SearchBar userData={userData} />
          <div className="hidden lg:block">
            <MdAvatar></MdAvatar>
          </div>
        </div>
        <div className="lg:pr-14 mt-8 flex flex-wrap justify-center lg:justify-start gap-12 lg:pb-0 pb-16">
          {(!hitData || hitData.length === 0) &&
          (!userAllData || userAllData.length === 0) ? (
            <div>Not found Notes</div>
          ) : (
            hitData.map((item: any) => (
              <Card
                key={item.note_id}
                note_id={item.note_id}
                title={item.title}
                content={item.content}
                status={item.status}
                is_urgent={item.is_urgent}
                is_important={item.is_important}
                is_pinned={item.is_pinned}
                is_bookmarked={item.is_bookmarked}
                doing_date={item.doing_date}
                done_date={item.done_date}
                tags={item.tags}
                priority={item.priority}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
