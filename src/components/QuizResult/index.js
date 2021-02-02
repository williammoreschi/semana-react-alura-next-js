import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Widget from '../Widget';
import Loading from '../Loading';

export default function QuizResult({ results }) {
  const [hit, setHit] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const hitQuestion = results.filter((x) => x === true).length;
    const totalQuestion = results.length;
    setHit(hitQuestion);
    setTotal(totalQuestion);
  }, []);
  return (
    <Widget>
      <Widget.Header>
        {hit > 0
          ? `Parabéns você acertou ${hit} de ${total} questões`
          : 'Você errou todas as questões'}

      </Widget.Header>
      <Widget.Content style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        <Loading />
      </Widget.Content>
    </Widget>
  );
}

QuizResult.defaultProps = {
  results: [],
};

QuizResult.propTypes = {
  results: PropTypes.shape([]),
};
