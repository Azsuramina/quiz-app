import React, { useState } from "react";
import quizzes from "../quizzes";

const Quiz = ({ quizId }) => {
  const quiz = quizzes.find((q) => q.id === quizId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div>
      <h1>{quiz.title}</h1>
      <div>
        <p>{currentQuestion.question}</p>
        {currentQuestion.type === "multiple-choice" ? (
          currentQuestion.options.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                value={option}
                onChange={() => handleAnswerChange(currentQuestion.id, option)}
              />
              {option}
            </label>
          ))
        ) : (
          <textarea
            name={`question-${currentQuestion.id}`}
            onChange={(e) =>
              handleAnswerChange(currentQuestion.id, e.target.value)
            }
          />
        )}
      </div>
      {currentQuestionIndex < quiz.questions.length - 1 && (
        <button onClick={handleNext}>Next</button>
      )}
    </div>
  );
};

export default Quiz;
