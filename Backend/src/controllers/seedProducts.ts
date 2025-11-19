import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Product from "../models/Product.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const seedProducts = async () => {
  try {
    const assetsPath = path.join(__dirname, "../assets/products");
    const files = fs.readdirSync(assetsPath);

    const products = Array.from({ length: 10 }).map((_, idx) => {
      const randomImage = files[Math.floor(Math.random() * files.length)];

      return {
        name: `Product ${idx + 1}`,
        price: Number((Math.random() * 100).toFixed(2)),
        image: `/assets/products/${randomImage}`, // served statically
      };
    });

    await Product.insertMany(products);
    console.log("Products seeded!");
  } catch (err) {
    console.error(err);
  }
};
