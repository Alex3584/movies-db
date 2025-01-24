import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import About from "./features/About/About";
import Movies from "./features/Movies/Movies";
import store from "./store";
import { Provider } from "react-redux";
import Home from "./features/Home/Home";

function AppEntrypoint() { 
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppEntrypoint />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
