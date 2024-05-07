import React from 'react';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'; // Import Switch instead of Router
import CartPage from './pages/CartPage';
import CheckOutPage from './pages/CheckOutPage';
import ProductOverviewPage from './pages/ProductOverviewPage';
import Footer from './features/navbar/Footer';
import Protected from './features/auth/Protected';

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: (<LoginPage />),
    },
    {
      path: "/signup",
      element: (<SignupPage />),
    },
    {
      path: "/cart",
      element: (<CartPage />),
    },
    {
      path: "/checkout",
      element: (<Protected><CheckOutPage /></Protected>),
    },
    {
      path: "/product/:id",
      element: (<ProductOverviewPage />),
    },
  ]);
  return (
          <>
          
          <RouterProvider router={router} />
          <Footer />
          </>
  );
}
