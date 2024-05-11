import React, { useEffect } from 'react';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'; // Import Switch instead of Router
import CartPage from './pages/CartPage';
import CheckOutPage from './pages/CheckOutPage';
import ProductOverviewPage from './pages/ProductOverviewPage';
import Footer from './features/navbar/Footer';
import Protected from './features/auth/Protected';
import { useSelector, useDispatch } from 'react-redux';
import { selectCheckUser } from './features/auth/authSlice';
import { fetchItemByUserIdAsync, selectItems } from './features/cart/cartSlice';
import ErrorPage from './pages/ErrorPage';
import ConfirmedPage from './pages/ConfirmedPage';
import Navbar from './features/navbar/Navbar';

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (<Protected><Home /></Protected>),
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
      element: (<Protected><CartPage /></Protected>),
    },
    {
      path: "/checkout",
      element: (<Protected><CheckOutPage /></Protected>),
    },
    {
      path: "/product/:id",
      element: (<Protected><ProductOverviewPage /></Protected>),
    },
    {
      path: "*",
      element: (<Navbar><ErrorPage /></Navbar>),
    },
    {
      path: "/orderSuccessfull",
      element: (<Navbar><ConfirmedPage /></Navbar>),
    },
  ]);
  const user = useSelector(selectCheckUser)
  const dispatch = useDispatch()
  useEffect(() => {
    if(user){
      dispatch(fetchItemByUserIdAsync(user.id))
    }
  }, [user , dispatch]);
  // console.log(useSelector(selectItems));
  return (
          <>
          
          <RouterProvider router={router} />
          <Footer />
          </>
  );
}
