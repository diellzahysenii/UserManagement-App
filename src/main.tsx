import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UsersProvider } from "./features/users/UserContext.tsx";
import UsersPage from "./features/users/pages/UsersPage.tsx";
import UserDetailsPage from "./features/users/pages/UsersDetailsPage.tsx";
import { usersListLoader, userLoader } from "./features/users/loader.ts";
import './styles.css';


const router = createBrowserRouter([
  { path: "/", element: <UsersPage />, loader: usersListLoader },
  { path: "/users/:id", element: <UserDetailsPage />, loader: userLoader },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
