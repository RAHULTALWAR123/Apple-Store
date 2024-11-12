import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import Navbar from "./components/Navbar"
import { Toaster } from "react-hot-toast"
import { useUserStore } from "./stores/useUserStore"
import { useEffect } from "react"
import LoadingSpinner from "./components/LoadingSpinner"
import AdminPage from "./pages/AdminPage"
import CategoryPage from "./pages/CategoryPage"
import { useCartStore } from "./stores/useCartStore"
import CartPage from "./pages/CartPage"
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage"
import PurchaseCancelPage from "./pages/PurchaseCancelPage"
import EditProduct from "./components/EditProduct"
import UserOrders from "./components/UserOrders"
import AdminUserOrders from "./components/AdminUserOrders"
// import { Search } from "lucide-react"
import SearchPage from "./pages/SearchPage"
// import { get } from "mongoose"


function App() {
  const {user,checkAuth,checkingAuth} = useUserStore();

  const {getCartItems} = useCartStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

  useEffect(() => {
		if (!user) return;

    (async () => {
      const items = await getCartItems();
      console.log(items); // This logs the cart items after they are fetched
    })();
	}, [getCartItems, user]);




  if(checkingAuth) return <LoadingSpinner/>


  return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>

<div className='absolute inset-0 overflow-hidden'>
    <div className='absolute inset-0'>
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(0,0,139,0.2)_0%,rgba(0,0,0,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
    </div>
</div>


<div className='relative z-50 pt-20'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signup" element={!user ? <SignUpPage/> : <Navigate to="/"/>}/>
        <Route path="/login" element={!user ? <LoginPage/> : <Navigate to="/"/>}/>
        <Route path="/secret-dashboard" element={user?.role === "admin" ? <AdminPage/> : <Navigate to="/"/>}/>
        <Route path="/category/:category" element={<CategoryPage/>}/>
        <Route path='/cart' element={user ? <CartPage /> : <Navigate to='/' />} />
        <Route path='/purchase-success' element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />} />
        <Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
        <Route path="/edit/:productId" element={user?.role === "admin" ? <EditProduct/> : <Navigate to="/"/>}/>
        <Route path="/orders/:userId" element={user ? <UserOrders/> : <Navigate to="/"/>}/>
        <Route path="/userOrders/:userId1" element={user?.role === "admin" ? <AdminUserOrders/> : <Navigate to="/"/>}/>
        <Route path="/search" element={<SearchPage/>}/>
      </Routes>
</div>
<Toaster/>

    </div>
  )
}

export default App