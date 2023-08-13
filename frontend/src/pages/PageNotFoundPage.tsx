import { Link } from "react-router-dom";

const PageNotFoundPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl text-blue-800">Page not found!</h1>
      <Link to='/' className='text-2xl text-blue-600'>
        Back
      </Link>
    </div>
  );
};

export default PageNotFoundPage;
