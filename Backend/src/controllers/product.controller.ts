import axios from "axios";
import Product from "../models/Product";
import { Request, Response } from "express";

export const seedProducts = async (req: Request, res: Response) => {
  try {
    const API_KEY = process.env.PIXABAY_KEY;

    if (!API_KEY) {
      return res.status(500).json({ message: "Missing PIXABAY_KEY in .env" });
    }

    const getRandomImage = async (): Promise<string | null> => {
      const queries = ["books", "stationery", "pencils", "office", "bookshop", "library"];
      const q = queries[Math.floor(Math.random() * queries.length)];

      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${q}&image_type=photo&per_page=50`
      );

      const hits = response.data.hits;
      if (!hits || hits.length === 0) return null;

      const randomIndex = Math.floor(Math.random() * hits.length);
      return hits[randomIndex].largeImageURL;
    };

    const products = [];
    for (let i = 0; i < 12; i++) {
      const image = await getRandomImage();

      products.push({
        name: `Product ${i + 1}`,
        price: Number((Math.random() * 100 + 5).toFixed(2)),
        image,
      });
    }

    await Product.deleteMany({});
    const created = await Product.insertMany(products);

    return res.json({
      message: "Products seeded successfully with Pixabay images",
      products: created,
    });

  } catch (error: any) {
  console.error("SEED ERROR:", error.response?.data || error.message || error);
  return res.status(500).json({
    message: "Error seeding products",
    error: error.response?.data || error.message || String(error)
  });
}

};


