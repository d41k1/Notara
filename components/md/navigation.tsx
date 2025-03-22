"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import "material-symbols";
import Link from "next/link";
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
import NewNoteForm from "@/components/md/form";
import { InsertData } from "@/app/insert_data/actions";
import { useToast } from "@/components/hooks/use-toast";

type NavItemProps = {
  icon: string;
  label: string;
  to: string;
};

const NavItem: React.FC<NavItemProps> = ({ icon, label, to }) => {
  const pathname = usePathname();
  const isActive = pathname === to;
  return (
    <Link href={to}>
      <button className="w-20 h-14 flex flex-col justify-center items-center group">
        <div
          className={`w-14 h-8 rounded-full flex flex-col justify-center items-center 
            ${
              isActive
                ? "bg-MdPrimaryContainer"
                : "group-hover:bg-MdPrimaryContainer"
            }
      }
            `}
        >
          <span
            className={`material-symbols-rounded ${isActive ? "fill" : ""}`}
          >
            {icon}
          </span>
        </div>
        <div className="mt-1 w-[76px] h-4 flex flex-col justify-center items-center text-xs">
          {label}
        </div>
      </button>
    </Link>
  );
};

const NavigationRail = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
  const [urgency, setUrgency] = useState<boolean>(false);
  const [importance, setImportance] = useState<boolean>(false);
  const [pin, setPin] = useState<boolean>(false);
  const [bookmark, setBookmark] = useState<boolean>(false);
  const [doingDate, setDoingDate] = useState("");
  const [doneDate, setDoneDate] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setStatus("not_ready");
    setUrgency(true);
    setImportance(true);
    setPin(false);
    setBookmark(false);
    setDoingDate("");
    setDoneDate("");
    setTags([]);
  };

  useEffect(() => {
    if (!isDialogOpen) {
      resetForm();
    }
  }, [isDialogOpen]);

  const { toast } = useToast();
  const handleSave = async () => {
    if (!title.trim() && !content.trim()) {
      toast({
        variant: "destructive",
        description: "Please provide a title or content to save the note!",
      });
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("status", status);
    formData.append("urgency", urgency ? "true" : "false");
    formData.append("importance", importance ? "true" : "false");
    formData.append("pin", pin ? "true" : "false");
    formData.append("bookmark", bookmark ? "true" : "false");
    if (doingDate.trim() !== "") {
      formData.append("doingDate", doingDate);
    }
    if (doneDate.trim() !== "") {
      formData.append("doneDate", doneDate);
    }
    formData.append("tags", tags.join(","));

    await InsertData(formData);
    resetForm();
    setIsDialogOpen(false);
    toast({
      description: "Note Added Successfully!",
    });
  };

  return (
    <div>
      <div className="fixed top-[40px] hidden lg:flex w-20 flex-col justify-center items-center">
        <Link href="/private/home">
          <img src="/icon.svg" alt="Icon" className="p-1 w-14 h-14" />
        </Link>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="fixed top-[136px] hidden lg:flex mb-10 w-14 h-14 bg-purple-100 rounded-2xl shadow-lg flex-col justify-center items-center hover:bg-purple-200">
              <span className="material-symbols-rounded">edit</span>
            </button>
          </DialogTrigger>
          <DialogContent className="h-full lg:h-auto bg-SurfaceContainer">
            <DialogHeader className="pb-6">
              <DialogTitle className="pb-6">Create Note</DialogTitle>
            </DialogHeader>
            <DialogDescription className="-mx-6 -my-6 px-6 py-4 bg-transparent">
              <NewNoteForm
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
                status={status}
                setStatus={setStatus}
                urgency={urgency}
                setUrgency={setUrgency}
                importance={importance}
                setImportance={setImportance}
                pin={pin}
                setPin={setPin}
                bookmark={bookmark}
                setBookmark={setBookmark}
                doingDate={doingDate}
                setDoingDate={setDoingDate}
                doneDate={doneDate}
                setDoneDate={setDoneDate}
                tags={tags}
                setTags={setTags}
              />
            </DialogDescription>
            <DialogFooter className="bg-SurfaceContainer -mb-2 pt-8">
              <DialogClose asChild>
                <Button
                  label="Cancel"
                  bgColor="bg-gray-100"
                  hoverBgColor="hover:bg-gray-200"
                />
              </DialogClose>
              <DialogClose asChild>
                <Button
                  label="Save"
                  textColor="text-white"
                  bgColor="bg-blue-500"
                  borderColor="border-none"
                  hoverBgColor="hover:bg-blue-700"
                  onClick={handleSave}
                />
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="fixed top-64 hidden lg:flex flex-col gap-3">
          <NavItem icon="home" label="Home" to="/private/home" />
          <NavItem icon="speed" label="Dashboard" to="/private/dashboard" />
          <NavItem icon="bookmark" label="Bookmark" to="/private/bookmark" />
          <NavItem icon="settings" label="Settings" to="/private/settings" />
        </div>
      </div>
      <div className="fixed bottom-0 w-full h-20 flex lg:hidden flex-row justify-around bg-background shadow-md p-2 z-10">
        <NavItem icon="home" label="Home" to="/private/home" />
        <NavItem icon="speed" label="Dashboard" to="/private/dashboard" />
        <NavItem icon="bookmark" label="Bookmark" to="/private/bookmark" />
        <NavItem icon="settings" label="Settings" to="/private/settings" />
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="fixed bottom-24 right-4 lg:hidden w-14 h-14 bg-purple-100 rounded-2xl shadow-lg flex flex-col justify-center items-center hover:bg-purple-200">
            <span className="material-symbols-rounded">edit</span>
          </button>
        </DialogTrigger>
      </Dialog>
    </div>
  );
};

export default NavigationRail;
