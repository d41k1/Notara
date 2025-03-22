import React from "react";
import NavigationRail from "@/components/md/navigation";
import Button from "@/components/md/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/md/dialog";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Logout } from "@/app/logout/actions";
import { DeleteUser } from "@/app/delete_user/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const LastLoginTimeJST = (last_sign_in_at: string | undefined): string => {
  if (!last_sign_in_at) {
    redirect("/error");
  }

  const utcDate = new Date(last_sign_in_at);

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const jstDateString = utcDate.toLocaleString("ja-JP", options);

  return jstDateString;
};

export default async function Page() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col lg:flex-row items-start">
      <NavigationRail />
      <div className="lg:ml-20 min-h-screen px-12 py-12 w-full h-full lg:rounded-l-3xl bg-SurfaceContainer">
        <div className="h-7 text-lg font-medium">Settings</div>
        <div className="lg:pr-14 flex flex-wrap justify-center lg:justify-start gap-8 lg:gap-16 lg:pb-0 pb-16">
          <div className="min-w-[320px] w-full my-8 px-8 py-12 lg:p-16 h-full rounded-xl bg-SurfaceBright shadow-lg flex flex-col gap-12 justify-center lg:justify-start">
            <div className="flex flex-col gap-2">
              <div className="font-medium">My Profile</div>
              <div className="flex gap-4">
                <div className="w-16 h-16 flex items-center justify-center">
                  <Avatar>
                    <AvatarImage
                      src={data.user.user_metadata.avatar_url}
                    ></AvatarImage>
                    <AvatarFallback>
                      {data.user?.email?.substring(0, 2) ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="h-16 grid grid-cols-1 gap-2 content-center">
                  <div className="text-sm lg:text-base">{data.user.email}</div>
                  <div className="text-xs text-gray-500">
                    Last Login : {LastLoginTimeJST(data.user.last_sign_in_at)}
                  </div>
                </div>
              </div>
            </div>
            <div className="my-2 flex border-b border"></div>
            <div className="flex flex-col gap-1">
              <div className="font-medium">Logout</div>
              <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
                <div className="text-sm text-gray-500">
                  You will be logged out of this device.
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      label="Logout"
                      bgColor="bg-gray-700"
                      borderColor="border-none"
                      textColor="text-white"
                      hoverBgColor="hover:bg-gray-950"
                    />
                  </DialogTrigger>
                  <DialogContent className="rounded-3xl max-w-[480px]">
                    <DialogHeader>
                      <DialogTitle>
                        Are you sure you want to logout?
                      </DialogTitle>
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
                        bgColor="bg-gray-700"
                        borderColor="border-none"
                        hoverBgColor="hover:bg-gray-950"
                        onClick={Logout}
                      />
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="my-2 flex border-b border-gray-300"></div>
            <div className="flex flex-col gap-1">
              <div className="font-medium">Delete Account</div>
              <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
                <div className="text-sm text-gray-500">
                  All data and items associated with your account will be
                  permanently deleted.
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      label="Delete Account"
                      textColor="text-white"
                      bgColor="bg-red-500"
                      borderColor="border-none"
                      hoverBgColor="hover:bg-red-700"
                    />
                  </DialogTrigger>
                  <DialogContent className="rounded-3xl max-w-[480px]">
                    <DialogHeader>
                      <DialogTitle>
                        Are you sure you want to delete account?
                      </DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. Are you sure you want to
                        permanently delete this account from our servers?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          label="Cancel"
                          bgColor="bg-gray-200"
                          hoverBgColor="hover:bg-gray-300"
                        />
                      </DialogClose>

                      <Button
                        label="Delete"
                        textColor="text-white"
                        bgColor="bg-red-500"
                        borderColor="border-none"
                        hoverBgColor="hover:bg-red-700"
                        onClick={DeleteUser}
                      />
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
