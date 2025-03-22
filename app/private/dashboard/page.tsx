import React from "react";
import "material-symbols";
import NavigationRail from "@/components/md/navigation";
import Chip from "@/components/md/chip";
import Progress from "@/components/md/progress";
import RadicalChart from "@/components/md/radicalchart";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type StatisticsNote = {
  priority: "1st" | "2nd" | "3rd" | "4th";
  status: "not_ready" | "ready" | "doing" | "done";
  statistics_count: number;
};

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  let filterData: StatisticsNote[] = [];

  const { data: filterResult, error: filterError } = await supabase.rpc(
    "statistics_notes"
  );
  if (filterError) {
    console.log("Error fetching statistics results", filterError);
  }
  filterData = filterResult;
  const priorities = ["1st", "2nd", "3rd", "4th"];
  const statuses = ["not_ready", "ready", "doing", "done"];
  const totalCount: number = filterData.length;
  let totalDone: number = 0;
  const priorityCount: { [key: string]: number } = Object.fromEntries(
    priorities.map((p) => [p, 0])
  );
  const priorityStatusCount: {
    [key: string]: { [key: string]: number };
  } = Object.fromEntries(
    priorities.map((p) => [p, Object.fromEntries(statuses.map((s) => [s, 0]))])
  );

  filterData.forEach(({ priority, status }) => {
    if (priority in priorityCount) {
      priorityCount[priority]++;
      if (status in priorityStatusCount[priority]) {
        priorityStatusCount[priority][status]++;
        if (status === "done") {
          totalDone++;
        }
      }
    }
  });

  return (
    <div className="flex flex-col lg:flex-row items-start">
      <NavigationRail></NavigationRail>
      <div className="lg:ml-20 min-h-screen px-12 py-12 w-full h-full lg:rounded-l-3xl bg-SurfaceContainer">
        <div className="text-lg font-medium">Task Summary</div>
        <div className="lg:pr-14 mt-8 flex flex-wrap justify-center lg:justify-start gap-12 lg:gap-16 lg:pb-0 pb-16">
          <div className="min-w-[320px] bg-SurfaceBright shadow-lg rounded-xl">
            <div className="p-6 flex flex-col gap-6 justify-center items-center">
              <div className="w-full flex justify-start font-medium">
                Task Completion Rate
              </div>
              <RadicalChart total={totalCount} done={totalDone}></RadicalChart>
            </div>
          </div>
          <div className="p-6 min-w-[320px] bg-SurfaceBright rounded-lg shadow-lg flex flex-col gap-6">
            <div className="w-full flex justify-start font-medium">
              Number of Tasks in Each Category
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-full text-sm flex justify-between">
                <div>Do</div>
                <div>
                  {priorityCount["1st"]}/{totalCount}
                </div>
              </div>
              <Progress
                progress={priorityCount["1st"] / totalCount}
                bgColor="#ff4b00"
                height="h-2"
                showPercentage={false}
              ></Progress>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-full text-sm flex justify-between">
                <div>Schedule</div>
                <div>
                  {priorityCount["2nd"]}/{totalCount}
                </div>
              </div>
              <Progress
                progress={priorityCount["2nd"] / totalCount}
                bgColor="#ff9e00"
                height="h-2"
                showPercentage={false}
              ></Progress>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-full text-sm flex justify-between">
                <div>Delegate</div>
                <div>
                  {priorityCount["3rd"]}/{totalCount}
                </div>
              </div>
              <Progress
                progress={priorityCount["3rd"] / totalCount}
                bgColor="#03af7a"
                height="h-2"
                showPercentage={false}
              ></Progress>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-full text-sm flex justify-between">
                <div>Eleminate</div>
                <div>
                  {priorityCount["4th"]}/{totalCount}
                </div>
              </div>
              <Progress
                progress={priorityCount["4th"] / totalCount}
                bgColor="#4dc4ff"
                height="h-2"
                showPercentage={false}
              ></Progress>
            </div>
          </div>
          <div className="w-full text-lg font-medium -mb-8">Task Statics</div>
          <div className="w-[320px] bg-SurfaceBright shadow-lg rounded-xl">
            <div className="p-6 flex flex-col gap-6 justify-center">
              <div className="flex gap-6 w-full">
                <div className="flex flex-row items-center justify-start gap-4">
                  <div
                    className="w-12 h-12 p-3 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: "#ff4b00" }}
                  >
                    <span className="material-symbols-rounded  !text-[36px]">
                      local_fire_department
                    </span>
                  </div>
                  <div className="flex flex-col justify-start">
                    <div className="font-medium text-2xl">Do</div>
                    <div className="font-base">Urgent / Important</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-start gap-2">
                <div>Total Tasks</div>
                <div className="font-bold text-3xl">{priorityCount["1st"]}</div>
              </div>
              <div className="flex flex-col justify-start gap-2">
                <div>Task Completion Rate</div>
                <div className="font-bold text-3xl">
                  {priorityStatusCount["1st"]["done"]}
                </div>
                <Progress
                  progress={
                    priorityStatusCount["1st"]["done"] / priorityCount["1st"]
                  }
                  bgColor="#ff4b00"
                ></Progress>
              </div>
              <div className="flex flex-col justify-start gap-4">
                <div>Details</div>
                <div className="overflow-auto flex flex-row gap-3">
                  <Chip
                    icon="build"
                    label="Not Ready"
                    trailing_text={priorityStatusCount["1st"][
                      "not_ready"
                    ].toString()}
                  />
                  <Chip
                    icon="rocket"
                    label="Ready"
                    trailing_text={priorityStatusCount["1st"][
                      "ready"
                    ].toString()}
                  />
                  <Chip
                    icon="rocket_launch"
                    label="Doing"
                    trailing_text={priorityStatusCount["1st"][
                      "doing"
                    ].toString()}
                  />
                  <Chip
                    icon="planet"
                    label="Done"
                    trailing_text={priorityStatusCount["1st"][
                      "done"
                    ].toString()}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[320px] bg-SurfaceBright shadow-lg rounded-xl">
            <div className="p-6 flex flex-col gap-6 justify-center">
              <div className="flex gap-6 w-full">
                <div className="flex flex-row items-center justify-start gap-4">
                  <div
                    className="w-12 h-12 p-3 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: "#ff9e00" }}
                  >
                    <span className="material-symbols-rounded  !text-[32px]">
                      calendar_clock
                    </span>
                  </div>
                  <div className="flex flex-col justify-start">
                    <div className="font-medium text-2xl">Schedule</div>
                    <div className="font-base">Not Urgent / Important</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-start gap-2">
                <div>Total Tasks</div>
                <div className="font-bold text-3xl">{priorityCount["2nd"]}</div>
              </div>
              <div className="flex flex-col justify-start gap-2">
                <div>Task Completion Rate</div>
                <div className="font-bold text-3xl">
                  {priorityStatusCount["2nd"]["done"]}
                </div>
                <Progress
                  progress={
                    priorityStatusCount["2nd"]["done"] / priorityCount["2nd"]
                  }
                  bgColor="#ff9e00"
                ></Progress>
              </div>
              <div className="flex flex-col justify-start gap-4">
                <div>Details</div>
                <div className="overflow-auto flex flex-row gap-3">
                  <Chip
                    icon="build"
                    label="Not Ready"
                    trailing_text={priorityStatusCount["2nd"][
                      "not_ready"
                    ].toString()}
                  />
                  <Chip
                    icon="rocket"
                    label="Ready"
                    trailing_text={priorityStatusCount["2nd"][
                      "ready"
                    ].toString()}
                  />
                  <Chip
                    icon="rocket_launch"
                    label="Doing"
                    trailing_text={priorityStatusCount["2nd"][
                      "doing"
                    ].toString()}
                  />
                  <Chip
                    icon="planet"
                    label="Done"
                    trailing_text={priorityStatusCount["2nd"][
                      "done"
                    ].toString()}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[320px] bg-SurfaceBright shadow-lg rounded-xl">
            <div className="p-6 flex flex-col gap-6 justify-center">
              <div className="flex gap-6 w-full">
                <div className="flex flex-row items-center justify-start gap-4">
                  <div
                    className="w-12 h-12 p-3 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: "#03af7a" }}
                  >
                    <span className="material-symbols-rounded  !text-[32px]">
                      group_add
                    </span>
                  </div>
                  <div className="flex flex-col justify-start">
                    <div className="font-medium text-2xl">Delegate</div>
                    <div className="font-base">Urgent / Unimportant</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-start gap-2">
                <div>Total Tasks</div>
                <div className="font-bold text-3xl">{priorityCount["3rd"]}</div>
              </div>
              <div className="flex flex-col justify-start gap-2">
                <div>Task Completion Rate</div>
                <div className="font-bold text-3xl">
                  {priorityStatusCount["3rd"]["done"]}
                </div>
                <Progress
                  progress={
                    priorityStatusCount["3rd"]["done"] / priorityCount["3rd"]
                  }
                  bgColor="#03af7a"
                ></Progress>
              </div>
              <div className="flex flex-col justify-start gap-4">
                <div>Details</div>
                <div className="overflow-auto flex flex-row gap-3">
                  <Chip
                    icon="build"
                    label="Not Ready"
                    trailing_text={priorityStatusCount["3rd"][
                      "not_ready"
                    ].toString()}
                  />
                  <Chip
                    icon="rocket"
                    label="Ready"
                    trailing_text={priorityStatusCount["3rd"][
                      "ready"
                    ].toString()}
                  />
                  <Chip
                    icon="rocket_launch"
                    label="Doing"
                    trailing_text={priorityStatusCount["3rd"][
                      "doing"
                    ].toString()}
                  />
                  <Chip
                    icon="planet"
                    label="Done"
                    trailing_text={priorityStatusCount["3rd"][
                      "done"
                    ].toString()}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[320px] bg-SurfaceBright shadow-lg rounded-xl">
            <div className="p-6 flex flex-col gap-6 justify-center">
              <div className="flex gap-6 w-full">
                <div className="flex flex-row items-center justify-start gap-4">
                  <div
                    className="w-12 h-12 p-3 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: "#4dc4ff" }}
                  >
                    <span className="material-symbols-rounded  !text-[36px]">
                      close
                    </span>
                  </div>
                  <div className="flex flex-col justify-start">
                    <div className="font-medium text-2xl">Eliminate</div>
                    <div className="font-base">Not Urgent / Unimportant</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-start gap-2">
                <div>Total Tasks</div>
                <div className="font-bold text-3xl">{priorityCount["4th"]}</div>
              </div>
              <div className="flex flex-col justify-start gap-2">
                <div>Task Completion Rate</div>
                <div className="font-bold text-3xl">
                  {priorityStatusCount["4th"]["done"]}
                </div>
                <Progress
                  progress={
                    priorityStatusCount["4th"]["done"] / priorityCount["4th"]
                  }
                  bgColor="#4dc4ff"
                ></Progress>
              </div>
              <div className="flex flex-col justify-start gap-4">
                <div>Details</div>
                <div className="overflow-auto flex flex-row gap-3">
                  <Chip
                    icon="build"
                    label="Not Ready"
                    trailing_text={priorityStatusCount["4th"][
                      "not_ready"
                    ].toString()}
                  />
                  <Chip
                    icon="rocket"
                    label="Ready"
                    trailing_text={priorityStatusCount["4th"][
                      "ready"
                    ].toString()}
                  />
                  <Chip
                    icon="rocket_launch"
                    label="Doing"
                    trailing_text={priorityStatusCount["4th"][
                      "doing"
                    ].toString()}
                  />
                  <Chip
                    icon="planet"
                    label="Done"
                    trailing_text={priorityStatusCount["4th"][
                      "done"
                    ].toString()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
