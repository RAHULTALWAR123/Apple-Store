import { motion } from 'framer-motion';
import { Trash, Star, Settings } from 'lucide-react';
import { useProductStore } from '../stores/useProductStore';
import { Link } from 'react-router-dom';

const ProductsList = () => {
    const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

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
                                Product
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                            >
                                Price
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                            >
                                Category
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-gray-900 divide-y divide-gray-700">
                        {products?.map((product) => (
                            <tr key={product._id} className="hover:bg-indigo-600 flex flex-col sm:table-row sm:flex-row">
                                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-15 w-10">
                                            <img
                                                className="h-10 w-10 rounded-md object-cover"
                                                src={product.image}
                                                alt={product.name}
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-white">{product.name}</div>
                                            <div className="text-xs text-gray-400 sm:hidden">
                                                Price: ${product.price.toFixed(2)}
                                            </div>
                                            <div className="text-xs text-gray-400 sm:hidden">Category: {product.category}</div>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                    <div className="text-sm text-gray-300">${product.price.toFixed(2)}</div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                    <div className="text-sm text-gray-300">{product.category}</div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="flex justify-center space-x-2">
                                        <button
                                            onClick={() => toggleFeaturedProduct(product._id)}
                                            className={`flex-1 py-2 rounded-md ${
                                                product.isFeatured
                                                    ? 'bg-emerald-500 text-gray-900'
                                                    : 'bg-gray-600 text-gray-300'
                                            } hover:bg-emerald-500 transition-colors duration-200`}
                                        >
                                            <Star className="h-5 w-5 mx-auto" />
                                        </button>

                                        <button
                                            onClick={() => deleteProduct(product._id)}
                                            className="flex-1 py-2 rounded-md bg-red-600 text-gray-300 hover:bg-red-500 transition-colors duration-200"
                                        >
                                            <Trash className="h-5 w-5 mx-auto" />
                                        </button>

                                        <Link to={`/edit/${product._id}`}>
                                            <button className="flex-1 py-2 px-4 sm:px-4 rounded-md bg-yellow-500 text-gray-900 hover:bg-yellow-400 transition-colors duration-200">
                                                <Settings className="h-5 w-5 mx-auto" />
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

export default ProductsList;
