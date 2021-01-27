import styled from 'styled-components';

const Widget = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: 4px;
  overflow: hidden;

  h1, h2, h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }
`;
Widget.Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.primary};

  * {
    margin: 0;
  }
`;

Widget.Content = styled.div`
  padding: 24px 32px 32px 32px;
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  form{
    display:flex;
    flex-direction:column;

    input{
      width: 100%;
      padding:0 5px;
      height: 35px;
      border-radius: 5px;
      margin-bottom: 10px;
      background-color:transparent;
      border:1px solid #efefef;
      color:#fff
    }

    button {
      cursor: pointer;
      border: none;
      border-radius: 5px;
      width: 100%;
      height: 35px;
      background-color: #ffd700;
      color: #000;
    }
    button:disabled {
      cursor: default;
      background-color: #b5b5b5;
      color:#7d7d7d;
    }
  }
`;

export default Widget;
