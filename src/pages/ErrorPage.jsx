import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  const status = error?.status || 500;
  const statusText = error?.statusText || 'Internal Server Error.';
  const message = error?.message || 'Something went wrong.';

  return (
    <div>
      <h1>Oops!</h1>
      <p>
        <strong>
          {status} - {statusText}
        </strong>
      </p>
      <p>
        {message}
      </p>
      <Link to={'/'}>Go back</Link>
    </div>
  );
}

export default ErrorPage;