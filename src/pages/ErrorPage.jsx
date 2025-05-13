import { Link, useRouteError } from "react-router-dom";
import styled from "styled-components";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: #111827;
  background-color: #F9FAFB;
  padding: 1rem;
  width: 100%;

  & h1 {
    font-size: 5rem;

    & span {
      color: #3B82F6;
    }
  }

  & p {
    font-size: 1.5rem;
    text-align: center;
  }
`

const StyledLink = styled(Link)`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  background-color: #3B82F6;
  color: #F9FAFB;

  &:hover{
    opacity: 0.9;
  }
`

const ErrorPage = () => {
  const error = useRouteError();

  const status = error?.status || 500;
  const statusText = error?.statusText || 'Internal Server Error.';
  const message = error?.message || 'Something went wrong.';

  return (
    <Section>
      <h1>Oops<span>!</span></h1>
      <p>
        <strong>
          {status} - {statusText}
        </strong>
      </p>
      <p>
        {message}
      </p>
      <StyledLink to={'/'}>Go back</StyledLink>
    </Section>
  );
}

export default ErrorPage;