import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div className="shadow-md border mt-8 border-slate-100 h-[80vh] flex flex-col justify-center items-center gap-4 w-11/12 mx-auto">
        <img src="/error.png" alt="404 Not Found" className="w-60 h-60" />
        <h1 className="text-2xl text-slate-700">This page is not found.</h1>
        <Link to="/" className="text-slate-800 text-lg">
          Go to Home
        </Link>
      </div>
    </>
  );
}

export default NotFound;
