import React, { useState } from "react";
import quizzes from "../quizzes";
import "./Quiz.css"; // Import the CSS file

const primaryColor = "rgb(52, 156, 40)";
const secondaryColor = "rgb(212, 235, 38)";
const backgroundColor = "#d3d3d3"; // dull gray
const borderColor = "#e0e0e0"; // lighter color for borders

// Brighter color scheme for selected state
const selectedPrimaryColor = "rgb(72, 176, 60)";
const selectedSecondaryColor = "rgb(232, 255, 58)";

const Quiz = ({ quizId, onQuizChange, debug }) => {
  const quiz = quizzes.find((q) => q.id === quizId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [history, setHistory] = useState([]);
  const [userReference, setUserReference] = useState(null);

  const handleNext = () => {
    setHistory([...history, { quizId, questionIndex: currentQuestionIndex }]);
    if (quizId === 1 && currentQuestionIndex === 0) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (quizId === 1) {
      const answer = answers[1];
      if (answer === "THC Products") {
        onQuizChange(2);
      } else if (answer === "Art Supplies") {
        onQuizChange(3);
      } else if (answer === "Something Else") {
        onQuizChange(4);
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    const previousState = history.pop();
    setHistory(history);
    if (previousState) {
      onQuizChange(previousState.quizId);
      setCurrentQuestionIndex(previousState.questionIndex);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    if (currentQuestionIndex === 0 && !userReference) {
      setUserReference(answer || "guest");
    }
    const updatedAnswers = {
      ...answers,
      [questionId]: answer,
      userReference: userReference || answer || "guest",
    };
    setAnswers(updatedAnswers);
    console.log("Updated Answers:", updatedAnswers);
    console.log("User Reference:", userReference || answer || "guest");
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestion.id];

  const getButtonStyle = (option) => {
    const isSelected = selectedAnswer === option;
    return {
      backgroundColor: isSelected ? selectedPrimaryColor : primaryColor,
      color: isSelected ? selectedSecondaryColor : secondaryColor,
      borderColor: isSelected ? borderColor : "transparent",
      borderWidth: "2px",
      borderStyle: "solid",
      fontWeight: "bold",
    };
  };

  const getNavButtonStyle = (isSelected) => {
    return {
      borderColor: isSelected ? borderColor : "transparent",
      borderWidth: "2px",
      borderStyle: "solid",
      fontWeight: "bold",
    };
  };

  return (
    <div
      className="container mt-5"
      style={{
        backgroundColor: backgroundColor,
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          backgroundColor: primaryColor,
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <h1 className="mb-4" style={{ color: "white" }}>
          {quiz.title}
        </h1>
      </div>
      <div className="card">
        <div className="card-body">
          <p className="card-text">{currentQuestion.question}</p>
          {currentQuestion.type === "multiple-choice" ? (
            currentQuestion.options.map((option) => (
              <button
                key={option}
                className={`btn m-2 ${
                  selectedAnswer === option ? "active" : ""
                }`}
                style={getButtonStyle(option)}
                onClick={() => handleAnswerChange(currentQuestion.id, option)}
              >
                {option}
              </button>
            ))
          ) : (
            <textarea
              className="form-control"
              name={`question-${currentQuestion.id}`}
              onChange={(e) =>
                handleAnswerChange(currentQuestion.id, e.target.value)
              }
            />
          )}
        </div>
      </div>
      <div className="d-flex justify-content-between mt-3">
        {quizId !== 1 && (
          <button
            className="btn btn-secondary"
            style={getNavButtonStyle(false)}
            onClick={handleBack}
          >
            Back
          </button>
        )}
        <button
          className="btn btn-primary next-button"
          style={getNavButtonStyle(true)}
          onClick={handleNext}
          disabled={!selectedAnswer}
        >
          Next
        </button>
      </div>
      {/* Debugging UI */}
      {debug && (
        <div className="mt-3">
          <h5>Debug Info:</h5>
          <pre>{JSON.stringify(answers, null, 2)}</pre>
          <p>User Reference: {userReference}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
