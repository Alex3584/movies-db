import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";
import App from "./App";
import { About } from "./features/About/About";
import Movies, {MoviesFetch} from "./features/Movies/Movies";
import  store from "./store";
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ),
    children: [
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/movies",
        element: <MoviesFetch />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
