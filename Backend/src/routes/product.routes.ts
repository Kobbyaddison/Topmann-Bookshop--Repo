import express from "express";
import axios from "axios";
import Product from "../models/Product.js";
import { Types } from "mongoose";

const router = express.Router();

// Random helper
const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

router.get("/seed", async (req, res) => {
  try {
    const API_KEY = process.env.PIXABAY_KEY;
    if (!API_KEY) {
      return res.status(500).json({ error: "Missing PIXABAY_KEY in .env" });
    }

    const queries = [
      "books",
      "stationery",
      "pens",
      "notebook",
      "office supplies",
      "pencils",
      "bookstore",
      "writing tools",
      "school materials"
    ];

    const fetchRandomImage = async () => {
      const q = getRandomItem(queries);

      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
          q
        )}&image_type=photo&per_page=50&safesearch=true`
      );

      const hits = response?.data?.hits || [];
      if (!hits.length) return null;

      const randomImage = hits[Math.floor(Math.random() * hits.length)];
      return randomImage.largeImageURL;
    };

    // Clean existing
    await Product.deleteMany({});

    const products = [];

    for (let i = 1; i <= 12; i++) {
      const imgUrl = await fetchRandomImage();

      products.push({
        title: `Sample Product ${i}`,
        author: "Topmann Bookshop",
        description: "Auto-generated seeded product.",
        price: Number((Math.random() * 100 + 10).toFixed(2)),
        compareAtPrice: Number((Math.random() * 120 + 20).toFixed(2)),
        stock: Math.floor(Math.random() * 50) + 5,
        sku: `SKU-${Date.now()}-${i}`,
        categories: [],
        images: imgUrl
          ? [{ url: imgUrl, publicId: null }]
          : [],
        ratingAvg: 0,
        ratingCount: 0
      });
    }

    await Product.insertMany(products);

    res.json({ message: "Products seeded successfully", count: products.length });
  } catch (error: any) {
    console.error("SEED ERROR:", error.response?.data || error.message || error);
    res.status(500).json({
      message: "Error seeding products",
      error: error.response?.data || error.message
    });
  }
});

export default router;




