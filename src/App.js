import React from "react";
import "./App.css";
import Quiz from "./components/Quiz";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Quiz quizId={1} />
      </header>
    </div>
  );
}

export default App;
