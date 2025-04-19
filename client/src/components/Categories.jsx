import React from "react";
import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Categories</p>
      <div className="grid grid-cols-2 gap-8">
        {/* First 3 categories */}
        <div className="border border-gray-300 bg-primary/10 rounded-lg p-4 px-8 mt-6">
          <div className="flex items-center justify-center mb-4">
          <p className="font-semibold">Recycled Product</p>

          </div>
          <div className="grid grid-cols-3 gap-6">
            {categories.slice(0, 3).map((category, index) => (
              <div
                key={index}
                className="group cursor-pointer border border-primary py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center"
                style={{ backgroundColor: category.bgColor }}
                onClick={() => {
                  navigate(`/products/${category.path.toLowerCase()}`);
                  scrollTo(0, 0);
                }}
              >
                <img
                  className="group-hover:scale-105 transition-transform max-w-28"
                  src={category.image}
                  alt={category.text}
                />
                <p className="text-sm font-medium">{category.text}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end mt-4">
            <Link
              to="/categories"
              className="text-primary  px-1 rounded-3xl transition-all text-sm font-medium ml-2"
            >
              more...
            </Link>
          </div>
        </div>

        {/* Next 3 categories */}
        <div className="border border-gray-300 bg-primary/10 rounded-lg p-4 px-8 mt-6">
          <div className="flex items-center justify-center mb-4">
          <p className="font-semibold">Upcycled Product</p>

          </div>
          <div className="grid grid-cols-3 gap-6">
            {categories.slice(0, 3).map((category, index) => (
              <div
                key={index}
                className="group border border-primary cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center"
                style={{ backgroundColor: category.bgColor }}
                onClick={() => {
                  navigate(`/products/${category.path.toLowerCase()}`);
                  scrollTo(0, 0);
                }}
              >
                <img
                  className="group-hover:scale-105 transition-transform max-w-28"
                  src={category.image}
                  alt={category.text}
                />
                <p className="text-sm font-medium">{category.text}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end mt-4">
            <Link
              to="/categories"
              className="text-primary  px-1 rounded-3xl transition-all text-sm font-medium ml-2"
            >
              more...
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;