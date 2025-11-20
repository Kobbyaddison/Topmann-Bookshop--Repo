import axios from "axios";
import Product from "../models/Product.js";

export const seedProducts = async () => {
  try {
    const API_KEY = process.env.PIXABAY_KEY;

    const getRandomImage = async () => {
      const q = ["books", "stationery", "pencils", "office"].sort(() => 0.5 - Math.random())[0];

      const res = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${q}&image_type=photo&per_page=50`
      );

      const hits = res.data.hits;
      if (!hits.length) return null;

      const random = hits[Math.floor(Math.random() * hits.length)];
      return random.largeImageURL;
    };

    const products = [];

    for (let i = 0; i < 10; i++) {
      const img = await getRandomImage();

      products.push({
        name: `Product ${i + 1}`,
        price: Number((Math.random() * 100).toFixed(2)),
        image: img,
      });
    }

    await Product.insertMany(products);
    console.log("Seeded with Pixabay images!");
  } catch (err) {
    console.error(err);
  }
};
