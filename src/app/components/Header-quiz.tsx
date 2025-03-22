import React from "react";
import { VscStarFull } from "react-icons/vsc";
 
interface HeaderData {
  currentQuestion: number;
  totalQuestions: number;
  level: "easy" | "medium" | "hard";// Receiving difficulty level from parent
  category:string
}

const HeaderQuiz: React.FC<HeaderData>  =  ({ currentQuestion, totalQuestions, level ,category}) => {
  const progress = ((currentQuestion / totalQuestions) * 100).toFixed(2);
 

  // Determine the number of stars to be colored
  const getStarsCount = (level: string) => {
    switch (level.toLowerCase()) {
      case "easy":
        return 1;
      case "medium":
        return 2;
      case "hard":
        return 3;
      default:
        return 0;
    }
  };

  const coloredStars = getStarsCount(level);

  return (
    <>
      {/* Progress Bar */}
      <div className="h-2 sm:h-3 mt-1.5 border-[0.4px]">
        <div className="h-full sm:h-full bg-gray-500" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Header Content */}
      <div className="px-4 sm:px-8 lg:px-20 py-6 sm:py-8 lg:py-10">
        {/* Question Number */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black/60">
          Question {currentQuestion} of 20
        </h2>

        {/* Category */}
        <p className="text-sm sm:text-base text-black/30 mt-1 sm:mt-2">
         {category}
        </p>

        {/* Star Rating */}
        <span className="flex py-1.5 gap-0.5 mt-2 sm:mt-3">
          {[...Array(5)].map((_, ind) => (
            <VscStarFull
              key={ind}
              className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${ind < coloredStars ? "text-black" : "text-gray-200"}`}
            />
          ))}
        </span>
      </div>
    </>
  );
};

export default HeaderQuiz;
