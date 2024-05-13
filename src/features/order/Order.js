import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllOrderByIdAsync, selectallOrders } from './orderSlice';
import { selectCheckUser} from '../auth/authSlice';

const Order = () => {
  const allOrders = useSelector(selectallOrders);
  const dispatch = useDispatch();
  const user = useSelector(selectCheckUser)
  console.log(user)
  useEffect(() => {
    dispatch(fetchAllOrderByIdAsync(user.id))
  }, [user])
  console.log(allOrders)

  return (
    <div>
      {/* Render your orders or other components */}
    </div>
  );
};

export default Order;
