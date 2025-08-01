import React, { useState, useEffect } from "react";
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);

  const handleOrderClick = (order) => {
    setActiveOrder(order);
  };

  useEffect(() => {
    axios.get("https://messbackend-8bh5.onrender.com/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error in fetching data ", error);
      });
  }, []);

  return (
    <section>
      {/* Header */}
      <div className="bg-white fixed z-50 shadow-xl border border-black flex w-full h-16 items-center justify-between px-4 sm:pl-30">
        <p className="text-2xl font-semibold">MANAGE ORDERS</p>
        <div className="bg-yellow-500 rounded-xl w-12 h-12 flex items-center justify-center">
          <span className="text-white text-xs">Profile</span>
        </div>
      </div>

      {/* Responsive layout */}
      <div className="flex flex-col sm:flex-row justify-between px-4 pb-10 sm:px-36 pt-20 sm:pt-30 gap-8 sm:gap-24">
        {/* Orders list */}
        <div className="shadow-md rounded-xl w-full sm:w-1/3 bg-white">
          <div className="bg-white rounded-xl w-full h-20 flex items-center justify-center font-semibold text-lg">
            Orders List
          </div>
          <div className="overflow-y-auto h-[40vh] sm:h-[65vh]">
            {orders.map((order) => (
              <div
                key={order._id}
                className={`p-2 w-full cursor-pointer transition-colors ${
                  activeOrder?._id === order._id ? "bg-gray-300" : "bg-white"
                }`}
                onClick={() => handleOrderClick(order)}
              >
                <h1 className="text-center font-bold">Order {order._id}</h1>
                <p className="text-left p-1">{order.customerName}</p>
                <p className="text-left p-1">{order.customerPhone}</p>
                <p className="text-left p-1">{order.status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order details */}
        <div className="shadow-md rounded-xl w-full sm:w-1/2 p-4 sm:p-8 bg-white">
          {activeOrder ? (
            <>
              <h2 className="text-xl font-semibold">Order {activeOrder._id} Details</h2>
              <p className="mt-4 text-lg">Name: {activeOrder.customerName}</p>
              <p className="mt-2 text-lg">Phone: {activeOrder.customerPhone}</p>
              <p className="mt-2 text-lg">Status: {activeOrder.status}</p>
            </>
          ) : (
            <p className="text-center text-gray-500">Select an order to view details</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Orders;