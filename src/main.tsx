// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UsersProvider } from "./features/users/UserContext.tsx";
import UsersPage from "./features/users/pages/UsersPage.tsx";
import UserDetailsPage from "./features/users/pages/UsersDetailsPage.tsx";
import './styles.css';


const router = createBrowserRouter([
  { path: "/", element: <UsersPage /> },
  { path: "/users/:id", element: <UserDetailsPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UsersProvider>
      <RouterProvider router={router} />
    </UsersProvider>
  </React.StrictMode>
);
