import React from "react";
import ProductItem from "./ProductItem";
import Heading from "./Heading";
import { config } from "@/lib/utils";

const ProductsSection = async () => {
  try {
    // sending API request for getting all products
    const response = await fetch(`${config.apiURL}/api/products`);
    
    // Check if response is successful
    if (!response.ok) {
      console.error(`API Error: ${response.status} - ${response.statusText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Check content type
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response:', text);
      throw new Error('Server returned non-JSON response');
    }
    
    // Get the response text first to check if it's empty
    const text = await response.text();
    if (!text.trim()) {
      console.error('Empty response from server');
      throw new Error('Empty response from server');
    }
    
    // Parse JSON
    const products = JSON.parse(text);
    
    // Check if products is an array
    if (!Array.isArray(products)) {
      console.error('Products is not an array:', products);
      throw new Error('Invalid products data format');
    }
    
    return (
      <div className="bg-black border-t-4 border-white">
        <div className="max-w-screen-2xl mx-auto pt-20">
          <Heading textColor="text-gray-500" title="FEATURED PRODUCTS" />
          <div className="grid grid-cols-4 justify-items-center max-w-screen-2xl mx-auto py-10 gap-x-2 px-10 gap-y-8 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
            {products.map((product: Product) => (
              <ProductItem key={product.id} product={product} color="white" />
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in ProductsSection:', error);
    
    // Return error UI
    return (
      <div className="bg-black border-t-4 border-white">
        <div className="max-w-screen-2xl mx-auto pt-20">
          <Heading textColor="text-gray-500" title="FEATURED PRODUCTS" />
          <div className="text-center py-20">
            <p className="text-white text-lg mb-4">
              Unable to load products at the moment
            </p>
            <p className="text-gray-400">
              Please check your connection and try again later
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-2 bg-white text-black rounded hover:bg-gray-200"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductsSection;
