import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import About from "./features/About/About";
import store from "./store";
import { Provider } from "react-redux";
import Home from "./features/Home/Home";
import { ErrorBoundary } from "./ErrorBoundary";
import { LinearProgress } from "@mui/material";
import { Extra } from "./features/Extra/Extra";
import { StatefulAuthProvider } from "./auth/StatefulAuthProvider";
import { Authcallback } from "./auth/Authcallback";
import { Profile } from "./features/Profile/Profile";
import { AuthenticationGuard } from "./auth/AuthenticationGuard";
import { Protected } from "./features/Protected/Protected";

const Movies = lazy(() => import("./features/Movies/Movies"));

export function AppEntrypoint() {
  return (
    <StatefulAuthProvider>
      <Provider store={store}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Provider>
    </StatefulAuthProvider>
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
        element: (
          <Suspense fallback={<LinearProgress sx={{ mt: 1 }} />}>
            <Movies />
          </Suspense>
        ),
      },
      {
        path: "extra",
        element: <Extra />,
      },
      {
        path: "/profile",
        element: <AuthenticationGuard component={Profile} />,
      },
      {
        path: "/protected",
        element: <AuthenticationGuard component={Protected} />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/callback",
        element: <Authcallback />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);



