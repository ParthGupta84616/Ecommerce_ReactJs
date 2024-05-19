import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrderAsync, selectTotalOrders } from '../order/orderSlice'
import { Navigate, useNavigate } from 'react-router-dom'
import { MdEdit } from "react-icons/md";

function Orders() {
  const [editView, setEditView] = useState(false)
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const orders = useSelector(selectTotalOrders)

  
  const handleEdit = () => {
  setEditView(!editView); 
  };
  console.log(editView);


  useEffect(() => {
    dispatch(fetchAllOrderAsync())
  }, [dispatch])
  const handleID = (id)=>{
    Navigate(`/orderSuccessfull/${id}`)
  }
  console.log(orders)
  const digitSum = (numberString) =>{ 
    if (typeof numberString !== 'string' || numberString.length === 0) {
        return 0; 
    }
    let sum = 0;
    for (let i = 0; i < numberString.length; i++) {
        const digit = parseInt(numberString[i]);
        if (!isNaN(digit)) {
            sum += digit;
        }
    }
    return sum;
}

  return (
      <div className="bg-white p-8 rounded-md w-full">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="text-gray-600 font-semibold">Products Oder</h2>
            <span className="text-xs">All products item</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex bg-gray-50 items-center p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="bg-gray-50 outline-none ml-1 block rounded-2xl"
                type="text"
                name=""
                id=""
                placeholder="search..."
              />
            </div>
          </div>
        </div>
        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Products
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Total Amount
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Shiping Address
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                {orders?.map((order) => (
                  <tr key={order.id} >
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center" onClick={()=>handleID(order.id)}>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {digitSum(order.id)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    
                      {order.items.map(item =>(
                        <p className="text-gray-900 whitespace-no-wrap m-1">
                        {item.title}
                        </p>
                      ))}
                    
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{order.timestamp} </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{order.addresses.firstName+" "+order.addresses.secondtName+", "+order.addresses.email} </p>
                    <p className="text-gray-900 whitespace-no-wrap">{order.addresses.Address+", "+order.addresses.City+", "+order.addresses.PostCode} </p>
                  </td>
                  <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                      <span
                        aria-hidden=""
                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                      />
                      <span className="relative">{order.status}</span>
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight" onClick={()=>handleEdit(order)}>
                      <span
                        aria-hidden=""
                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                      />
                      <span className="relative">
                      <MdEdit size={22} />
                      </span>
                    </span>
                  </td>
                </tr>
                ))}

                </tbody>
              </table>
              
            </div>
          </div>
        </div>
      </div>
  )
}

export default Orders