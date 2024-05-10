import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Link to={"/"}>
                <img
                  className="block lg:hidden h-8 w-auto"
                  src="/vite.svg"
                  alt="Vite logo"
                />
                <img
                  className="hidden lg:block h-8 w-auto"
                  src="/vite.svg"
                  alt="Vite logo"
                />
              </Link>
            </div>
            <div className="sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  to={"/harvester"}
                >
                  Harvester Form
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
