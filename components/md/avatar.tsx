import "material-symbols";
import Link from "next/link";
import Button from "@/components/md/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/md/dialog";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Logout } from "@/app/logout/actions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default async function MdAvatar() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="w-14 h-14 flex flex-col justify-center items-center hover:bg-gray-300 rounded-full relative">
          {data.user.user_metadata.avatar_url ? (
            <img
              src={data.user.user_metadata.avatar_url}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <Avatar>
              <AvatarFallback>
                {data.user?.email?.substring(0, 2) ?? "?"}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{data.user.email}</DropdownMenuLabel>
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
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ">
              <div className="flex flex-row justify-start items-center gap-2">
                <span className="material-symbols-rounded">logout</span>
                <div>Logout</div>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure you want to logout?</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  label="Back"
                  bgColor="bg-gray-200"
                  hoverBgColor="hover:bg-gray-300"
                />
              </DialogClose>

              <Button
                label="Logout"
                textColor="text-white"
                bgColor="bg-red-500"
                borderColor="border-none"
                hoverBgColor="hover:bg-red-700"
                onClick={Logout}
              />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
