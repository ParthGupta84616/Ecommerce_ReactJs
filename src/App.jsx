import React from 'react';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/Signup';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'; // Import Switch instead of Router

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (<Home />),
    },
    {
      path: "/login",
      element: (<LoginPage />),
    },
    {
      path: "/signup",
      element: (<SignupPage />),
    },
    // {
    //   path: "/",
    //   element: (<Home />),
    // },
  ]);
  return (
          <RouterProvider router={router} />
  );
}
