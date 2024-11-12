
import { motion } from 'framer-motion';
import { useUserStore } from '../stores/useUserStore';
import { Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManageUsers = () => {
    const { users, toggleAdmin } = useUserStore();

    return (
        <motion.div
            className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-indigo-600 hidden sm:table-header-group">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                            >
                                User ID
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                            >
                                Email
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                            >
                                Role
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                            >
                                Orders
                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-gray-900 divide-y divide-gray-700">
                        {users.map((user) => (
                            <tr
                                key={user._id}
                                className="hover:bg-indigo-600 flex flex-col sm:table-row sm:flex-row sm:items-center"
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-white">
                                        <span className="sm:hidden font-semibold text-gray-300">User ID:</span> {user._id}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-300">
                                        <span className="sm:hidden font-semibold text-gray-300">Email:</span> {user.email}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm">
                                        <button
                                            onClick={() => toggleAdmin(user._id)}
                                            className={`p-2 rounded-md ${
                                                user.role === 'admin'
                                                    ? 'bg-red-600 text-white'
                                                    : 'bg-black text-gray-300'
                                            } hover:bg-gray-900 transition-colors duration-200`}
                                        >
                                            <span className="sm:hidden font-semibold text-gray-300">Role:</span> {user.role}
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-300">
                            <Link to={`/userOrders/${user._id}`}>
                            <button className='p-2 rounded-md bg-yellow-400 text-black hover:bg-yellow-700 transition-colors duration-200'>
                                <Truck/> 
                            </button>
                            </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default ManageUsers;
