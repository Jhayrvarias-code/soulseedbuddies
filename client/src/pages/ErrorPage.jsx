import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
      <p className="text-red-700 mb-4">
        {error?.statusText || error?.message || "Something went wrong."}
      </p>
      <Link
        to="/dashboard?active=true || /?active=false"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
