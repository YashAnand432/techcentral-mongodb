"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { FaBell, FaRegUser } from "react-icons/fa6";

import CartElement from "./CartElement";
import HeartElement from "./HeartElement";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import { config } from "@/lib/utils";

const Header = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { wishlist, setWishlist, wishQuantity } = useWishlistStore();

  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Logout successful!");
  };

  // getting all wishlist items by user id
  const getWishlistByUserId = async (id: string) => {
    const response = await fetch(`${config.apiURL}/api/wishlist/${id}`, {
      cache: "no-store",
    });
    const wishlist = await response.json();
    const productArray: {
      id: string;
      title: string;
      price: number;
      image: string;
      slug:string
      stockAvailabillity: number;
    }[] = [];
    
    wishlist.map((item: any) => productArray.push({id: item?.product?.id, title: item?.product?.title, price: item?.product?.price, image: item?.product?.mainImage, slug: item?.product?.slug, stockAvailabillity: item?.product?.inStock}));
    
    setWishlist(productArray);
  };

  // getting user by email so I can get his user id
  const getUserByEmail = async () => {
    if (session?.user?.email) {
      
      fetch(`${config.apiURL}/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
          getWishlistByUserId(data?.id);
        });
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, [session?.user?.email, wishlist.length]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Black background layer */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Glass morphism header with whitish tint and reduced vertical padding */}
      <div className="relative backdrop-blur-md bg-white/10">
        {/* Main header */}
        {pathname.startsWith("/admin") === false && (
          <div className="h-24 flex items-center justify-between px-16 max-[1320px]:px-16 max-md:px-6 max-lg:flex-col max-lg:gap-y-2 max-lg:justify-center max-lg:h-48 max-w-screen-2xl mx-auto">
            <Link href="/">
              <span className="text-white text-3xl">TechCentral</span>
            </Link>
            <SearchInput />
            <div className="flex gap-x-6 items-center">
              {/* Wishlist and Cart icons - only show when session exists */}
              {session && (
                <>
                  <div className="text-white">
                    <HeartElement wishQuantity={wishQuantity} />
                  </div>
                  <div className="text-white">
                    <CartElement />
                  </div>
                </>
              )}
              
              {/* User authentication section */}
              {session ? (
                <>
                  {/* <div className="flex items-center text-white">
                    <FaRegUser className="text-xl" />
                  </div> */}
                  <button 
                    onClick={handleLogout}
                    className="text-white hover:text-gray-300 transition-colors font-semibold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-x-4">
                  <Link 
                    href="/login" 
                    className="text-white hover:text-gray-300 transition-colors font-semibold"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    className="text-white hover:text-gray-300 transition-colors font-semibold"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Admin header */}
        {pathname.startsWith("/admin") === true && (
          <div className="flex justify-between h-24 items-center px-16 max-[1320px]:px-10 max-w-screen-2xl mx-auto max-[400px]:px-5">
            
            <div className="flex gap-x-5 items-center">
              <FaBell className="text-xl text-white" />
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="w-10">
                  <Image
                    src="/randomuser.jpg"
                    alt="random profile photo"
                    width={30}
                    height={30}
                    className="w-full h-full rounded-full"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-black/80 backdrop-blur-md rounded-box w-52 border border-white/20"
                >
                  <li>
                    <Link href="/admin" className="text-white hover:bg-white/20">Dashboard</Link>
                  </li>
                  <li>
                    <a className="text-white hover:bg-white/20">Profile</a>
                  </li>
                  <li onClick={handleLogout}>
                    <a href="#" className="text-white hover:bg-white/20">Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
