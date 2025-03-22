"use client";
import React, { useEffect, useState } from "react";
import HeaderQuiz from "./Header-quiz";
import FooterQuiz from "./Footer-quiz";
import quizQuestions from "@/app/question.json";

interface QuizQuestion {
  category: string;
  type: "multiple" | "boolean";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface Score {
  corrects: number;
  incorrect: number;
  total: number;
}

const ContentQuiz = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [correctAns, setCorrAns] = useState<Score>({
    corrects: 0,
    incorrect: 0,
    total: 0,
  });
  const [isQuizCompleted, setIsQuizCompleted] = useState(false); // Track quiz completion

  useEffect(() => {
    const rawQuestionData = quizQuestions.map((question:any) => ({
      category: decodeURIComponent(question.category),
      type: question.type,
      difficulty: question.difficulty,
      question: decodeURIComponent(question.question),
      correct_answer: decodeURIComponent(question.correct_answer),
      incorrect_answers: question.incorrect_answers.map((ans: string) =>
        decodeURIComponent(ans)
      ),
    }));

    setQuestions(rawQuestionData);
    setCorrAns((prev) => ({ ...prev, total: rawQuestionData.length })); // Set total questions count
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const question = questions[currentQuestionIndex];
      const shuffledOptions = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);
      setOptions(shuffledOptions);
      setSelectedOption(null); // Reset selection on question change
    }
  }, [currentQuestionIndex, questions]);

  // Handle option selection
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    handelScore(option, questions[currentQuestionIndex].correct_answer);
  };

  // Update score
  const handelScore = (selected: string, correctOpt: string) => {
    setCorrAns((prev) => ({
      ...prev,
      corrects: selected === correctOpt ? prev.corrects + 1 : prev.corrects,
      incorrect: selected !== correctOpt ? prev.incorrect + 1 : prev.incorrect,
    }));
  };

  // Handle Next Question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsQuizCompleted(true); // Mark quiz as completed
    }
  };

  // Reset quiz
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setCorrAns({ corrects: 0, incorrect: 0, total: questions.length });
    setIsQuizCompleted(false); // Reset quiz completion state
  };

  return (
    <div className="max-w-full min-h-screen sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] mx-auto px-4 sm:px-6 lg:px-8">
      <HeaderQuiz
        totalQuestions={questions.length}
        currentQuestion={currentQuestionIndex + 1}
        level={questions.length > 0 ? questions[currentQuestionIndex]?.difficulty : "easy"}
        category={questions.length > 0 ? questions[currentQuestionIndex]?.category : "Entertainment:Video Games"}
      />

      {isQuizCompleted ? (
        // Quiz Completed Screen
        <div className="flex flex-col justify-center items-center h-[50vh]">
          <h1 className="text-3xl font-bold mb-4">Quiz Completed!</h1>
          <p className="text-xl mb-3">
            You scored {correctAns.corrects} out of {correctAns.total}.
          </p>
          <button
            className="px-6 py-2   border-[1px] cursor-pointer rounded-lg  transition-all"
            onClick={resetQuiz}
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        // Quiz Questions Screen
        <div className="px-1 sm:px-1 lg:px-8">
          {questions.length > 0 ? (
            <div className="mb-10">
              <p className="font-semibold mb-2 text-sm sm:text-base lg:text-lg">
                {questions[currentQuestionIndex].question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-2 pt-4">
                {options.map((option, i) => (
                  <span
                    key={i}
                    className={`p-2 sm:p-1 border rounded-md text-center font-semibold cursor-pointer text-sm sm:text-base ${
                      selectedOption === option ? "bg-gray-400 text-white" : "bg-gray-100"
                    }`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}

          {selectedOption && (
            <div className="flex flex-col justify-center gap-4 items-center mb-2 -mt-4">
              <span className="text-2xl font-semibold">
                {selectedOption === questions[currentQuestionIndex].correct_answer ? "Correct!" : "Wrong!"}
              </span>
              <button
                className="px-4 py-1 cursor-pointer border-2"
                onClick={handleNextQuestion}
              >
                Next Question
              </button>
            </div>
          )}
        </div>
      )}

      <FooterQuiz correctAns={correctAns} />
    </div>
  );
};

export default ContentQuiz;