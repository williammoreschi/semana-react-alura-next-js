import React from 'react';
import PropTypes from 'prop-types';

import Widget from '../Widget';
import Button from '../Button';

export default function QuizQuestion({
  question, totalQuestion, questionIndex, onHandleSubmitQuiz, onHandleChangeQuestionSelected,
}) {
  const questionName = `question__${questionIndex}`;
  return (
    <Widget>
      <Widget.Header>
        {/* <BackLinkArrow href="/" /> */}
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestion}`}</h3>
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
        <form onSubmit={(e) => {
          e.preventDefault();
          onHandleSubmitQuiz();
        }}
        >
          <h2>{question.title}</h2>
          <p>{question.description}</p>
          {question.alternatives.map((alternative, index) => (
            <Widget.Topic as="label" key={String(index)} htmlFor={`question-${index}`}>
              <input
                type="radio"
                id={`question-${index}`}
                value={index}
                name={questionName}
                onChange={(e) => onHandleChangeQuestionSelected(e.target.value)}
              />
              {alternative}
            </Widget.Topic>
          ))}
          <Button type="submit">Confirmar</Button>
        </form>
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
  totalQuestion: PropTypes.number.isRequired,
  questionIndex: PropTypes.number.isRequired,
  onHandleSubmitQuiz: PropTypes.func.isRequired,
  onHandleChangeQuestionSelected: PropTypes.func.isRequired,
};
