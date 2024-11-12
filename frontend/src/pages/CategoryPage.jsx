// import React from 'react'
import { motion } from "framer-motion";
import {FaArrowDown} from "react-icons/fa";
import {FaArrowUp} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {

    const {fetchProductsByCategory,products,fetchLowToHighProducts,fetchHighToLowProducts,fetchProductByName} = useProductStore();
    const {category} = useParams();
    const [vid,setVid] = useState("");
    const [img,setImg] = useState("");
    const [selectedFilter,setSelectedFilter] = useState("");
    const [options,setOptions] = useState([])
    const [input,setInput] = useState("");

    useEffect(() => {
        fetchProductsByCategory(category);

        if(category === "iPhone"){
            setVid("/cover-vid.mp4");
            setOptions(["iPhone 16","iPhone 15","iPhone 16 Pro Max","iPhone 15 Pro"]);
        }
        else if(category === "iPad"){
            setVid("/cover-vid1.mp4");
            setOptions(["iPad Air 4th Gen","iPad mini 5G","iPad mini Wifi","iPad Pro 4th Gen","iPad Pro 5th Gen"])
        }
        else if(category === "MacBook"){
            setVid("/cover-vid2.mp4");
            setOptions(["Macbook Air 2024 13inch","Macbook Pro 14inch"])
        }
        else if(category === "Airpods"){
            setImg("/airpods1.jpg");
            setOptions(["Airpods Pro 2nd Gen","Airpods 3rd Gen","Airpods 4","Airpods 2nd Gen"])
        }
        else if(category === "Apple Watch"){
            setVid("/cover-vid4.mp4");
            setOptions(["Apple Watch Series 8","Apple Watch Series 9","Apple Watch Ultra","Apple Watch Ultra 2","Apple Watch SE","Apple Watch Series 10"])
        }
        else if(category === "iMac"){
            setImg("/imacc.jpg");
            setOptions(["Apple iMac 24inch"])
        }
        
        else{
            setVid("");
        }
    },[fetchProductsByCategory,category]);

    useEffect(() => {
      if(input){
        console.log(input);
        fetchProductByName(input);
      }
    },[input,fetchProductByName]);

    const handleClick = (Filter) => {
      setSelectedFilter(Filter);

      fetchLowToHighProducts(category);
    }

    const handleClick2 = (Filter) => {
      setSelectedFilter(Filter);
      
      // fetchLowToHighProducts(category);
      fetchHighToLowProducts(category);
    }

    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   console.log(input);
    //   // fetchProductsByCategory(input);
    // }

    // console.log(products)
  return (
      <>
    <div className='min-h-screen'>
    <div className='relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <motion.h1
            className='text-center text-6xl sm:text-5xl font-bold text-indigo-600 mb-8'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            {category}
        </motion.h1>

        {vid && (
              <video
                className="rounded-xl w-[1500px] h-[600px] object-cover"
                src={vid}
                autoPlay
                muted
                loop
              ></video>

          )}

{img && (
  <div className="relative w-full h-[600px]">
    <img
      className="rounded-xl w-full h-full object-cover"
      src={img}
      alt="Cover"
    />
    {(category === "Airpods" || category === "iMac") && (
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-white text-4xl sm:text-6xl font-bold">
          {category === "Airpods" ? "The joy of quietude." : ""}
        </h2>
      </div>
    )}
  </div>
)}

<div className="flex flex-col sm:flex-row items-center justify-center mt-10 sm:mt-20 mb-10 sm:mb-20 gap-5 sm:gap-10">
    <h1 className="text-xl sm:text-2xl text-gray-300">Filter:</h1>

    <button
        onClick={() => handleClick("lowToHigh")}
        className={`${
            selectedFilter === "lowToHigh" ? "bg-indigo-600 text-white" : "bg-gray-300 text-black"
        } hover:bg-indigo-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm sm:text-base px-4 sm:px-5 py-2 sm:py-2.5 text-center w-1/2 sm:w-auto`}
    >
      <div className="flex items-center gap-1">
      <FaArrowUp/> Low to High
      </div>
    </button>

    <button
        onClick={() => handleClick2("highToLow")}
        className={`${
            selectedFilter === "highToLow" ? "bg-indigo-600 text-white" : "bg-gray-300 text-black"
        } hover:bg-indigo-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm sm:text-base px-4 sm:px-5 py-2 sm:py-2.5 text-center w-1/2 sm:w-auto`}
    >
      <div className="flex items-center gap-1">
      <FaArrowDown/>
        High to Low
        </div>
    </button>

    <select
        id="category"
        name="category"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="block w-1/2 sm:w-1/4 bg-indigo-600 border border-gray-900 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    >
        <option value="" >Select a category</option>
        {options.map((option) => (
            <option key={option} value={option}>
                {option}
            </option>
        ))}
    </select>
</div>


          <div>
            <h2 className='text-center text-5xl font-bold text-indigo-600 mb-10 mt-10'>Explore the lineup</h2>
          </div>


        <motion.div
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 justify-items-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            {products?.length === 0 && (
                <h2 className='text-3xl font-semibold text-gray-300 text-center col-span-full'>
                    No products found
                </h2>
            )}

            {products?.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </motion.div>
    </div>
</div>
</>
  )
}

export default CategoryPage
