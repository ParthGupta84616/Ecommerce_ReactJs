import React, { useEffect } from 'react';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'; 
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
import OrderPage from './pages/OrderPage';
import Logout from './features/auth/component/Logout';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import AdminHome from './pages/AdminHome';
import AdminProductOverviewPage from './pages/AdminProductOverviewPage';
import ProtectedAdmin from './features/auth/ProtectedAdmin';
import ProductForm from './features/adminproductlist/ProductForm';
import AdminProductFormPage from './pages/AdminProductFormPage';

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
      path: "/orderSuccessfull/:id",
      element: (<Protected><Navbar><ConfirmedPage /></Navbar></Protected>),
    },
    {
      path: "/orders",
      element: (<Protected><OrderPage/></Protected>),
    },
    {
      path: "/forgetpassword",
      element: (<ForgetPasswordPage/>),
    },
    {
      path: "/logout",
      element: (<Protected><Logout /></Protected>),
    },
    {
      path: "/admin",
      element: (<ProtectedAdmin><AdminHome /></ProtectedAdmin>),
    },
    {
      path: "/admin/product/:id",
      element: (<ProtectedAdmin><AdminProductOverviewPage /></ProtectedAdmin>),
    },
    {
      path: "/admin/productform",
      element: (<ProtectedAdmin><AdminProductFormPage /></ProtectedAdmin>),
    },
  ]);
  const user = useSelector(selectCheckUser)
  const dispatch = useDispatch()
  useEffect(() => {
    if(user){
      dispatch(fetchItemByUserIdAsync(user.id));
    }
  }, [user , dispatch , fetchItemByUserIdAsync]);
  return (
          <>
          
          <RouterProvider router={router} />
          <Footer />
          </>
  );
}
