import React, { useState } from "react";
import "./App.css";
import Quiz from "./components/Quiz";

function App() {
  const [currentQuizId, setCurrentQuizId] = useState(1);

  const handleQuizChange = (quizId) => {
    setCurrentQuizId(quizId);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Quiz quizId={currentQuizId} onQuizChange={handleQuizChange} />
      </header>
    </div>
  );
}

export default App;
