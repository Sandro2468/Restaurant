import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  function doLogout() {
    setIsLoggingOut(true);
    localStorage.clear();
  }

  return (
    <nav className="flex fixed justify-center h-12 w-full bg-yellow-300 shadow-md z-10">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="text-lg font-bold text-black">Restaurant_KW</div>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            onClick={doLogout}
            className={`inline-flex justify-center items-center rounded-md border border-transparent bg-red-500 hover:bg-red-600 px-3 py-1 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:bg-slate-400 disabled:text-slate-600 focus-visible:ring-offset-2 ${
              isLoggingOut ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
