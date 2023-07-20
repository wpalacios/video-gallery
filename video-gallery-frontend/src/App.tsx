import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Video, VideosTable } from "./components";

const Layout = (): React.ReactElement => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <VideosTable />,
      // children: [
      //   {
      //     path: "/",
      //     element: <VideosTable />,
      //   },
      // ],
    },
    {
      path: "/videos/:id",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Video />,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
