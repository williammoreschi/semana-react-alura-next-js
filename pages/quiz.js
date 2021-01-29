import React, { useState, useEffect } from 'react';

import db from '../db.json';

import QuizQuestion from '../src/components/QuizQuestion';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import LoadingWidget from '../src/components/LoadingWidget';

const screenStates = {
  LOADING: 'LOADING',
  QUIZ: 'QUIZ',
  RESULT: 'RESULT',
  FAIL: 'FAIL',
};
export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionSelection, setQuestionSelection] = useState(-1);
  const questionIndex = currentQuestion;
  const totalQuestion = db.questions.length;
  const question = db.questions[questionIndex];

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    if (Number(questionSelection) !== question.answer) {
      setScreenState(screenStates.FAIL);
    } else {
      const nextQuestion = questionIndex + 1;
      if (nextQuestion < totalQuestion) {
        setCurrentQuestion(nextQuestion);
      } else {
        setScreenState(screenStates.RESULT);
      }
    }
  }

  function handleChangeQuestionSelected(questionSelected) {
    setQuestionSelection(questionSelected);
  }

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          {screenState === screenStates.LOADING && <LoadingWidget />}
          {screenState === screenStates.QUIZ && (
          <QuizQuestion
            question={question}
            totalQuestion={totalQuestion}
            questionIndex={questionIndex}
            onHandleSubmitQuiz={handleSubmitQuiz}
            onHandleChangeQuestionSelected={handleChangeQuestionSelected}
          />
          )}
          {screenState === screenStates.RESULT && <div>Parabéns</div>}
          {screenState === screenStates.FAIL && <div>Perdeu</div>}
        </QuizContainer>
      </QuizBackground>
    </>
  );
}
