import React, { useState, useEffect } from 'react';

import db from '../db.json';

import QuizQuestion from '../src/components/QuizQuestion';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLoading from '../src/components/QuizLoading';
import QuizResult from '../src/components/QuizResult';

const screenStates = {
  LOADING: 'LOADING',
  QUIZ: 'QUIZ',
  RESULT: 'RESULT',
};
export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const totalQuestions = db.questions.length;

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleNextQuestion() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  function handleAddResult(result) {
    setResults([...results, result]);
  }

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          {screenState === screenStates.LOADING && <QuizLoading />}
          {screenState === screenStates.QUIZ && (
          <QuizQuestion
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onHandleNextQuestion={handleNextQuestion}
            onHandleAddResult={handleAddResult}
          />
          )}

          {screenState === screenStates.RESULT && (
          <QuizResult
            results={results}
          />
          )}
        </QuizContainer>
      </QuizBackground>
    </>
  );
}
