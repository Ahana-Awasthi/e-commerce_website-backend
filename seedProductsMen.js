const mongoose = require('mongoose');
const Product = require('./models/product'); // import Product model

// Replace <yourPassword> with your real MongoDB user password
const mongoURI = 'mongodb+srv://AHANAAWASTHI-MERN:MERN-Cluster!2802@mern-projects.rzxtk1k.mongodb.net/ecommerceDB?retryWrites=true&w=majority&appName=MERN-projects';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Reusable function for calculating discounted price
function calculateDiscountedPrice(originalPrice, discount) {
    return Math.round(originalPrice - (originalPrice * discount / 100));
}



const Menproducts = [
    {
        name: "Men Regular Fit T-shirt",
        description: "POLO Men Regular Fit T-shirt",
        subCategory: "T-Shirts",
        category: "Men Shirts",
        originalPrice: 1800,
        discount: 70,
        price: 540,
        imageUrl: "/images/Men/mn1.png",
        inStock: true,
        color: "Green",
        size: " M , L"
    },
    {
        name: "Men Solid Collar T-Shirts",
        description: "POLO Men Solid Collar T-Shirts",
        category: "Men Shirts",
        subCategory: "T-Shirts",
        originalPrice: 1150,
        discount: 40,
        price: 690,
        imageUrl: "/images/Men/mn2.png",
        inStock: true,
        color: " Black ",
        size: "S , M"
    },
    {
        name: "Men Casual Shirt",
        description: "BELLSTONE Men Casual Shirt",
        category: "Men Shirts",
        subCategory: "Shirts",
        originalPrice: 3795,
        discount: 80,
        price: 759,
        imageUrl: "/images/Men/mn3.png",
        inStock: true,
        color: " Grey ",
        size: "S , M "
    },
    {
        name: "Men Formal Pant",
        description: "COMBRAIDED Men Formal Pant",
        category: "Men Bottomwear",
        subCategory: "Pants",
        originalPrice: 1191,
        discount: 30,
        price: 834,
        imageUrl: "/images/Men/mn4.png",
        inStock: true,
        color: " Beige ",
        size: " M , L"
    },
    {
        name: "Men Regular Western Wear Shirt",
        description: "DENIM Men Regular Western Wear Shirt",
        category: "Men Shirts",
        subCategory: "Shirts",
        originalPrice: 6227,
        discount: 85,
        price: 934,
        imageUrl: "/images/Men/mn5.png",
        inStock: true,
        color: " Blue ",
        size: " M "
    },
    {
        name: "Men Regular Formal Shirt Cotton",
        description: "JIYA AND JAY Men Regular Formal Shirt Cotton",
        category: "Men Shirts",
        subCategory: "Shirts",
        originalPrice: 293,
        discount: 20,
        price: 234,
        imageUrl: "/images/Men/mn6.png",
        inStock: true,
        color: " Red ",
        size: "M, L"
    },
    {
        name: "Men Casual Shirt",
        description: "WOXEN Men Casual Shirt",
        category: "Men Shirts",
        subCategory: "Shirts",
        originalPrice: 971,
        discount: 45,
        price: 534,
        imageUrl: "/images/Men/mn7.png",
        inStock: true,
        color: " Blue ",
        size: "S , M , L"
    },
    {
        name: "Men Slim Fit Collar Shirt Cotton",
        description: "DENIM Men Slim Fit Collar Shirt Cotton",
        category: "Men Shirts",
        subCategory: "Shirts",
        originalPrice: 513,
        discount: 15,
        price: 436,
        imageUrl: "/images/Men/mn8.png",
        inStock: true,
        color: " Blue ",
        size: "L, XL"
    },
    {
        name: "Men Oversized Western T-shirt",
        description: "TRIPR Men Oversized Western T-shirt",
        category: "Men Shirts",
        subCategory: "T-Shirts",
        originalPrice: 815,
        discount: 59,
        price: 334,
        imageUrl: "/images/Men/mn9.png",
        inStock: true,
        color: "Green ",
        size: "S, XL"
    },
    {
        name: "Men Casual Woolen Shirt",
        description: "BELLSTONE Men Casual Woolen Shirt",
        category: "Men Shirts",
        subCategory: "Shirts",
        originalPrice: 2527,
        discount: 70,
        price: 758,
        imageUrl: "/images/Men/mn10.png",
        inStock: true,
        color: " Green ",
        size: " L, XL"
    },
    {
        name: "Men Casual Oversized Shirt",
        description: "DEEMOON Men Casual Oversized Shirt",
        category: "Men Shirts",
        subCategory: "Shirts",
        originalPrice: 914,
        discount: 50,
        price: 457,
        imageUrl: "/images/Men/mn11.png",
        inStock: true,
        color: " White ",
        size: "M , L"
    },
    {
        name: "Men Loose Fit Dark Blue Jeans",
        description: "SOUTHEE Men Loose Fit Dark Blue Jeans",
        category: "Men Bottomwear",
        subCategory: "Jeans",
        originalPrice: 1897,
        discount: 70,
        price: 569,
        imageUrl: "/images/Men/mn12.png",
        inStock: true,
        color: " Blue ",
        size: "S , M , L"
    },
    {
        name: "Men Casual Loose Brown T-Shirt Cotton",
        description: "POLO Men Casual Loose Brown T-Shirt Cotton",
        category: "Men Shirts",
        subCategory: "T-Shirts",
        originalPrice: 1848,
        discount: 65,
        price: 647,
        imageUrl: "/images/Men/mn13.png",
        inStock: true,
        color: " Brown ",
        size: " L, XL, XXL"
    },
    {
        name: "Men Regular Fit Formal Shirt",
        description: "JIYA AND JAY Men Regular Fit Formal Shirt",
        category: "Men Shirts",
        subCategory: "Shirts",
        originalPrice: 914,
        discount: 50,
        price: 457,
        imageUrl: "/images/Men/mn14.png",
        inStock: true,
        color: " White ",
        size: "S ,XL, XXL"
    },
    {
        name: "Men Casual Lined White T-Shirt",
        description: "POLO Men Casual Lined White T-Shirt",
        category: "Men Shirts",
        subCategory: "T-Shirts",
        originalPrice: 1450,
        discount: 60,
        price: 580,
        imageUrl: "/images/Men/mn15.png",
        inStock: true,
        color: " White ",
        size: "S , M "
    },
    {
        name: "Men Casual Loose Fit Jeans",
        description: "COMBRAIDED Men Casual Loose Fit Jeans",
        category: "Men Bottomwear",
        subCategory: "Jeans",
        originalPrice: 774,
        discount: 10,
        price: 697,
        imageUrl: "/images/Men/mn16.png",
        inStock: true,
        color: " Black ",
        size: "S , M , L"
    },
    {
        name: "Men Casual Western Shirt",
        description: "DEEMOON Men Casual Western Shirt",
        category: "Men Shirts",
        subCategory: "Shirts",
        originalPrice: 3868,
        discount: 75,
        price: 967,
        imageUrl: "/images/Men/mn17.png",
        inStock: true,
        color: " Maroon ",
        size: "M , L"
    },
    {
        name: "Men Printed Track Suit",
        description: "TRIPR Men Printed Track Suit",
        category: "Men Bottomwear",
        subCategory: "Track Suits",
        originalPrice: 1955,
        discount: 80,
        price: 391,
        imageUrl: "/images/Men/mn18.png",
        inStock: true,
        color: " Black ",
        size: "S , M "
    },
    {
        name: "Men Socks",
        description: "DOLLAR Men Socks",
        category: "Men Accessories",
        subCategory: "Socks",
        originalPrice: 313,
        discount: 20,
        price: 250,
        imageUrl: "/images/Men/mn19.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    },
    {
        name: "Men Casual T-Shirt and Jeans Combo",
        description: "H&M Men Casual T-Shirt and Jeans Combo",
        category: "Men Combo",
        subCategory: "T-Shirt & Jeans",
        originalPrice: 8534,
        discount: 65,
        price: 2987,
        imageUrl: "/images/Men/mn20.png",
        inStock: true,
        color: " Beige ",
        size: "S , M , L"
    },
    {
        name: "Men Regular Shorts",
        description: "UNIQLO Men Regular Shorts",
        category: "Men Bottomwear",
        subCategory: "Shorts",
        originalPrice: 800,
        discount: 30,
        price: 560,
        imageUrl: "/images/Men/mn21.png",
        inStock: true,
        color: " White ",
        size: "S , M , L, XL"
    },
    {
        name: "Men Casual Shorts",
        description: "CROSSFIT Men Casual Shorts",
        category: "Men Bottomwear",
        subCategory: "Shorts",
        originalPrice: 1117,
        discount: 40,
        price: 670,
        imageUrl: "/images/Men/mn22.png",
        inStock: true,
        color: " Black ",
        size: "S , M , L"
    },
    {
        name: "Men Loose Fit Checked Shirt",
        description: "DEEMOON Men Loose Fit Checked Shirt",
        category: "Men Shirts",
        subCategory: "Shirts",
        originalPrice: 796,
        discount: 20,
        price: 637,
        imageUrl: "/images/Men/mn23.png",
        inStock: true,
        color: " Blue ",
        size: "S , M , L"
    },
    {
        name: "Men Casual Western Shorts",
        description: "ADIDAS Men Casual Western Shorts",
        category: "Men Bottomwear",
        subCategory: "Shorts",
        originalPrice: 1012,
        discount: 45,
        price: 557,
        imageUrl: "/images/Men/mn24.png",
        inStock: true,
        color: " Grey ",
        size: "S , M , L"
    },
    {
        name: "Men's Kurta with Churidar Pyjama",
        description: "ETHLUXIS Men's Kurta with Churidar Pyjama",
        category: "Men Ethnic",
        subCategory: "Kurta Pyjama",
        originalPrice: 3176,
        discount: 75,
        price: 794,
        imageUrl: "/images/Men/mn25.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    },
    {
        name: "Men's Kurta Regular Cotton Blend",
        description: "SWAGG INDIA Men's Kurta Regular Cotton Blend",
        category: "Men Ethnic",
        subCategory: "Kurta",
        originalPrice: 603,
        discount: 25,
        price: 452,
        imageUrl: "/images/Men/mn26.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    },
    {
        name: "Men Regular Fit Beach Shirt",
        description: "MADHAVISTA Men Regular Fit Beach Shirt",
        category: "Men Shirts",
        subCategory: "Shirts",
        originalPrice: 536,
        discount: 15,
        price: 456,
        imageUrl: "/images/Men/mn27.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    },
    {
        name: "Men Casual Oversized Shirt",
        description: "POLO Men Casual Oversized Shirt",
        category: "Men Shirts",
        subCategory: "Shirts",
        originalPrice: 1314,
        discount: 50,
        price: 657,
        imageUrl: "/images/Men/mn28.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    },
    {
        name: "Men Kurta and Pyjama Combo Cotton",
        description: "SWAGG INDIA Men Kurta and Pyjama Combo Cotton",
        category: "Men Ethnic",
        subCategory: "Kurta Pyjama",
        originalPrice: 3788,
        discount: 75,
        price: 947,
        imageUrl: "/images/Men/mn29.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    },
    {
        name: "Men Winter Wear Full Sleeve Jacket",
        description: "BOLDFIT Men Winter Wear Full Sleeve Jacket",
        category: "Men Jackets",
        subCategory: "Winter Jackets",
        originalPrice: 1305,
        discount: 65,
        price: 499,
        imageUrl: "/images/Men/mn30.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    },
    {
        name: "Men's Slim Fit Jacket",
        description: "VOXATI Men's Slim Fit Jacket",
        category: "Men Jackets",
        subCategory: "Jackets",
        originalPrice: 1031,
        discount: 45,
        price: 567,
        imageUrl: "/images/Men/mn31.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    },
    {
        name: "Men's Casual Jacket",
        description: "VOXATI Men's Casual Jacket",
        category: "Men Jackets",
        subCategory: "Jackets",
        originalPrice: 1897,
        discount: 70,
        price: 569,
        imageUrl: "/images/Men/mn32.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    },
    {
        name: "Men Casual Loose Brown T-Shirt Cotton",
        description: "POLO Men Casual Loose Brown T-Shirt Cotton",
        category: "Men Shirts",
        subCategory: "T-Shirts",
        originalPrice: 1848,
        discount: 65,
        price: 647,
        imageUrl: "/images/Men/mn33.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    },
    {
        name: "Men Regular Fit Formal Shirt",
        description: "JIYA AND JAY Men Regular Fit Formal Shirt",
        category: "Men Shirts",
        subCategory: "Shirts",
        originalPrice: 914,
        discount: 50,
        price: 457,
        imageUrl: "/images/Men/mn34.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    },
    {
        name: "Men Casual Lined White T-Shirt",
        description: "POLO Men Casual Lined White T-Shirt",
        category: "Men Shirts",
        subCategory: "T-Shirts",
        originalPrice: 1450,
        discount: 60,
        price: 580,
        imageUrl: "/images/Men/mn35.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    },
    {
        name: "Men Casual Loose Fit Jeans",
        description: "COMBRAIDED Men Casual Loose Fit Jeans",
        category: "Men Bottomwear",
        subCategory: "Jeans",
        originalPrice: 774,
        discount: 10,
        price: 697,
        imageUrl: "/images/Men/mn36.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    },
    {
        name: "Men Casual Western Shirt",
        description: "DEEMOON Men Casual Western Shirt",
        category: "Men Shirts",
        subCategory: "Shirts",
        originalPrice: 3868,
        discount: 75,
        price: 967,
        imageUrl: "/images/Men/mn37.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    },
    {
        name: "Men Printed Track Suit",
        description: "TRIPR Men Printed Track Suit",
        category: "Men Bottomwear",
        subCategory: "Track Suits",
        originalPrice: 1955,
        discount: 80,
        price: 391,
        imageUrl: "/images/Men/mn38.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    },
    {
        name: "Men Socks",
        description: "DOLLAR Men Socks",
        category: "Men Accessories",
        subCategory: "Socks",
        originalPrice: 313,
        discount: 20,
        price: 250,
        imageUrl: "/images/Men/mn39.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    },
    {
        name: "Men Casual T-Shirt and Jeans Combo",
        description: "H&M Men Casual T-Shirt and Jeans Combo",
        category: "Men Combo",
        subCategory: "T-Shirt & Jeans",
        originalPrice: 8534,
        discount: 65,
        price: 2987,
        imageUrl: "/images/Men/mn40.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    },
    {
        name: "Men Regular Shorts",
        description: "UNIQLO Men Regular Shorts",
        category: "Men Bottomwear",
        subCategory: "Shorts",
        originalPrice: 800,
        discount: 30,
        price: 560,
        imageUrl: "/images/Men/mn41.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    },
    {
        name: "Men Casual Shorts",
        description: "CROSSFIT Men Casual Shorts",
        category: "Men Bottomwear",
        subCategory: "Shorts",
        originalPrice: 1117,
        discount: 40,
        price: 670,
        imageUrl: "/images/Men/mn42.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    },
    {
        name: "Men Loose Fit Checked Shirt",
        description: "DEEMOON Men Loose Fit Checked Shirt",
        category: "Men Shirts",
        subCategory: "Shirts",
        originalPrice: 796,
        discount: 20,
        price: 637,
        imageUrl: "/images/Men/mn43.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    },
    {
        name: "Men Casual Western Shorts",
        description: "ADIDAS Men Casual Western Shorts",
        category: "Men Bottomwear",
        subCategory: "Shorts",
        originalPrice: 1012,
        discount: 45,
        price: 557,
        imageUrl: "/images/Men/mn44.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    },
    {
        name: "Men's Kurta with Churidar Pyjama",
        description: "ETHLUXIS Men's Kurta with Churidar Pyjama",
        category: "Men Ethnic",
        subCategory: "Kurta Pyjama",
        originalPrice: 3176,
        discount: 75,
        price: 794,
        imageUrl: "/images/Men/mn45.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    },
    {
        name: "Men's Kurta Regular Cotton Blend",
        description: "SWAGG INDIA Men's Kurta Regular Cotton Blend",
        category: "Men Ethnic",
        subCategory: "Kurta",
        originalPrice: 603,
        discount: 25,
        price: 452,
        imageUrl: "/images/Men/mn46.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    },
    {
        name: "Men Regular Fit Beach Shirt",
        description: "MADHAVISTA Men Regular Fit Beach Shirt",
        category: "Men Shirts",
        subCategory: "Shirts",
        originalPrice: 536,
        discount: 15,
        price: 456,
        imageUrl: "/images/Men/mn47.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    },
    {
        name: "Men Casual Oversized Shirt",
        description: "POLO Men Casual Oversized Shirt",
        category: "Men Shirts",
        subCategory: "Shirts",
        originalPrice: 1314,
        discount: 50,
        price: 657,
        imageUrl: "/images/Men/mn48.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    },
    {
        name: "Men Kurta and Pyjama Combo Cotton",
        description: "SWAGG INDIA Men Kurta and Pyjama Combo Cotton",
        category: "Men Ethnic",
        subCategory: "Kurta Pyjama",
        originalPrice: 1894,
        discount: 50,
        price: 947,
        imageUrl: "/images/Men/mn49.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    },
    {
        name: "Men Winter Wear Full Sleeve Jacket",
        description: "BOLDFIT Men Winter Wear Full Sleeve Jacket",
        category: "Men Jackets",
        subCategory: "Winter Jackets",
        originalPrice: 914,
        discount: 50,
        price: 457,
        imageUrl: "/images/Men/mn50.png",
        inStock: true,
        color: " White ",
        size: "S , M , L"
    }
];


async function seedAllProducts() {
    try {
      await Product.deleteMany({ category: /Men/i }); // ✅ deletes only men's products

        // 2. Insert all products at once
        await Product.insertMany(Menproducts);

        console.log('✅ All products seeded successfully');
    } catch (err) {
        console.error('❌ Error seeding products:', err);
    } finally {
        mongoose.connection.close(); // close connection once
    }
}

// Run the seeding function
seedAllProducts();











