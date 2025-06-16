import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Trash2 } from "lucide-react";

function TodoItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="group flex items-center bg-gray-100 p-4 rounded-md space-x-4 [&:not(:first-child)]:mt-4">
      <Checkbox className="cursor-pointer rounded-full border-gray-300 border-2" />
      {children}
      <Trash2 className="ml-auto h-4 w-4 cursor-pointer hidden group-hover:block" />
    </div>
  );
}

export default TodoItem;
