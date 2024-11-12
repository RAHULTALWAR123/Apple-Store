import { motion } from "framer-motion";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import { useEffect } from "react";
import FeaturedProducts from "../components/FeaturedProducts";
// import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  { href: "/MacBook", name: "MacBook", info: "Designed to go places", imageUrl: "/explore5.jpeg" },
  { href: "/iPhone", name: "iPhone", info: "Built for Apple Intelligence", imageUrl: "/explore1.jpeg" },
  { href: "/iPad", name: "iPad", info: "Powerhouse of Performance", imageUrl: "/explore4.jpeg" },
  { href: "/Airpods", name: "Airpods", info: "Iconic . Now SuperSonic", imageUrl: "/explore3.jpeg" },
  { href: "/Apple Watch", name: "Apple Watch", info: "New Finish . Never Quit", imageUrl: "/explore2.jpeg" },
  { href: "/iMac", name: "iMac", info: "Built for Apple Intelligence", imageUrl: "/explore6.jpeg" },
];

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);



  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <motion.div
          className='sm:mx-auto sm:w-full sm:max-w-md'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* <h2 className='text-center text-6xl font-extrabold text-indigo-600'>Croma</h2> */}
        </motion.div>

        <motion.div
          className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* <p className='text-center text-xl text-gray-300 mb-12'>
            The innovative Apple technology with a touch of creativity
          </p> */}
        </motion.div>
        </div>

        <div className='relative min-h-screen text-white overflow-hidden'>
        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
          <h1 className='text-center text-5xl sm:text-6xl font-bold text-indigo-600 mb-4'>
            Just Dropped 
          </h1>

          <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4'>
            <img src="/first.webp"  className='lg:h-[60vh] lg:w-[100vw] sm:h-[40vh]' alt="item1" />
            <img src="/first2.webp" className='lg:h-[60vh] lg:w-[100vw] sm:h-[40vh]' alt="item1" />
            <img src="/first3.webp" className='lg:h-[60vh] lg:w-[100vw] sm:h-[40vh]' alt="item1" />
            <img src="/first4.webp" className='lg:h-[60vh] lg:w-[100vw] sm:h-[40vh]' alt="item1" />
            <img src="/first5.webp" className='lg:h-[60vh] lg:w-[100vw] sm:h-[40vh]' alt="item1" />
            <img src="/first6.webp" className='lg:h-[60vh] lg:w-[100vw] sm:h-[40vh]' alt="item1" />
          </div>
          </div>
          </div>

      <div className='relative min-h-screen text-white overflow-hidden'>
        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
          <h1 className='text-center text-5xl sm:text-6xl font-bold text-indigo-600 mb-4'>
            Explore Products
          </h1>
          <p className='text-center text-xl text-gray-300 mb-12'>
            Discover high performance advanced categories of Apple
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4'>
            {categories.map((category) => (
              <CategoryItem category={category} key={category.name} />
            ))}
          </div>

          {!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
        </div>
      </div>
    </>
  );
};

export default HomePage;
