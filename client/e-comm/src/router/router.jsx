import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: <div>Home Page</div>,
      },
      {
        path: "/about",
        element: <div>About Us</div>,
      },
    ],
  },
]);

export default router;
