import { useState } from 'react';
import { ShoppingCart, House, UserPlus, LogIn, LogOut, Lock, User, Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { FaApple } from "react-icons/fa";

const Navbar = () => {
    const { user, logout } = useUserStore();
    const { cart } = useCartStore();
    const isAdmin = user?.role === "admin";
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <header className='fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-indigo-800 lg:border-none'>
            <div className='container mx-auto px-4 py-3 lg:flex lg:justify-between lg:items-center'>
                <div className='flex justify-between items-center'>
                    <div className='text-2xl font-bold text-indigo-600 items-center space-x-2 flex'>
                        <FaApple size={32} className='text-white'/>
                    </div>
                    {/* Mobile Menu Button */}
                    <button className='text-white lg:hidden' onClick={toggleSidebar}>
                        <Menu size={28} />
                    </button>
                </div>

                {/* Sidebar for Small Screens */}
                <div className={`fixed top-0 left-0 h-full bg-gray-800 lg:bg-transparent p-6 z-50 w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:static lg:flex lg:w-auto lg:p-0 lg:translate-x-0`}>
                    <nav className='flex flex-col lg:flex-row lg:items-center gap-4'>
                        <Link to='/' className='text-gray-300 hover:text-indigo-600 transition duration-300 ease-in-out' onClick={toggleSidebar}><House /></Link>
						<Link to='/search' className='flex text-gray-300 hover:text-indigo-600 transition duration-300 ease-in-out' onClick={toggleSidebar}><Search />
						<span className='lg:hidden sm:inline ml-2'>Search Product</span>
						</Link>
                        
                        {user && (
                            <Link to={"/cart"} className='relative group text-gray-300 hover:text-indigo-600 transition duration-300 ease-in-out' onClick={toggleSidebar}>
                                <ShoppingCart className='inline-block mr-1 group-hover:text-indigo-600' size={22} />
								<span className='lg:hidden sm:inline ml-2'>My Cart</span>
                                {cart.length > 0 && (
                                    <span className='absolute -top-2 -left-2 bg-indigo-600 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-indigo-600 transition duration-300 ease-in-out'>
                                        {cart.length}
                                    </span>
                                )}
                            </Link>
                        )}

                        {user && (
                            <Link to={`/orders/${user._id}`} className='relative group text-gray-300 hover:text-indigo-600 transition duration-300 ease-in-out' onClick={toggleSidebar}>
                                <User className='inline-block mr-1 group-hover:text-indigo-600' size={22} />
								<span className='lg:hidden sm:inline ml-2'>My Orders</span>
                            </Link>
                        )}
                        {isAdmin && (
                            <Link to={'/secret-dashboard'} className='bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center' onClick={toggleSidebar}>
                                <Lock className='inline-block mr-1' size={18} />
                                <span className='sm:inline'>Dashboard</span>
                            </Link>
                        )}

                        {user ? (
                            <button className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out' onClick={() => { logout(); toggleSidebar(); }}>
                                <LogOut size={18} />
                                <span className='sm:inline ml-2'>Log Out</span>
                            </button>
                        ) : (
                            <>
                                <Link to={"/signup"} className='bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out' onClick={toggleSidebar}>
                                    <UserPlus className='mr-2' size={18} />
                                    Sign Up
                                </Link>
                                <Link to={"/login"} className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out' onClick={toggleSidebar}>
                                    <LogIn className='mr-2' size={18} />
                                    Login
                                </Link>
                            </>
                        )}
                    </nav>
                </div>

                {/* Overlay to close sidebar */}
                {isSidebarOpen && (
                    <div onClick={toggleSidebar} className='fixed inset-0 bg-black opacity-50 z-40 lg:hidden'></div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
