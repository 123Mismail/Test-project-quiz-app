import React from "react";

interface QuizStats {
  corrects: number;
  incorrect: number;
  total: number;
}

const FooterQuiz = ({ correctAns }: { correctAns: QuizStats }) => {
  const {corrects,incorrect,total}=correctAns
  

  const remainingQuestions =
  total - (corrects + incorrect);

  // Calculate the percentages
  const scorePercentage = (corrects / total) * 100;
  const maxScorePercentage =
    ((corrects + remainingQuestions) / total) * 100;

  return (
    <div className="max-w-[400px] mx-auto mb-0 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between text-sm sm:text-base">
        <span>Score: {scorePercentage.toFixed(0)}%</span>
        <span>Max Score: {maxScorePercentage.toFixed(0)}%</span>
      </div>

      {/* Progress Bar */}
      <div className="h-4 rounded-[4px] mx-auto mt-1.5 w-full flex border">
        {/* Correct Answers */}
        <div
          className="h-full bg-black rounded-l-[4px]"
          style={{ width: `${scorePercentage}%` }}
        ></div>

        {/* Incorrect Answers */}
        <div
          className="h-full bg-black/70"
          style={{ width: `${(incorrect / total) * 100}%` }}
        ></div>

        {/* Remaining Questions (Potential Score) */}
        <div
          className="h-full bg-black/30 rounded-r-[4px]"
          style={{ width: `${(remainingQuestions / total) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default FooterQuiz;
