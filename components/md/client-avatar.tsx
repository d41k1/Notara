"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function ClientAvatar({ userData }: { userData: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="w-10 h-10 flex flex-col justify-center items-center hover:bg-gray-300 rounded-full relative">
          {userData?.user_metadata?.avatar_url ? (
            <img
              src={userData.user_metadata.avatar_url}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <Avatar className="w-8 h-8">
              <AvatarFallback>
                {userData?.email?.substring(0, 2) ?? "?"}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{userData?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/private/settings">
            <div className="flex flex-row justify-start items-center gap-2">
              <span className="material-symbols-rounded">settings</span>
              <div>Settings</div>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/logout">
            <div className="flex flex-row justify-start items-center gap-2">
              <span className="material-symbols-rounded">logout</span>
              <div>Logout</div>
            </div>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
