import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Widget from '../Widget';
import AlternativesForm from '../AlternativesForm';
import Button from '../Button';

export default function QuizQuestion({
  question,
  questionIndex,
  totalQuestions,
  onHandleNextQuestion,
  onHandleAddResult,
}) {
  const questionName = `question__${questionIndex}`;
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmitted, setIsQuestionSubmitted] = useState(false);
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  const handleFormQuestion = (e) => {
    e.preventDefault();
    setIsQuestionSubmitted(true);
    setTimeout(() => {
      onHandleAddResult(isCorrect);
      onHandleNextQuestion();
      setIsQuestionSubmitted(false);
      setSelectedAlternative(undefined);
    }, 3 * 1000);
  };

  return (
    <Widget>
      <Widget.Header>
        {/* <BackLinkArrow href="/" /> */}
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <AlternativesForm onSubmit={handleFormQuestion}>

          <h2>{question.title}</h2>
          <p>{question.description}</p>
          {question.alternatives.map((alternative, index) => {
            const alternativeId = `alternative__${index}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === index;
            return (
              <Widget.Topic
                as="label"
                key={String(index)}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmitted && alternativeStatus}
              >
                <input
                  type="radio"
                  id={alternativeId}
                  value={index}
                  name={questionName}
                  onClick={(e) => setSelectedAlternative(index)}
                  style={{ display: 'none' }}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>Confirmar</Button>
        </AlternativesForm>
        {(isQuestionSubmitted && isCorrect) && <p>Acertou</p>}
        {(isQuestionSubmitted && !isCorrect) && <p>Errou</p>}
      </Widget.Content>
    </Widget>
  );
}
QuizQuestion.defaultProps = {
  question: {
    image: '',
    title: '',
    description: '',
    answer: '',
    alternatives: [],
  },
};
QuizQuestion.propTypes = {
  question: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    answer: PropTypes.number.isRequired,
    alternatives: PropTypes.arrayOf.isRequired,
  }),
  totalQuestions: PropTypes.number.isRequired,
  questionIndex: PropTypes.number.isRequired,
  onHandleNextQuestion: PropTypes.func.isRequired,
  onHandleAddResult: PropTypes.func.isRequired,
};
