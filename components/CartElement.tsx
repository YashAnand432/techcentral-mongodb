
"use client";
import Link from 'next/link'
import React from 'react'
import { FaCartShopping } from 'react-icons/fa6'
import { useProductStore } from "@/app/_zustand/store";

const CartElement = () => {
    const { allQuantity } = useProductStore();
  return (
    <div className="relative">
            <Link href="/cart">
              <FaCartShopping className="text-2xl text-white" />
              <span className="block w-6 h-6 bg-gray-700 text-white rounded-full flex justify-center items-center absolute top-[-17px] right-[-22px]">
                { allQuantity }
              </span>
            </Link>
          </div>
  )
}

export default CartElement