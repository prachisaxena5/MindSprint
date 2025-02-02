import React from "react";
import "./Quiz.css";
import { useState, useEffect } from "react";

const Quiz = ({ API_URL, darkmode, setDarkMode }) => {
  const [questions, setQuestions] = useState([]); //To store the data of the questions
  const [currentQuestion, setCurrentQuestion] = useState(0); //stores the current index
  const [score, setScore] = useState(0); //has score of the user
  const [quizCompleted, setQuizCompleted] = useState(false); //states whether quiz is completed or not
  const [loading, setLoading] = useState(true); //tells whether it is still loading
  const [error, setError] = useState(null); //to check error
  const [selectedAnswer, setSelectedAnswer] = useState(null); //stores the selected answer
  const [timeleft, setTimeLeft] = useState(20);
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.questions);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        setError("Failed to fetch quiz data...");
        console.log("unable to fetch data");
        setLoading(true);
      });

    const storedScores = JSON.parse(localStorage.getItem("quizScores")) || [];
    setHighScores(storedScores);
  }, []);

  useEffect(() => {
    if (timeleft === 0) {
      handlenextquestion();
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [timeleft]);

  const handleAns = (option) => {
    setSelectedAnswer(option);
    if (option.is_correct === true) {
      setScore(score + 1);
    }
    handlenextquestion();
  };

  const handlenextquestion = () => {
    setTimeLeft(20);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);

      // Save score in localStorage
      const updatedScores = [...highScores, score];
      setHighScores(updatedScores);
      localStorage.setItem("quizScores", JSON.stringify(updatedScores));
    }
  };

  if (loading) return <p>Loading quiz...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="quiz-container">
      {quizCompleted ? (
        <div>
          <h2>Quiz Completed</h2>
          <p>
            Your Score:{score}/{questions.length}
          </p>
          <button
            className={`optionbtn ${darkmode ? "dark-btn" : "light-btn"}`}
            onClick={() => window.location.reload()}
          >
            Restart
          </button>

          <h3>Last 5 scores are: </h3>
          <ul>
            {highScores.slice(-5).map((s, index) => (
              <li key={index}>
                Attempt {index + 1}: {s}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h3 className="timer">Time Left:{timeleft} s</h3>
          <h2> Question {currentQuestion + 1} </h2>
          <p id="ques">{questions[currentQuestion]?.description}</p>
          <div className="options">
            {questions[currentQuestion]?.options.map((option, index) => (
              <div key={`${currentQuestion}-${index}`}>
                <button
                  key={index}
                  className={`optionbtn  ${
                    selectedAnswer
                      ? option.is_correct === true
                        ? "correct"
                        : "wrong"
                      : ""
                  } ${darkmode ? "dark-btn" : "light-btn"}`}
                  onClick={() => handleAns(option)}
                  disabled={selectedAnswer !== null}
                >
                  {option.description}
                </button>
                <br />
              </div>
            ))}
            <h3> Your score:{score}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
