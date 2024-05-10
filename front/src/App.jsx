import { Harvester } from "./components/Harvester";
import { Navbar } from "./components/Navbar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { HarvesterDetails } from "./components/HarvesterDetails";

const Wrapper = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        path: "/",
        element: (
          <div className="text-center">
            <h1 className="text-6xl">Welcome PTBOX</h1>
            <p className="text-lg">Use navigation bar to navigate</p>
          </div>
        ),
      },
      {
        path: "/harvester",
        element: <Harvester />,
      },
      {
        path: "/harvester/:id",
        element: <HarvesterDetails />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
