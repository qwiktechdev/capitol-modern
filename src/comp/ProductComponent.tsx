import React from 'react';
import { Product } from '../Services/interface';


interface ProductPageProps {
  data: Product;
}

const ProductPage: React.FC<ProductPageProps> = ({ data }) => {
  return (
    <>
      <div className="text-center py-7 md:py-11">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-red-600">
          {data.title}
        </h1>
        <p className="text-md text-center mt-2 text-gray-700">
         {data.subtitle}
        </p>
      </div>
      <div className="container mx-auto p-6 flex flex-col md:flex-row  justify-between">
        {/* Left Section */}
        <div className="md:w-1/2 w-full">
          <img
            src={data.imageUrl}
            alt={data.productName}
            className="w-full h-[50vh] md:h-[80vh]"
          />
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 w-full mt-6  md:mt-0 md:pl-12">
          {/* Product Info */}
          <div className="">
            <h2 className="text-xl font-bold">{data.productName}</h2>
            <div className="flex items-center">
              <img
                src={data.ownerImage}
                alt="Author"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-4">
                <p className="font-semibold">{data.ownerName}</p>
                <p className="text-yellow-500">⭐⭐⭐<span className='text-[#cccccc]'>⭐</span>  4/3 Ratings</p>
              </div>
            </div>

            {/* Price and Button */}
            <div className="mt-6">
              <p className="text-2xl font-bold">${data.amount}</p>
              <button className="mt-4 px-6 py-3 bg-red-600 text-white font-bold rounded-lg">
                Buy Now
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="mt-4 text-gray-700 ">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
