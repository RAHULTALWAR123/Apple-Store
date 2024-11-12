import { useParams } from "react-router-dom";
import { useOrderStore } from "../stores/useOrderStore";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader, PackageCheck, ShoppingBag } from "lucide-react";

const AdminUserOrders = () => {
    const { userId1 } = useParams();
    const { fetchAllOrders, orders, toggleOrderStatus, loading } = useOrderStore();
    const [localOrders, setLocalOrders] = useState([]);

    // Fetch orders on component mount or userId change
    useEffect(() => {
        const loadOrders = async () => {
            await fetchAllOrders(userId1);
        };
        loadOrders();
    }, [fetchAllOrders, userId1]);

    // Sync local orders with store orders for immediate updates
    useEffect(() => {
        setLocalOrders(orders);
    }, [orders]);

    // Toggle status and update locally for immediate feedback
    const handleToggleStatus = async (orderId) => {
        const updatedStatus = await toggleOrderStatus(orderId);
        setLocalOrders((prevOrders) =>
            prevOrders.map((order) =>
                order._id === orderId ? { ...order, status: updatedStatus } : order
            )
        );
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-indigo-600 mb-6">User Orders</h2>

            {loading && (
                <motion.div
                    className="flex flex-col items-center justify-center space-y-4 py-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-gray-400">Loading orders...</p>
                </motion.div>
            )}

            {!loading && localOrders.length === 0 && (
                <motion.div
                    className="flex flex-col items-center justify-center space-y-4 py-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <ShoppingBag className="h-24 w-24 text-indigo-600" />
                    <h3 className="text-2xl font-semibold">Empty</h3>
                    <p className="text-gray-400">No orders found for this user</p>
                </motion.div>
            )}

            {localOrders.map((order) => (
                <div key={order._id} className="bg-gray-900 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-gray-400">
                                Order Date: {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-400">
                                Order Total: ${order.totalAmount.toFixed(2)}
                            </p>
                        </div>
                        <button
                            onClick={() => handleToggleStatus(order._id)}
                            disabled={order.status === "delivered"}  // Disable if already delivered
                            className={`flex items-center gap-2 p-2 rounded-md ${
                                order.status === "pending"
                                    ? "bg-red-600 text-white"
                                    : "bg-emerald-600 text-white"
                            } ${order.status === "delivered" ? "cursor-not-allowed opacity-70" : "hover:bg-white hover:text-black transition-colors duration-200"}`}
                        >
                            {order.status === "pending" ? <Loader/> : <PackageCheck/>}
                            {order.status === "pending" ? "Pending..." : "Delivered"}
                        </button>
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
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default AdminUserOrders;
