"use client";
import { usePaginationStore } from "@/app/_zustand/paginationStore";
import React from "react";

const Pagination = () => {
  // getting from Zustand store current page and methods for incrementing and decrementing current page
  const { page, incrementPage, decrementPage } = usePaginationStore();
  return (
    <div className="join flex justify-center py-16">
      <button
        className="join-item btn btn-lg bg-gray-700 text-white hover:bg-white hover:text-gray-600"
        onClick={() => decrementPage()}
      >
        «
      </button>
      <button className="join-item btn btn-lg bg-gray-700 text-white hover:bg-gray-600">
        Page {page}
      </button>
      <button
        className="join-item btn btn-lg bg-gray-700 text-white hover:bg-white hover:text-gray-600"
        onClick={() => incrementPage()}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
