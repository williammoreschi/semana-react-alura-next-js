import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import Loading from '../src/components/Loading';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [questions, setQuestions] = useState({});

  const handleLoadQuiz = async (urlQuiz) => {
    fetch(urlQuiz).then(async (response) => {
      const data = await response.json();
      setTimeout(() => {
        setQuestions(data);
      }, 1 * 1000);
    });
  };

  const handlerForm = (e) => {
    e.preventDefault();
    router.push(`/quiz?name=${name}`);
  };

  useEffect(() => {
    const myQuiz = `${window.location.origin}/api/db`;
    handleLoadQuiz(myQuiz);
  }, []);

  return (
    <>

      <QuizBackground backgroundImage={questions.bg}>
        <QuizContainer>
          <QuizLogo />
          {Object.keys(questions).length === 0
            ? (
              <Widget>
                <Widget.Header>
                  Aguarde...
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
            )
            : (
              <>
                <Widget>
                  <Widget.Header>
                    <h1>{questions.title}</h1>
                  </Widget.Header>
                  <Widget.Content>
                    <p>{questions.description}</p>
                    <form onSubmit={handlerForm}>
                      <Input
                        onChange={(e) => setName(e.target.value.trim())}
                        placeholder="Digite seu nome"
                        name="nomeDoUsuario"
                        value={name}
                      />
                      <Button type="submit" disabled={!name.length}>
                        {`JOGAR ${name}`}
                      </Button>
                    </form>
                  </Widget.Content>
                </Widget>
                <Widget>
                  <Widget.Content>
                    <h1>Quizes da Galera</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  </Widget.Content>
                </Widget>
              </>
            )}
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/williammoreschi" />
      </QuizBackground>
    </>
  );
}
