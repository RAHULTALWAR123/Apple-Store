import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <div className='relative overflow-hidden h-full w-full rounded-lg group'>
      <Link to={"/category" + category.href}>  {/* Adjusted link to use category.href directly */}
        <div className='w-full h-full cursor-pointer'>
          <div className='absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10' />
          <img
		//   style={{height:"700px",width:"700px"}}
            src={category.imageUrl}
            alt={category.name}
            className='w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110'
            loading='lazy'
          />
          <div className='absolute top-6 left-2 right-0 p-4 z-20'>
            <h3 className='text-white text-4xl font-bold mb-2'>{category.name}</h3>
            <p className='text-gray-100 text-md '>{category.info}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
