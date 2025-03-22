"use client";

import "material-symbols";
import { useState, useEffect, ChangeEvent } from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, usePathname } from "next/navigation";
import ClientAvatar from "./client-avatar";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const IconButton = ({ icon, isHover }: { icon: string; isHover: boolean }) => (
  <button
    className={`flex-none w-14 h-14 text-gray-600 ${
      isHover ? "pointer-events: none" : "hover: bg-SurfaceDim"
    } rounded-full flex justify-center items-center`}
  >
    <span className="material-symbols-rounded">{icon}</span>
  </button>
);

interface SearchBarProps {
  userData?: any;
}

const SearchBar = ({ userData }: SearchBarProps) => {
  const [show1st, setShow1st] = useState<Checked>(false);
  const [show2nd, setShow2nd] = useState<Checked>(false);
  const [show3rd, setShow3rd] = useState<Checked>(false);
  const [show4th, setShow4th] = useState<Checked>(false);
  const [showNotReady, setShowNotReady] = useState<Checked>(false);
  const [showReady, setShowReady] = useState<Checked>(false);
  const [showDoing, setShowDoing] = useState<Checked>(false);
  const [showDone, setShowDone] = useState<Checked>(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const query = debouncedQuery.trim()
      ? `?search=${encodeURIComponent(debouncedQuery.trim())}`
      : "";
    router.push(`${pathname}${query}`);
  }, [debouncedQuery, pathname, router]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value || "");
  };

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (debouncedQuery.trim()) queryParams.set("search", debouncedQuery.trim());
    if (show1st) queryParams.append("priority", "1st");
    if (show2nd) queryParams.append("priority", "2nd");
    if (show3rd) queryParams.append("priority", "3rd");
    if (show4th) queryParams.append("priority", "4th");
    if (showNotReady) queryParams.append("status", "not_ready");
    if (showReady) queryParams.append("status", "ready");
    if (showDoing) queryParams.append("status", "doing");
    if (showDone) queryParams.append("status", "done");

    router.push(`${pathname}?${queryParams.toString()}`);
  }, [
    debouncedQuery,
    show1st,
    show2nd,
    show3rd,
    show4th,
    showNotReady,
    showReady,
    showDoing,
    showDone,
    pathname,
    router,
  ]);

  return (
    <div className="min-w-[320px] w-full lg:w-[720px] h-14 rounded-full bg-background flex justify-between items-center">
      <div className="flex flex-row w-full group">
        <IconButton icon="search" isHover={true} />
        <input
          type="text"
          className="flex-grow h-14 bg-background focus:outline-none placeholder-gray-500"
          onChange={handleInput}
          placeholder="Search Notes"
          value={searchQuery}
        />
      </div>
      <div className="flex flex-row items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-14 h-14 material-symbols-rounded hover:bg-gray-200 rounded-full">
              filter_list
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="">
            <DropdownMenuLabel>Priority</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={show1st}
              onCheckedChange={setShow1st}
            >
              <div className="flex flex-row items-center justify-start gap-2">
                <div
                  className="w-3 h-3 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: "#ff4b00" }}
                ></div>
                <div className="flex flex-col justify-start">
                  <div>Do</div>
                </div>
              </div>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={show2nd}
              onCheckedChange={setShow2nd}
            >
              <div className="flex flex-row items-center justify-start gap-2">
                <div
                  className="w-3 h-3 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: "#ff9e00" }}
                ></div>
                <div className="flex flex-col justify-start">
                  <div>Schedule</div>
                </div>
              </div>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={show3rd}
              onCheckedChange={setShow3rd}
            >
              <div className="flex flex-row items-center justify-start gap-2">
                <div
                  className="w-3 h-3 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: "#03af7a" }}
                ></div>
                <div className="flex flex-col justify-start">
                  <div>Delegate</div>
                </div>
              </div>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={show4th}
              onCheckedChange={setShow4th}
            >
              <div className="flex flex-row items-center justify-start gap-2">
                <div
                  className="w-3 h-3 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: "#4dc4ff" }}
                ></div>
                <div className="flex flex-col justify-start">
                  <div>Eliminate</div>
                </div>
              </div>
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={showNotReady}
              onCheckedChange={setShowNotReady}
            >
              <div className="flex flex-row items-center justify-start gap-2">
                <span className="material-symbols-rounded !text-[20px]">
                  build
                </span>
                <div className="flex flex-col justify-start">
                  <div>Not Ready</div>
                </div>
              </div>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showReady}
              onCheckedChange={setShowReady}
            >
              <div className="flex flex-row items-center justify-start gap-2">
                <span className="material-symbols-rounded !text-[20px]">
                  rocket
                </span>
                <div className="flex flex-col justify-start">
                  <div>Ready</div>
                </div>
              </div>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showDoing}
              onCheckedChange={setShowDoing}
            >
              <div className="flex flex-row items-center justify-start gap-2">
                <span className="material-symbols-rounded !text-[20px]">
                  rocket_launch
                </span>
                <div className="flex flex-col justify-start">
                  <div>Doing</div>
                </div>
              </div>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showDone}
              onCheckedChange={setShowDone}
            >
              <div className="flex flex-row items-center justify-start gap-2">
                <span className="material-symbols-rounded !text-[20px]">
                  planet
                </span>
                <div className="flex flex-col justify-start">
                  <div>Done</div>
                </div>
              </div>
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {userData && (
          <div className="flex items-center justify-center mr-4 lg:hidden">
            <ClientAvatar userData={userData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
