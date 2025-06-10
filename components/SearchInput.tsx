"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchInput = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const router = useRouter();

  const searchProducts = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?search=${searchInput}`);
    setSearchInput("");
  };

  return (
    <form className="flex w-full justify-center" onSubmit={searchProducts}>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search for products"
        className="bg-gray-900 text-white placeholder-gray-400 border border-gray-700 w-[70%] rounded-r-none outline-none focus:outline-none px-4 py-2 max-sm:w-full"
      />
      <button 
        type="submit" 
        className="bg-gray-800 text-white px-4 py-2 rounded-l-none rounded-r-xl hover:bg-gray-700 border border-gray-700 border-l-0 transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;
