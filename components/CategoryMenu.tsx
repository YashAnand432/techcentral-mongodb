import React from "react";
import CategoryItem from "./CategoryItem";
import Image from "next/image";
import { categoryMenuList } from "@/lib/utils";
import Heading from "./Heading";

const CategoryMenu = () => {
  return (
    <div className="py-10 bg-black">
      <Heading title="BROWSE CATEGORIES" />
      <div className="max-w-screen-2xl mx-auto py-10 gap-x-5 px-16 max-md:px-10 gap-y-5 grid grid-cols-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-[450px]:grid-cols-1">
        {categoryMenuList.map((item) => (
          <div 
            key={item.id}
            className="transition-all duration-300 ease-in-out hover:scale-110 hover:-translate-y-2"
          >
            <CategoryItem title={item.title} href={item.href}>
              <Image src={item.src} width={48} height={48} alt={item.title} />
            </CategoryItem>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;
