// import React from 'react'

import { Link, useParams } from "react-router-dom";
import { useOrderStore } from "../stores/useOrderStore";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Loader, PackageCheck, ShoppingBag } from "lucide-react";
// import { Link } from "lucide-react";

const UserOrders = () => {

    
    const {userId} = useParams();
    const {fetchAllOrders,deleteOrder,orders}  = useOrderStore();

    useEffect(() => {
        fetchAllOrders(userId);
    }, [fetchAllOrders,userId]);


    // const orders = [
    //     {
    //         _id: '1',
    //         createdAt: '2023-11-05',
    //         products: [
    //             {
    //                 product: {
    //                     _id: 'p1',
    //                     name: 'Product 1',
    //                     price: 29.99,
    //                     imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    //                 },
    //                 quantity: 2,
    //             },
    //             {
    //                 product: {
    //                     _id: 'p2',
    //                     name: 'Product 2',
    //                     price: 49.99,
    //                     imageUrl: 'https://via.placeholder.com/150',
    //                 },
    //                 quantity: 1,
    //             },
    //         ],
    //         totalAmount: 109.97,
    //     },
    //     {
    //         _id: '2',
    //         createdAt: '2023-11-02',
    //         products: [
    //             {
    //                 product: {
    //                     _id: 'p3',
    //                     name: 'Product 3',
    //                     price: 15.99,
    //                     imageUrl: 'https://via.placeholder.com/150',
    //                 },
    //                 quantity: 3,
    //             },
    //         ],
    //         totalAmount: 47.97,
    //     },
    // ];


  return (

    <div className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-indigo-600 mb-6">My Orders</h2>

            {orders.length === 0 && (
                <motion.div
                className='flex flex-col items-center justify-center space-y-4 py-16'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <ShoppingBag className='h-24 w-24 text-indigo-600' />
                <h3 className='text-2xl font-semibold '>No orders</h3>
                <p className='text-gray-400'>Looks like you {"haven't"} purchased anything yet.</p>
                <Link
                    className='mt-4 rounded-md bg-indigo-600 px-6 py-2 text-white transition-colors hover:bg-indigo-700'
                    to='/'
                >
                    Start Shopping
                </Link>
            </motion.div>
            )}

            {orders.map((order) => (
                <div key={order._id} className="bg-gray-900 rounded-lg p-4 mb-6">

                    <div className="flex items-center justify-between">
                    <div className="mb-4">
                        <p className="sm:text-xs lg:text-sm text-gray-400">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p className="sm:text-xs lg:text-sm text-gray-400">Order Total: ${order.totalAmount.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-1">
                    <button 
                    className={`flex items-center gap-2 p-2 rounded-md ${
                        order.status === 'pending'
                            ? 'bg-red-600 text-white'
                            : 'bg-emerald-600 text-white'
                    } transition-colors duration-200`}
                    >
                            {order.status === "pending" ? <Loader/> : <PackageCheck/>}
                            {order.status === "pending" ? "Pending..." : "Delivered"}
                    </button>
                    {order.status === "pending" && (
                        <button
                        onClick={() => deleteOrder(order._id)}
                        className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-white hover:text-black transition-colors duration-200">
                            Cancel
                        </button>
                    )}          
                    </div>

                    </div>              
                    {order.products.map(({ product, quantity }) => (
                        <div key={product._id} className="flex items-center border-b border-gray-700 py-4">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-16 h-16 rounded-lg object-cover mr-4"
                            />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                                <p className="text-gray-400">Variant: {product.description}</p>
                                <p className="text-gray-400">Price: ${product.price.toFixed(2)}</p>
                                <p className="text-gray-400">Quantity: {quantity}</p>
                            </div>


                            <div className="text-right text-indigo-600 font-bold">
                                ${Number(product.price * quantity).toFixed(2)}
                            </div>
                                {/* <button className="px-4 py-2 rounded-md bg-red-600 hover:bg-white hover:text-red-600 transition-colors duration-200">
                                    {order.status}
                                </button>     */}


                        </div>
                    ))}
                </div>
            ))}
        </div>
  )
}

export default UserOrders
