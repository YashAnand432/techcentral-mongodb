import Link from "next/link";
import React from "react";

const IntroducingSection = () => {
  return (
    <div className="py-20 pt-24 bg-gradient-to-l from-black to-gray-900">
      <div className="text-center flex flex-col gap-y-5 items-center">
        <h2 className="text-gray-600 text-8xl font-extrabold text-center mb-2 max-md:text-6xl max-[480px]:text-4xl">
          INTRODUCING <span className="text-gray-400">TECH</span><span className="text-gray-500">CENTRAL</span>
        </h2>
        <div>
          <p className="text-gray-500 text-center text-2xl font-semibold max-md:text-xl max-[480px]:text-base">
            Buy the latest electronics.
          </p>
          <p className="text-gray-400 text-center text-2xl font-semibold max-md:text-xl max-[480px]:text-base">
            The best electronics for tech lovers.
          </p>
          <Link href="/shop" className="block text-white bg-gray-600 font-bold px-12 py-3 text-xl hover:bg-gray-800 hover:text-gray-300 w-96 mt-10  max-md:text-lg max-md:w-72 max-[480px]:w-60 mx-auto">
            SHOP NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntroducingSection;
