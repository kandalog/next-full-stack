import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Trash2 } from "lucide-react";

type Props = {
  children: React.ReactNode;
  sending: boolean | undefined;
  checked: boolean;
  onCheckedChange: (id: number) => void;
  id: number;
  onClickDelete: (id: number) => void;
};

function TodoItem({
  children,
  sending,
  checked,
  onCheckedChange,
  id,
  onClickDelete,
}: Props) {
  return (
    <div
      className={`group flex items-center bg-gray-100 p-4 rounded-md space-x-4 [&:not(:first-child)]:mt-4 ${
        sending ? "bg-gray-300" : ""
      }`}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={() => {
          onCheckedChange(id);
        }}
        className={`cursor-pointer rounded-full border-gray-300 border-2 ${
          sending ? "hidden" : ""
        }`}
      />
      {children}
      <div className="w-fit block ml-auto" onClick={() => onClickDelete(id)}>
        <Trash2
          className={`ml-auto h-4 w-4 cursor-pointer hidden group-hover:block ${
            sending ? "group-hover:hidden" : ""
          }`}
        />
      </div>
    </div>
  );
}

export default TodoItem;
