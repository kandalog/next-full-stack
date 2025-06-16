import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type Props = {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
};

function InputArea({ text, onChange, onClick }: Props) {
  return (
    <>
      <Input className="h-12 text-lg" onChange={onChange} value={text} />
      <Button
        onClick={onClick}
        type="submit"
        variant="outline"
        className="bg-[#6366F1] text-white text-2xl h-12 px-6 hover:bg-[#6366F1] hover:text-white cursor-pointer"
      >
        追加
      </Button>
    </>
  );
}

export default InputArea;
