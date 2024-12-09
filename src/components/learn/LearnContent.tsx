"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { answerCard } from "@/server/actions/study";
import { QueuedCardRes, Rating } from "@/types/types";
import { useState } from "react";
import { toast } from "sonner";
import AnswerButton from "./AnswerButton";
import DOMPurify from "dompurify";
import { useQueryClient } from "@tanstack/react-query";

const LearnContent = ({ queuedCardRes }: { queuedCardRes: QueuedCardRes }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const queryClient = useQueryClient();

  const { deckName, card, intervals, newCount, learningCount, reviewCount } =
    queuedCardRes;

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleAnswer = async (rating: Rating) => {
    const result = await answerCard(card, rating);

    if (result.ok) {
      setShowAnswer(false);

      queryClient.invalidateQueries({ queryKey: ["cards", card.deckId] });
    } else {
      toast.error(result.message);
    }
  };

  const cleanFront = DOMPurify.sanitize(card.front);
  const cleanBack = DOMPurify.sanitize(card.back);

  return (
    <div className="mx-auto flex h-screen max-w-screen-lg flex-col px-3 pb-2 pt-5">
      <div className="flex h-full flex-col gap-1.5">
        <div className="mb-4 text-3xl font-semibold">{deckName}</div>

        <div className="flex flex-grow flex-col overflow-auto py-3 text-center text-xl">
          <div dangerouslySetInnerHTML={{ __html: cleanFront }} />
          {showAnswer && (
            <>
              <Separator className="my-5" />
              <div dangerouslySetInnerHTML={{ __html: cleanBack }} />
            </>
          )}
        </div>

        {!showAnswer ? (
          <div className="flex flex-col items-center justify-center gap-2 py-2">
            <div className="text-sm">
              <span
                className={`text-blue-500 ${card.state === "NEW" ? "underline" : ""}`}
              >
                {newCount}
              </span>{" "}
              +{" "}
              <span
                className={`text-red-500 ${card.state === "LEARN" ? "underline" : ""}`}
              >
                {learningCount}
              </span>{" "}
              +{" "}
              <span
                className={`text-green-500 ${card.state === "REVIEW" ? "underline" : ""}`}
              >
                {reviewCount}
              </span>
            </div>
            <Button
              onClick={handleShowAnswer}
              size="lg"
              className="rounded-full bg-blue-500 hover:bg-blue-600/90"
            >
              Show Answer
            </Button>
          </div>
        ) : (
          <div className="mb-1 flex justify-center gap-4 py-2">
            <AnswerButton
              interval={intervals.again}
              onClick={() => handleAnswer(Rating.Again)}
            >
              Again
            </AnswerButton>
            <AnswerButton
              interval={intervals.hard}
              onClick={() => handleAnswer(Rating.Hard)}
            >
              Hard
            </AnswerButton>
            <AnswerButton
              interval={intervals.good}
              onClick={() => handleAnswer(Rating.Good)}
            >
              Good
            </AnswerButton>
            <AnswerButton
              interval={intervals.easy}
              onClick={() => handleAnswer(Rating.Easy)}
            >
              Easy
            </AnswerButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnContent;
