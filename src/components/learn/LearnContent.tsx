"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { answerCard } from "@/server/actions/study";
import { Rating } from "@/types/types";
import { useState } from "react";
import { toast } from "sonner";

const LearnContent = ({ queuedCard }: { queuedCard: any }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const { deck, card, cardIntervals, newCount, learningCount, reviewCount } =
    queuedCard;

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleAnswer = async (rating: Rating) => {
    console.log(JSON.stringify(card));
    const result = await answerCard(card, rating);
    console.log(result);
    if (result.ok) {
      setShowAnswer(false);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="mx-auto flex h-screen max-w-screen-lg flex-col px-3 pb-2 pt-5">
      <div className="flex h-full flex-col gap-1.5">
        <div className="mb-4 text-3xl font-semibold">{deck.name}</div>

        <div className="flex flex-grow flex-col overflow-auto py-3 text-center text-xl">
          <div dangerouslySetInnerHTML={{ __html: card.front }} />
          {showAnswer && (
            <>
              <Separator className="my-5" />
              <div dangerouslySetInnerHTML={{ __html: card.back }} />
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
            <div>
              <div className="text-center">{`${cardIntervals.again}`}</div>
              <Button
                onClick={() => handleAnswer(Rating.Again)}
                className="rounded-full bg-blue-500 px-6 hover:bg-blue-600/90"
              >
                Again
              </Button>
            </div>
            <div>
              <div className="text-center">{`${cardIntervals.hard}`}</div>
              <Button
                onClick={() => handleAnswer(Rating.Hard)}
                className="rounded-full bg-blue-500 px-6 hover:bg-blue-600/90"
              >
                Hard
              </Button>
            </div>
            <div>
              <div className="text-center">{`${cardIntervals.good}`}</div>
              <Button
                onClick={() => handleAnswer(Rating.Good)}
                className="rounded-full bg-blue-500 px-6 hover:bg-blue-600/90"
              >
                Good
              </Button>
            </div>
            <div>
              <div className="text-center">{`${cardIntervals.easy}`}</div>
              <Button
                onClick={() => handleAnswer(Rating.Easy)}
                className="rounded-full bg-blue-500 px-6 hover:bg-blue-600/90"
              >
                Easy
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnContent;
