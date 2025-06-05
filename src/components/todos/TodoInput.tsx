import React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function TodoInput() {
  return (
    <Card className="max-w-[600px] mx-auto my-10">
      <CardHeader>
        <CardTitle className="text-3xl bold">TODOリスト</CardTitle>
      </CardHeader>
      <CardContent className="flex w-full items-center gap-2 py-6">
        <Input className="h-12 text-lg" />
        <Button
          type="submit"
          variant="outline"
          className="bg-[#6366F1] text-white text-2xl h-12 px-6 hover:bg-[#6366F1] hover:text-white"
        >
          追加
        </Button>
      </CardContent>
      <CardContent>
        <p>タスクがありません。</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}

export default TodoInput;
