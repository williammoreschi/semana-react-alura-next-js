import React from 'react';
import Widget from '../Widget';
import Loading from '../Loading';

export default function QuizLoading() {
  return (
    <Widget>
      <Widget.Header>
        Aguarde enquanto as perguntas são carregadas......
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
