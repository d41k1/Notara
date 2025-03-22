"use client";

import { useState } from "react";
import Input from "@/components/md/input";
import TextField from "@/components/md/textfield";
import Select from "@/components/md/select";
import Chip from "@/components/md/chip";
import DatePicker from "@/components/md/datepicker";

interface NewNoteFormProps {
  title: string;
  setTitle: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  urgency: boolean;
  setUrgency: (value: boolean) => void;
  importance: boolean;
  setImportance: (value: boolean) => void;
  pin: boolean;
  setPin: (value: boolean) => void;
  bookmark: boolean;
  setBookmark: (value: boolean) => void;
  doingDate: string;
  setDoingDate: (value: string) => void;
  doneDate: string;
  setDoneDate: (value: string) => void;
  tags: string[];
  setTags: (value: string[]) => void;
}

const NewNoteForm: React.FC<NewNoteFormProps> = ({
  title,
  setTitle,
  content,
  setContent,
  status,
  setStatus,
  urgency,
  setUrgency,
  importance,
  setImportance,
  pin,
  setPin,
  bookmark,
  setBookmark,
  doingDate,
  setDoingDate,
  doneDate,
  setDoneDate,
  tags,
  setTags,
}) => {
  const options_status = [
    { label: "Not Ready", value: "not_ready" },
    { label: "Ready", value: "ready" },
    { label: "Doing", value: "doing" },
    { label: "Done", value: "done" },
  ];

  const handleBooleanChange = (
    value: string,
    setState: (value: boolean) => void
  ) => setState(value === "true");

  const options_urgent = [
    { label: "Urgent", value: true },
    { label: "Not Urgent", value: false },
  ];

  const options_importance = [
    { label: "Important", value: true },
    { label: "Unimportant", value: false },
  ];

  const options_on_off = [
    { label: "Off", value: false },
    { label: "On", value: true },
  ];

  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setDate: (value: string) => void
  ) => {
    setDate(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("status", status);
    formData.append("urgency", urgency.toString());
    formData.append("importance", importance.toString());
    formData.append("pin", pin.toString());
    formData.append("bookmark", bookmark.toString());
    formData.append("doingDate", doingDate);
    formData.append("doneDate", doneDate);
    formData.append("tags", tags.join(","));
  };

  const [newTag, setNewTag] = useState<string>("");

  const handleTagAdd = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setNewTag("");
    }
  };

  const handleTagDelete = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-6 py-3 bg-SurfaceBright rounded-2xl drop-shadow-lg"
    >
      <div className="mt-4 mb-4">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <Select
          options={options_status}
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Select
          options={options_urgent}
          label="Urgency"
          value={urgency}
          onChange={(e) => handleBooleanChange(e.target.value, setUrgency)}
        />
        <Select
          options={options_importance}
          label="Importance"
          value={importance}
          onChange={(e) => handleBooleanChange(e.target.value, setImportance)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Select
          options={options_on_off}
          label="Pin"
          value={pin}
          onChange={(e) => handleBooleanChange(e.target.value, setPin)}
        />
        <Select
          options={options_on_off}
          label="Bookmark"
          value={bookmark}
          onChange={(e) => handleBooleanChange(e.target.value, setBookmark)}
        />
      </div>
      <div className="mb-4 text-xs text-gray-500">Schedule</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DatePicker
          label="Doing Date"
          value={doingDate}
          onChange={(e) => handleDateChange(e, setDoingDate)}
        />
        <DatePicker
          label="Done Date"
          value={doneDate}
          onChange={(e) => handleDateChange(e, setDoneDate)}
        />
      </div>
      <div className="mb-4 text-xs text-gray-500">Tags</div>
      <div>
        <div className="mb-4 flex items-center gap-4">
          <Input
            label="Add Tags"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <div className="w-8 h-8 flex items-center justify-center">
            <button
              type="button"
              className="w-8 h-8 rounded-full flex items-center justify-center material-symbols-rounded hover:bg-gray-200"
              onClick={handleTagAdd}
            >
              new_label
            </button>
          </div>
        </div>
        <div className="mb-2 flex flex-row gap-3 overflow-x-auto hidden-scrollbar">
          {tags.map((tag, index) => (
            <Chip
              key={index}
              icon="label"
              label={tag}
              onDelete={() => handleTagDelete(tag)}
            />
          ))}
        </div>
      </div>
    </form>
  );
};

export default NewNoteForm;
