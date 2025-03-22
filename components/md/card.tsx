"use client";
import "material-symbols";
import Chip from "@/components/md/chip";
import IconButton from "@/components/md/iconbutton";
import { useToast } from "@/components/hooks/use-toast";
import { redirect } from "next/navigation";
import { UpdateData } from "@/app/update_data/actions";
import { DeleteData } from "@/app/delete_data/actions";
import { useState, useEffect } from "react";
import NewNoteForm from "@/components/md/form";
import Button from "@/components/md/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/md/dialog";

type CardItemProps = {
  note_id?: string;
  title: string;
  content: string;
  status: string;
  is_urgent: boolean;
  is_important: boolean;
  is_pinned: boolean;
  is_bookmarked: boolean;
  doing_date: string | null;
  done_date: string | null;
  tags: string[] | null;
  priority?: string | undefined;
};

const ScheduleTimeJST = (schedule_date: string | undefined): string => {
  if (!schedule_date) {
    console.log(schedule_date);
    redirect("/error");
  }

  const utcDate = new Date(schedule_date);

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "UTC",
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

const Card: React.FC<CardItemProps> = ({
  note_id,
  title,
  content,
  status,
  is_urgent,
  is_important,
  is_pinned,
  is_bookmarked,
  doing_date,
  done_date,
  tags,
  priority,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const [editStatus, setEditStatus] = useState(status);
  const [editUrgency, setEditUrgency] = useState(is_urgent);
  const [editImportance, setEditImportance] = useState(is_important);
  const [editPin, setEditPin] = useState(is_pinned);
  const [editBookmark, setEditBookmark] = useState(is_bookmarked);
  const [editDoingDate, setEditDoingDate] = useState(doing_date);
  const [editDoneDate, setEditDoneDate] = useState(done_date);
  const [editTags, setEditTags] = useState(tags || []);
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
    formData.append("note_id", note_id || "");
    formData.append("title", editTitle);
    formData.append("content", editContent);
    formData.append("status", editStatus);
    formData.append("urgency", editUrgency ? "true" : "false");
    formData.append("importance", editImportance ? "true" : "false");
    formData.append("pin", editPin ? "true" : "false");
    formData.append("bookmark", editBookmark ? "true" : "false");
    if (editDoingDate && editDoingDate.trim() !== "") {
      formData.append("doingDate", editDoingDate);
    }
    if (editDoneDate && editDoneDate.trim() !== "") {
      formData.append("doneDate", editDoneDate);
    }

    formData.append("tags", editTags.join(","));

    await UpdateData(formData);
    setIsDialogOpen(false);
    toast({
      description: "Note Added Successfully!",
    });
  };

  const handleDelete = async (note_id: string) => {
    await DeleteData(note_id);
    setIsDialogOpen(false);
    toast({
      description: "Note Deleted Successfully!",
    });
  };

  const priorityColor = (priority: string | undefined): string => {
    switch (priority) {
      case "1st":
        return "#ff4b00";
      case "2nd":
        return "#ff9e00";
      case "3rd":
        return "#03af7a";
      default:
        return "#4dc4ff";
    }
  };

  return (
    <div className="w-[320px] bg-SurfaceBright rounded-xl shadow-lg">
      <div className="w-[320px] flex justify-center">
        <div
          className="w-[320px] h-3 rounded-t-full"
          style={{ backgroundColor: priorityColor(priority) }}
        ></div>
      </div>
      <div className="px-4 pt-3">
        <div className="h-[72px] flex justify-between items-center">
          <div className="w-36 h-6 flex flex-row gap-4">
            <IconButton icon="build" isFilled={status === "not_ready"} />
            <IconButton icon="rocket" isFilled={status === "ready"} />
            <IconButton icon="rocket_launch" isFilled={status === "doing"} />
            <IconButton icon="planet" isFilled={status === "done"} />
          </div>
          <div className="flex flex-row gap-4">
            <IconButton icon="keep" isFilled={is_pinned} />
            <IconButton icon="bookmark" isFilled={is_bookmarked} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="material-symbols-rounded hover:bg-gray-200 rounded-full">
                  more_vert
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ">
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div>Edit</div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-100">
                    <DialogHeader className="pb-6">
                      <DialogTitle className="pb-6">Edit Note</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="-mx-6 -my-6 px-6 pt-4 pb-4 bg-transparent">
                      <NewNoteForm
                        title={editTitle}
                        setTitle={setEditTitle}
                        content={editContent}
                        setContent={setEditContent}
                        status={editStatus}
                        setStatus={setEditStatus}
                        urgency={editUrgency}
                        setUrgency={setEditUrgency}
                        importance={editImportance}
                        setImportance={setEditImportance}
                        pin={editPin}
                        setPin={setEditPin}
                        bookmark={editBookmark}
                        setBookmark={setEditBookmark}
                        doingDate={editDoingDate || ""}
                        setDoingDate={setEditDoingDate}
                        doneDate={editDoneDate || ""}
                        setDoneDate={setEditDoneDate}
                        tags={editTags}
                        setTags={setEditTags}
                      />
                    </DialogDescription>
                    <DialogFooter className="bg-gray-100 -mb-2 pt-8">
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
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ">
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div>Delete</div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Do you want to delete this note?
                      </DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        label="Back"
                        bgColor="bg-gray-100"
                        hoverBgColor="hover:bg-gray-200"
                      />
                      <Button
                        label="Delete"
                        textColor="text-white"
                        bgColor="bg-red-500"
                        borderColor="border-none"
                        hoverBgColor="hover:bg-red-700"
                        onClick={() => handleDelete(note_id || "")}
                      />
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="py-4 flex flex-col gap-1">
          <div className="h-6 font-medium overflow-auto text-lg hidden-scrollbar">
            {title}
          </div>
          <div className="h-40 py-4 text-base overflow-auto hidden-scrollbar">
            {content}
          </div>
        </div>
        <div className="my-4 flex border-b border-SurfaceDim"> </div>
        <div className="min-h-12 flex flex-row gap-3 overflow-x-auto ">
          {doing_date ? (
            <Chip icon="rocket_launch" label={ScheduleTimeJST(doing_date)} />
          ) : null}
          {done_date ? (
            <Chip icon="planet" label={ScheduleTimeJST(done_date)} />
          ) : null}
          {tags?.map((tag, index) => (
            <Chip key={index} icon="label" label={tag} />
          ))}
        </div>
      </div>
      <div className="w-[320px] flex justify-center">
        <div
          className="w-[320px] h-3 rounded-b-full"
          style={{ backgroundColor: priorityColor(priority) }}
        ></div>
      </div>
    </div>
  );
};

export default Card;
