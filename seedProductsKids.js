const mongoose = require('mongoose');
const Product = require('./models/product'); // import Product model

const mongoURI = 'mongodb+srv://AHANAAWASTHI-MERN:MERN-Cluster!2802@mern-projects.rzxtk1k.mongodb.net/ecommerceDB?retryWrites=true&w=majority&appName=MERN-projects';

mongoose.connect(mongoURI)
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

function calculateDiscountedPrice(originalPrice, discount) {
    return Math.round(originalPrice - (originalPrice * discount / 100));
}
const KidsProducts = [
  { name: "Kids Casual T-Shirt", description: "Comfortable cotton t-shirt for kids", category: "Kids", subCategory: "T-Shirt", originalPrice: 499, discount: "20%", price: 399, imageUrl: "../images/Kids/kid1.png", inStock: true },
  { name: "Kids Denim Shorts", description: "Durable denim shorts for everyday wear", category: "Kids", subCategory: "Shorts", originalPrice: 699, discount: "15%", price: 594, imageUrl: "../images/Kids/kid2.png", inStock: false },
  { name: "Kids Hoodie", description: "Warm hoodie with front pocket", category: "Kids", subCategory: "Hoodie", originalPrice: 799, discount: "25%", price: 599, imageUrl: "../images/Kids/kid3.png", inStock: true },
  { name: "Kids Joggers", description: "Soft joggers for playtime and comfort", category: "Kids", subCategory: "Joggers", originalPrice: 599, discount: "10%", price: 539, imageUrl: "../images/Kids/kid4.png", inStock: true },
  { name: "Kids School Shirt", description: "Formal school shirt for daily wear", category: "Kids", subCategory: "Shirts", originalPrice: 449, discount: "0%", price: 449, imageUrl: "../images/Kids/kid5.png", inStock: false },
  { name: "Kids Party Dress", description: "Colorful party dress for girls", category: "Kids", subCategory: "Dress", originalPrice: 899, discount: "20%", price: 719, imageUrl: "../images/Kids/kid6.png", inStock: true },
  { name: "Kids Summer Cap", description: "Lightweight cotton cap for sunny days", category: "Kids", subCategory: "Cap", originalPrice: 199, discount: "10%", price: 179, imageUrl: "../images/Kids/kid7.png", inStock: true },
  { name: "Kids Sneakers", description: "Durable and comfy sneakers for kids", category: "Kids", subCategory: "Shoes", originalPrice: 1299, discount: "15%", price: 1104, imageUrl: "../images/Kids/kid8.png", inStock: false },
  { name: "Kids Winter Jacket", description: "Warm jacket for winter season", category: "Kids", subCategory: "Jacket", originalPrice: 1499, discount: "25%", price: 1124, imageUrl: "../images/Kids/kid9.png", inStock: true },
  { name: "Kids Socks Pack", description: "Pack of 5 cotton socks", category: "Kids", subCategory: "Socks", originalPrice: 299, discount: "10%", price: 269, imageUrl: "../images/Kids/kid10.png", inStock: true },
  { name: "Kids Swimwear", description: "Comfortable swimwear for kids", category: "Kids", subCategory: "Swimwear", originalPrice: 799, discount: "20%", price: 639, imageUrl: "../images/Kids/kid11.png", inStock: false },
  { name: "Kids Leggings", description: "Stretchy leggings for daily use", category: "Kids", subCategory: "Leggings", originalPrice: 499, discount: "15%", price: 424, imageUrl: "../images/Kids/kid12.png", inStock: true },
  { name: "Kids Winter Gloves", description: "Warm gloves for winter", category: "Kids", subCategory: "Gloves", originalPrice: 299, discount: "10%", price: 269, imageUrl: "../images/Kids/kid13.png", inStock: true },
  { name: "Kids Raincoat", description: "Waterproof raincoat for rainy days", category: "Kids", subCategory: "Raincoat", originalPrice: 799, discount: "20%", price: 639, imageUrl: "../images/Kids/kid14.png", inStock: false },
  { name: "Kids Pajama Set", description: "Comfortable sleepwear set", category: "Kids", subCategory: "Pajama", originalPrice: 699, discount: "15%", price: 594, imageUrl: "../images/Kids/kid15.png", inStock: true },
  { name: "Kids Sandals", description: "Lightweight sandals for summer", category: "Kids", subCategory: "Shoes", originalPrice: 599, discount: "10%", price: 539, imageUrl: "../images/Kids/kid16.png", inStock: true },
  { name: "Kids Frock", description: "Pretty frock for girls", category: "Kids", subCategory: "Dress", originalPrice: 799, discount: "20%", price: 639, imageUrl: "../images/Kids/kid17.png", inStock: false },
  { name: "Kids Backpack", description: "Durable backpack for school", category: "Kids", subCategory: "Bags", originalPrice: 999, discount: "15%", price: 849, imageUrl: "../images/Kids/kid18.png", inStock: true },
  { name: "Kids Capris", description: "Comfortable capris for girls", category: "Kids", subCategory: "Capris", originalPrice: 499, discount: "10%", price: 449, imageUrl: "../images/Kids/kid19.png", inStock: true },
  { name: "Kids Sports T-Shirt", description: "Lightweight sports t-shirt", category: "Kids", subCategory: "T-Shirt", originalPrice: 399, discount: "0%", price: 399, imageUrl: "../images/Kids/kid20.png", inStock: false },
  { name: "Kids Winter Cap", description: "Warm winter cap", category: "Kids", subCategory: "Cap", originalPrice: 299, discount: "10%", price: 269, imageUrl: "../images/Kids/kid21.png", inStock: true },
  { name: "Kids Party Shoes", description: "Fancy shoes for parties", category: "Kids", subCategory: "Shoes", originalPrice: 1299, discount: "20%", price: 1039, imageUrl: "../images/Kids/kid22.png", inStock: true },
  { name: "Kids Hoodie Dress", description: "Hoodie styled dress", category: "Kids", subCategory: "Dress", originalPrice: 899, discount: "15%", price: 764, imageUrl: "../images/Kids/kid23.png", inStock: false },
  { name: "Kids Jogging Shorts", description: "Soft shorts for jogging", category: "Kids", subCategory: "Shorts", originalPrice: 499, discount: "10%", price: 449, imageUrl: "../images/Kids/kid24.png", inStock: true },
  { name: "Kids Tank Top", description: "Cotton tank top", category: "Kids", subCategory: "T-Shirt", originalPrice: 299, discount: "0%", price: 299, imageUrl: "../images/Kids/kid25.png", inStock: true },
  { name: "Kids Sweatshirt", description: "Warm sweatshirt for cold weather", category: "Kids", subCategory: "Sweatshirt", originalPrice: 699, discount: "20%", price: 559, imageUrl: "../images/Kids/kid26.png", inStock: false },
  { name: "Kids Shorts Set", description: "Matching shorts and t-shirt set", category: "Kids", subCategory: "Set", originalPrice: 799, discount: "15%", price: 679, imageUrl: "../images/Kids/kid27.png", inStock: true },
  { name: "Kids Swim Trunks", description: "Swim trunks for boys", category: "Kids", subCategory: "Swimwear", originalPrice: 599, discount: "10%", price: 539, imageUrl: "../images/Kids/kid28.png", inStock: true },
  { name: "Kids Ankle Socks", description: "Pack of 5 ankle socks", category: "Kids", subCategory: "Socks", originalPrice: 199, discount: "0%", price: 199, imageUrl: "../images/Kids/kid29.png", inStock: false },
  { name: "Kids Cap Set", description: "Pack of colorful caps", category: "Kids", subCategory: "Cap", originalPrice: 299, discount: "10%", price: 269, imageUrl: "../images/Kids/kid30.png", inStock: true },
  { name: "Kids Fleece Jacket", description: "Soft fleece jacket for winter", category: "Kids", subCategory: "Jacket", originalPrice: 999, discount: "20%", price: 799, imageUrl: "../images/Kids/kid31.png", inStock: true },
  { name: "Kids Tutu Dress", description: "Cute tutu dress for girls", category: "Kids", subCategory: "Dress", originalPrice: 899, discount: "15%", price: 764, imageUrl: "../images/Kids/kid32.png", inStock: false },
  { name: "Kids Sport Shoes", description: "Shoes for outdoor activities", category: "Kids", subCategory: "Shoes", originalPrice: 1299, discount: "10%", price: 1169, imageUrl: "../images/Kids/kid33.png", inStock: true },
  { name: "Kids Lounge Set", description: "Comfortable lounge wear set", category: "Kids", subCategory: "Set", originalPrice: 799, discount: "20%", price: 639, imageUrl: "../images/Kids/kid34.png", inStock: true },
  { name: "Kids Rain Boots", description: "Waterproof rain boots", category: "Kids", subCategory: "Shoes", originalPrice: 799, discount: "15%", price: 679, imageUrl: "../images/Kids/kid35.png", inStock: false },
  { name: "Kids Denim Jacket", description: "Stylish denim jacket", category: "Kids", subCategory: "Jacket", originalPrice: 999, discount: "20%", price: 799, imageUrl: "../images/Kids/kid36.png", inStock: true },
  { name: "Kids Long Sleeve Tee", description: "Cotton long sleeve t-shirt", category: "Kids", subCategory: "T-Shirt", originalPrice: 499, discount: "10%", price: 449, imageUrl: "../images/Kids/kid37.png", inStock: true },
  { name: "Kids Floral Dress", description: "Floral print dress for girls", category: "Kids", subCategory: "Dress", originalPrice: 899, discount: "15%", price: 764, imageUrl: "../images/Kids/kid38.png", inStock: false },
  { name: "Kids Tracksuit", description: "Comfortable tracksuit for play", category: "Kids", subCategory: "Tracksuit", originalPrice: 799, discount: "10%", price: 719, imageUrl: "../images/Kids/kid39.png", inStock: true },
  { name: "Kids Beanie", description: "Warm beanie for winter", category: "Kids", subCategory: "Cap", originalPrice: 299, discount: "0%", price: 299, imageUrl: "../images/Kids/kid40.png", inStock: true },
  { name: "Kids Polo Shirt", description: "Casual polo shirt", category: "Kids", subCategory: "T-Shirt", originalPrice: 499, discount: "10%", price: 449, imageUrl: "../images/Kids/kid41.png", inStock: false },
  { name: "Kids Gym Shorts", description: "Lightweight gym shorts", category: "Kids", subCategory: "Shorts", originalPrice: 399, discount: "0%", price: 399, imageUrl: "../images/Kids/kid42.png", inStock: true },
  { name: "Kids Cardigan", description: "Soft knitted cardigan", category: "Kids", subCategory: "Sweater", originalPrice: 699, discount: "15%", price: 594, imageUrl: "../images/Kids/kid43.png", inStock: true },
  { name: "Kids Capri Set", description: "Matching capri and top set", category: "Kids", subCategory: "Set", originalPrice: 699, discount: "10%", price: 629, imageUrl: "../images/Kids/kid44.png", inStock: false },
  { name: "Kids Cotton Dress", description: "Soft cotton dress", category: "Kids", subCategory: "Dress", originalPrice: 799, discount: "15%", price: 679, imageUrl: "../images/Kids/kid45.png", inStock: true },
  { name: "Kids Hoodie Sweatshirt", description: "Comfortable hoodie sweatshirt", category: "Kids", subCategory: "Hoodie", originalPrice: 699, discount: "10%", price: 629, imageUrl: "../images/Kids/kid46.png", inStock: true },
  { name: "Kids Winter Pajama", description: "Warm pajama set", category: "Kids", subCategory: "Pajama", originalPrice: 599, discount: "10%", price: 539, imageUrl: "../images/Kids/kid47.png", inStock: false },
  { name: "Kids Sports Cap", description: "Cap for outdoor sports", category: "Kids", subCategory: "Cap", originalPrice: 199, discount: "0%", price: 199, imageUrl: "../images/Kids/kid48.png", inStock: true },
  { name: "Kids Sweatpants", description: "Comfortable sweatpants", category: "Kids", subCategory: "Pants", originalPrice: 599, discount: "10%", price: 539, imageUrl: "../images/Kids/kid49.png", inStock: true },
  { name: "Kids Tank Dress", description: "Sleeveless tank dress", category: "Kids", subCategory: "Dress", originalPrice: 699, discount: "10%", price: 629, imageUrl: "../images/Kids/kid50.png", inStock: false }
];

// Seed function
async function seedKidsProducts() {
    try {
await Product.deleteMany({ category: /Kids/i }); // ✅ deletes only kids' products
        await Product.insertMany(KidsProducts); // Insert new
        console.log('✅ Kids products seeded successfully');
    } catch (err) {
        console.error('❌ Error seeding kids products:', err);
    } finally {
        mongoose.connection.close();
    }
}

seedKidsProducts();
