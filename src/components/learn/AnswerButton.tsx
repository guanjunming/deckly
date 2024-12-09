"use client";

import { Button } from "@/components/ui/button";
import { formatTime } from "@/lib/utils";
import { ReactNode } from "react";

interface AnswerButtonProps {
  interval: number;
  onClick: () => void;
  children: ReactNode;
}

const AnswerButton = ({ interval, onClick, children }: AnswerButtonProps) => {
  return (
    <div>
      <div className="text-center">{formatTime(interval)}</div>
      <Button
        onClick={onClick}
        className="w-24 rounded-full bg-blue-500 hover:bg-blue-600/90"
      >
        {children}
      </Button>
    </div>
  );
};

export default AnswerButton;
