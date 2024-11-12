import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();
	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		} else {
			// add to cart
			addToCart(product);
		}
	};

	return (
		<div className='flex w-full relative flex-col overflow-hidden rounded-lg  shadow-2xl shadow-indigo-900'>
			<div className='relative mx-3 mt-3 flex h-70 overflow-hidden rounded-xl'>
				<img className='object-cover w-full' src={product.image} alt='product image' />
				<div className='absolute inset-0 bg-gray-600 bg-opacity-0' />
			</div>

			<div className='mt-4 px-5 pb-5'>
				<h5 className='text-xl font-semibold tracking-tight text-white'>{product.name}</h5>
                <p className='text-2xl font-semibold tracking-tight text-gray-400'>{product.description}</p>
				<div className='mt-2 mb-5 flex items-center justify-between'>
					<p>
						<span className='text-3xl font-bold text-indigo-600'>${product.price}</span>
					</p>
				</div>
				<button
					className='flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-3.5 text-center text-sm font-medium
					text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 w-full'
					onClick={handleAddToCart}
				>
					<ShoppingCart size={22} className='mr-2' />
					Add to cart
				</button>
			</div>
		</div>
	);
};
export default ProductCard;