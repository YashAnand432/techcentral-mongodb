const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// First, create categories (they need to exist before products)
const demoCategories = [
  { name: "speakers" },
  { name: "trimmers" },
  { name: "laptops" },
  { name: "watches" },
  { name: "headphones" },
  { name: "juicers" },
  { name: "earbuds" },
  { name: "tablet-keyboards" },
  { name: "phone-gimbals" },
  { name: "mixer-grinders" },
  { name: "cameras" },
  { name: "smart-phones" },
];

// Products data (removed hardcoded IDs and category references)
const demoProducts = [
  {
    title: "Smart phone",
    price: 22,
    rating: 5,
    description: "This is smart phone description",
    mainImage: "product1.webp",
    slug: "smart-phone-demo",
    manufacturer: "Samsung",
    categoryName: "smart-phones", // We'll use this to find the category
    inStock: 0,
  },
  {
    title: "SLR camera",
    price: 24,
    rating: 0,
    description: "This is slr description",
    mainImage: "product2.webp",
    slug: "slr-camera-demo",
    manufacturer: "Canon",
    categoryName: "cameras",
    inStock: 0,
  },
  {
    title: "Mixer grinder",
    price: 25,
    rating: 4,
    description: "This is mixed grinder description",
    mainImage: "product3.webp",
    slug: "mixed-grinder-demo",
    manufacturer: "ZunVolt",
    categoryName: "mixer-grinders",
    inStock: 1,
  },
  {
    title: "Phone gimbal",
    price: 21,
    rating: 5,
    description: "This is phone gimbal description",
    mainImage: "product4.webp",
    slug: "phone-gimbal-demo",
    manufacturer: "Samsung",
    categoryName: "phone-gimbals",
    inStock: 1,
  },
  {
    title: "Tablet keyboard",
    price: 52,
    rating: 4,
    description: "This is tablet keyboard description",
    mainImage: "product5.webp",
    slug: "tablet-keyboard-demo",
    manufacturer: "Samsung",
    categoryName: "tablet-keyboards",
    inStock: 1,
  },
  {
    title: "Wireless earbuds",
    price: 74,
    rating: 3,
    description: "This is earbuds description",
    mainImage: "product6.webp",
    slug: "wireless-earbuds-demo",
    manufacturer: "Samsung",
    categoryName: "earbuds",
    inStock: 1,
  },
  {
    title: "Party speakers",
    price: 35,
    rating: 5,
    description: "This is party speakers description",
    mainImage: "product7.webp",
    slug: "party-speakers-demo",
    manufacturer: "SOWO",
    categoryName: "speakers",
    inStock: 1,
  },
  {
    title: "Slow juicer",
    price: 69,
    rating: 5,
    description: "Slow juicer desc",
    mainImage: "product8.webp",
    slug: "slow-juicer-demo",
    manufacturer: "Bosch",
    categoryName: "juicers",
    inStock: 1,
  },
  {
    title: "Wireless headphones",
    price: 89,
    rating: 3,
    description: "This is wireless headphones description",
    mainImage: "product9.webp",
    slug: "wireless-headphones-demo",
    manufacturer: "Sony",
    categoryName: "headphones",
    inStock: 1,
  },
  {
    title: "Smart watch",
    price: 64,
    rating: 3,
    description: "This is smart watch description",
    mainImage: "product10.webp",
    slug: "smart-watch-demo",
    manufacturer: "Samsung",
    categoryName: "watches",
    inStock: 1,
  },
  {
    title: "Notebook horizon",
    price: 52,
    rating: 5,
    description: "This is notebook description",
    mainImage: "product11.webp",
    slug: "notebook-horizon-demo",
    manufacturer: "HP",
    categoryName: "laptops",
    inStock: 1,
  },
  {
    title: "Mens trimmer",
    price: 54,
    rating: 5,
    description: "This is trimmer description",
    mainImage: "product12.webp",
    slug: "mens-trimmer-demo",
    manufacturer: "Gillete",
    categoryName: "trimmers",
    inStock: 0,
  },
  {
    title: "Sony Bluetooth Speaker",
    price: 100,
    rating: 5,
    description: "This is Sony Bluetooth Speaker",
    mainImage: "sony speaker image 1.jpg",
    slug: "sony-speaker-bluetooth",
    manufacturer: "Sony",
    categoryName: "speakers",
    inStock: 1,
  },
];

async function insertDemoData() {
  try {
    console.log("Starting data insertion...");

    // Step 1: Insert categories first
    console.log("Inserting categories...");
    const createdCategories = {};
    
    for (const category of demoCategories) {
      try {
        const createdCategory = await prisma.category.create({
          data: category,
        });
        createdCategories[category.name] = createdCategory.id;
        console.log(`Created category: ${category.name}`);
      } catch (error) {
        if (error.code === 'P2002') {
          // Category already exists, fetch it
          const existingCategory = await prisma.category.findUnique({
            where: { name: category.name }
          });
          createdCategories[category.name] = existingCategory.id;
          console.log(`Category already exists: ${category.name}`);
        } else {
          throw error;
        }
      }
    }

    // Step 2: Insert products with proper category references
    console.log("Inserting products...");
    const createdProducts = [];
    
    for (const product of demoProducts) {
      const { categoryName, ...productData } = product;
      
      const createdProduct = await prisma.product.create({
        data: {
          ...productData,
          categoryId: createdCategories[categoryName], // Link to actual category ID
        },
      });
      
      createdProducts.push(createdProduct);
      console.log(`Created product: ${product.title}`);
    }

    // Step 3: Insert images (linking to the Sony speaker)
    console.log("Inserting product images...");
    const sonyProduct = createdProducts.find(p => p.slug === "sony-speaker-bluetooth");
    
    if (sonyProduct) {
      const demoProductImages = [
        {
          productID: sonyProduct.id,
          image: "sony speaker image 1.jpg",
        },
        {
          productID: sonyProduct.id,
          image: "sony speaker image 2.jpg",
        },
        {
          productID: sonyProduct.id,
          image: "sony speaker image 3.jpg",
        },
        {
          productID: sonyProduct.id,
          image: "sony speaker image 4.jpg",
        },
      ];

      for (const image of demoProductImages) {
        await prisma.image.create({
          data: image,
        });
      }
      console.log("Demo images inserted successfully!");
    }

    console.log("All demo data inserted successfully!");
    
  } catch (error) {
    console.error("Error inserting demo data:", error);
    throw error;
  }
}

insertDemoData()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
