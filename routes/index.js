var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

const Product = require('../models/product');

router.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err); // <-- This prints the real error in terminal
    res.status(500).json({ message: "Server Error", error: err });
  }
});


router.get('/api/men', async (req, res) => {
  try {
    const Menproducts = await Product.find({category: /Men/i});
    
    // Add subCategory if it doesn't exist (for backward compatibility with old data)
    const enrichedProducts = Menproducts.map(product => {
      const productObj = product.toObject ? product.toObject() : product;
      
      if (!productObj.subCategory) {
        const name = productObj.name.toLowerCase();
        const desc = productObj.description ? productObj.description.toLowerCase() : '';
        
        // Smart categorization based on product name and description
        if (name.includes('t-shirt') || name.includes('tshirt') || desc.includes('t-shirt') || desc.includes('tshirt')) {
          productObj.subCategory = 'T-Shirts';
        } else if (name.includes('jeans') || desc.includes('jeans')) {
          productObj.subCategory = 'Jeans';
        } else if (name.includes('shorts') || desc.includes('shorts')) {
          productObj.subCategory = 'Shorts';
        } else if (name.includes('pants') || name.includes('pant') || desc.includes('pants') || desc.includes('pant')) {
          productObj.subCategory = 'Pants';
        } else if (name.includes('shirt') || desc.includes('shirt')) {
          productObj.subCategory = 'Shirts';
        } else {
          productObj.subCategory = 'Shirts';
        }
      }
      
      return productObj;
    });
    
    res.json(enrichedProducts);
  } catch (err) {
    console.error("❌ Error fetching men products:", err);
    res.status(500).json({ message: "Server Error", error: err });
  }
});

router.get('/api/women', async (req, res) => {
  try {
    const Womenproducts = await Product.find({category: /Women/i});
    
    // Add subCategory if it doesn't exist
    const enrichedProducts = Womenproducts.map(product => {
      const productObj = product.toObject ? product.toObject() : product;
      
      if (!productObj.subCategory) {
        const name = productObj.name.toLowerCase();
        const desc = productObj.description ? productObj.description.toLowerCase() : '';
        
        if (name.includes('t-shirt') || name.includes('tshirt') || desc.includes('t-shirt') || desc.includes('tshirt')) {
          productObj.subCategory = 'T-Shirts';
        } else if (name.includes('jeans') || desc.includes('jeans')) {
          productObj.subCategory = 'Jeans';
        } else if (name.includes('shorts') || desc.includes('shorts')) {
          productObj.subCategory = 'Shorts';
        } else if (name.includes('dress') || desc.includes('dress')) {
          productObj.subCategory = 'Dresses';
        } else if (name.includes('pants') || name.includes('pant') || desc.includes('pants') || desc.includes('pant')) {
          productObj.subCategory = 'Pants';
        } else if (name.includes('shirt') || desc.includes('shirt')) {
          productObj.subCategory = 'Shirts';
        } else {
          productObj.subCategory = 'Shirts';
        }
      }
      
      return productObj;
    });
    
    res.json(enrichedProducts);
  } catch (err) {
    console.error("❌ Error fetching women products:", err);
    res.status(500).json({ message: "Server Error", error: err });
  }
});

router.get('/api/kids', async (req, res) => {
  try {
    const Kidsproducts = await Product.find({category: /Kids/i});
    
    // Add subCategory if it doesn't exist
    const enrichedProducts = Kidsproducts.map(product => {
      const productObj = product.toObject ? product.toObject() : product;
      
      if (!productObj.subCategory) {
        const name = productObj.name.toLowerCase();
        const desc = productObj.description ? productObj.description.toLowerCase() : '';
        
        if (name.includes('t-shirt') || name.includes('tshirt') || desc.includes('t-shirt') || desc.includes('tshirt')) {
          productObj.subCategory = 'T-Shirts';
        } else if (name.includes('shorts') || desc.includes('shorts')) {
          productObj.subCategory = 'Shorts';
        } else if (name.includes('pants') || name.includes('pant') || desc.includes('pants') || desc.includes('pant')) {
          productObj.subCategory = 'Pants';
        } else if (name.includes('shirt') || desc.includes('shirt')) {
          productObj.subCategory = 'Shirts';
        } else {
          productObj.subCategory = 'Shirts';
        }
      }
      
      return productObj;
    });
    
    res.json(enrichedProducts);
  } catch (err) {
    console.error("❌ Error fetching kids products:", err);
    res.status(500).json({ message: "Server Error", error: err });
  }
});

module.exports = router;
