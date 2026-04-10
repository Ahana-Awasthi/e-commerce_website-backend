require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth"); // assuming you have this

// Helper function to calculate order status based on time elapsed
const getOrderStatus = (createdAt) => {
  const now = new Date();
  const elapsed = now.getTime() - new Date(createdAt).getTime();

  // Time thresholds in milliseconds
  const HOUR_MS = 60 * 60 * 1000;
  const DAY_MS = 24 * 60 * 60 * 1000;

  // 0-1 hour: Placed
  // 1-3 hours: Confirmed (1 hour after)
  // 3-51 hours: Shipped (2 days after confirmed)
  // 51-75 hours: Out for Delivery (1 day after shipped)
  // 75+: Delivered (1 day after out for delivery)

  if (elapsed < HOUR_MS) {
    return "Placed";
  } else if (elapsed < 3 * HOUR_MS) {
    return "Confirmed";
  } else if (elapsed < 3 * HOUR_MS + 2 * DAY_MS) {
    return "Shipped";
  } else if (elapsed < 3 * HOUR_MS + 3 * DAY_MS) {
    return "Out for Delivery";
  } else {
    return "Delivered";
  }
};

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "Email already exists" });

    const user = new User({ name, email, password, phone, address });
    await user.save();
    res.status(201).json({ msg: "User created successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});
// Get user's wishlist
router.get("/wishlist", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ wishlist: user.wishlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add product to wishlist
router.post("/wishlist", authMiddleware, async (req, res) => {
  try {
    console.log("➕ POST /wishlist called");
    console.log("User ID:", req.user.id);
    console.log("Product ID to add:", req.body.productId);

    const user = await User.findById(req.user.id);
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const { productId } = req.body;
    console.log("Current wishlist:", user.wishlist);

    if (!user.wishlist.some((p) => p.toString() === productId.toString())) {
      user.wishlist.push(productId);
      await user.save();
      console.log("✅ Product added. New wishlist:", user.wishlist);
    } else {
      console.log("⚠️ Product already in wishlist");
    }

    res.json({ message: "Added to wishlist", wishlist: user.wishlist });
  } catch (err) {
    console.error("❌ POST error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Remove product from wishlist
router.delete("/wishlist", authMiddleware, async (req, res) => {
  try {
    console.log("🗑️ DELETE /wishlist called");
    console.log("User ID:", req.user.id);
    console.log("Product ID to remove:", req.body.productId);

    const user = await User.findById(req.user.id);
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Current wishlist:", user.wishlist);
    const { productId } = req.body;
    const initialLength = user.wishlist.length;

    user.wishlist = user.wishlist.filter(
      (p) => p.toString() !== productId.toString(),
    );

    console.log(
      `Removed ${initialLength - user.wishlist.length} item(s). New wishlist:`,
      user.wishlist,
    );

    await user.save();
    console.log("✅ Wishlist saved to backend");

    res.json({ message: "Removed from wishlist", wishlist: user.wishlist });
  } catch (err) {
    console.error("❌ DELETE error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
//CART ROUTES
// GET CART
router.get("/cart", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
});
// POST CART
router.post("/cart", authMiddleware, async (req, res) => {
  try {
    console.log("➕ POST /cart called");
    console.log("User ID:", req.user.id);
    console.log("Product ID to add:", req.body.productId);

    const user = await User.findById(req.user.id);
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const { productId } = req.body;
    const productIdStr = String(productId);
    console.log("Current cart:", user.cart);

    // Find if product already in cart
    const existingItem = user.cart.find((item) => item[0] === productIdStr);

    if (existingItem) {
      // Product already in cart - increase quantity
      existingItem[1] = String(Number(existingItem[1]) + 1);
      console.log("⬆️ Quantity increased to:", existingItem[1]);
    } else {
      // New product - add with quantity 1
      user.cart.push([productIdStr, "1"]);
      console.log("✅ Product added with quantity 1");
    }

    await user.save();
    console.log("Updated cart:", user.cart);
    res.json({ message: "Added to cart", cart: user.cart });
  } catch (err) {
    console.error("❌ POST error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE CART
router.delete("/cart", authMiddleware, async (req, res) => {
  try {
    console.log("🗑️ DELETE /cart called");
    console.log("User ID:", req.user.id);
    console.log("Product ID to remove:", req.body.productId);

    const user = await User.findById(req.user.id);
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Current cart:", user.cart);
    const { productId } = req.body;
    const productIdStr = String(productId);
    const initialLength = user.cart.length;

    // Remove entire array for this product
    user.cart = user.cart.filter((item) => item[0] !== productIdStr);

    console.log(
      `Removed ${initialLength - user.cart.length} item(s). New cart:`,
      user.cart,
    );

    await user.save();
    console.log("✅ Product removed from cart");

    res.json({ message: "Removed from cart", cart: user.cart });
  } catch (err) {
    console.error("❌ DELETE error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE CART QUANTITY (for plus/minus buttons)
router.put("/cart", authMiddleware, async (req, res) => {
  try {
    console.log("📝 PUT /cart called - Update quantity");
    console.log("User ID:", req.user.id);
    console.log("Product ID:", req.body.productId);
    console.log("New quantity:", req.body.quantity);

    const user = await User.findById(req.user.id);
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const { productId, quantity } = req.body;
    const productIdStr = String(productId);

    // Validate quantity (minimum 1)
    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    // Find and update quantity
    const cartItem = user.cart.find((item) => item[0] === productIdStr);
    if (cartItem) {
      cartItem[1] = String(quantity);
      await user.save();
      console.log("✅ Quantity updated to:", quantity);
      res.json({ message: "Quantity updated", cart: user.cart });
    } else {
      console.log("⚠️ Product not found in cart");
      res.status(404).json({ message: "Product not in cart" });
    }
  } catch (err) {
    console.error("❌ PUT error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
//Send Email
const sendEmail = require("../utils/sendEmail");

router.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).send("Missing fields");
  }

  try {
    await sendEmail(to, subject, text);
    res.send({ message: "Email sent" });
  } catch (err) {
    res.status(500).send("Failed to send email");
  }
});

// Login
// Login (email/password OR Google)
router.post("/login", async (req, res) => {
  try {
    const { email, password, isGoogle } = req.body; // new flag

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User doesn't exist" });

    if (!isGoogle) {
      // normal login, check password
      if (!password) return res.status(400).json({ msg: "Password required" });

      const isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    }
    // if Google login, skip password check

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (err) {
    console.error("🔥 Login error details:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Update user profile
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if email is being changed and if it already exists
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Email already in use by another user" });
      }
    }

    // Check if phone is being changed and if it already exists
    if (phone && phone !== user.phone) {
      const existingPhone = await User.findOne({ phone });
      if (existingPhone) {
        return res
          .status(400)
          .json({ message: "Phone already in use by another user" });
      }
    }

    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (err) {
    console.error("❌ Profile update error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Create order
router.post("/order", authMiddleware, async (req, res) => {
  try {
    const { products, total, paymentMethod, deliveryAddress } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate unique order ID
    let orderId;
    let isUnique = false;
    while (!isUnique) {
      // Format: ORD-YYYYMMDD-XXXXX (e.g., ORD-20240415-A7K9P)
      const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const randomPart = Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase();
      orderId = `ORD-${date}-${randomPart}`;

      // Check if order ID already exists
      const existingOrder = user.orders.find(
        (order) => order.orderId === orderId,
      );
      if (!existingOrder) {
        isUnique = true;
      }
    }

    // Create new order object
    const newOrder = {
      orderId,
      status: "Placed", // New orders start as "Placed"
      createdAt: new Date(),
      orderDate: new Date().toISOString(),
      products: products.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
      })),
      total,
      paymentMethod,
      deliveryAddress,
    };

    // Add order to user
    user.orders.push(newOrder);

    // Clear cart after order placed
    user.cart = [];

    await user.save();

    console.log("✅ Order created:", orderId);

    res.status(201).json({
      message: "Order placed successfully",
      orderId,
      order: newOrder,
    });
  } catch (err) {
    console.error("❌ Order creation error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Clear cart
router.delete("/cart/clear", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = [];
    await user.save();

    res.json({ message: "Cart cleared successfully" });
  } catch (err) {
    console.error("❌ Cart clear error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all user orders
router.get("/orders", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate status for each order based on elapsed time
    const ordersWithStatus = (user.orders || []).map((order) => {
      const orderObj = order.toObject();
      return {
        ...orderObj,
        status: getOrderStatus(orderObj.createdAt || new Date()),
      };
    });

    res.json({ orders: ordersWithStatus });
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get specific order by ID
router.get("/orders/:orderId", authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.params;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const order = user.orders.find((o) => o.orderId === orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Calculate current status based on elapsed time
    const currentStatus = getOrderStatus(order.createdAt);

    // Return order with calculated status
    res.json({
      order: {
        ...(order.toObject ? order.toObject() : order),
        status: currentStatus,
      },
    });
  } catch (err) {
    console.error("❌ Error fetching order:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Cancel order - immediate status change to problem:cancel
router.post("/cancel-order/:orderId", authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.params;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const order = user.orders.find((o) => o.orderId === orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if order is already delivered
    const currentStatus = order.status || getOrderStatus(order.createdAt);
    if (currentStatus === "Delivered") {
      return res
        .status(400)
        .json({ message: "Cannot cancel a delivered order" });
    }

    // Update status to problem:cancel immediately
    order.status = "problem:cancel";
    await user.save();

    console.log(`✅ Order ${orderId} status changed to problem:cancel`);

    res.json({
      message: "Order cancellation successful. Order status updated.",
      orderId,
      status: "problem:cancel",
    });
  } catch (err) {
    console.error("❌ Error cancelling order:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Return order - status change to problem:return
router.post("/return-order/:orderId", authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { reason } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const order = user.orders.find((o) => o.orderId === orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if order is delivered
    const currentStatus = order.status || getOrderStatus(order.createdAt);
    if (currentStatus !== "Delivered") {
      return res
        .status(400)
        .json({ message: "Can only return delivered orders" });
    }

    // Update status to problem:return immediately
    order.status = "problem:return";
    await user.save();

    console.log(`✅ Order ${orderId} status changed to problem:return`);

    res.json({
      message: "Return request submitted. Order status updated.",
      orderId,
      status: "problem:return",
    });
  } catch (err) {
    console.error("❌ Error submitting return:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Exchange order - status change to problem:exchange
router.post("/exchange-order/:orderId", authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { reason } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const order = user.orders.find((o) => o.orderId === orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if order is delivered
    const currentStatus = order.status || getOrderStatus(order.createdAt);
    if (currentStatus !== "Delivered") {
      return res
        .status(400)
        .json({ message: "Can only exchange delivered orders" });
    }

    // Update status to problem:exchange immediately
    order.status = "problem:exchange";
    await user.save();

    console.log(`✅ Order ${orderId} status changed to problem:exchange`);

    res.json({
      message: "Exchange request submitted. Order status updated.",
      orderId,
      status: "problem:exchange",
    });
  } catch (err) {
    console.error("❌ Error submitting exchange:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Google Login - for existing users
router.post("/google-login", async (req, res) => {
  try {
    const { email, uid } = req.body;

    if (!email) {
      return res.status(400).json({ msg: "Email required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User not found. Please sign up first." });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log(`✅ Google login successful for ${email}`);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (err) {
    console.error("❌ Google login error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Google Sign-up - for new users
router.post("/google-register", async (req, res) => {
  try {
    const { email, name, uid, photoURL } = req.body;

    if (!email || !name) {
      return res.status(400).json({ msg: "Email and name required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // Create new user with Google UID as password
    const newUser = new User({
      name,
      email,
      password: uid || email, // Use Google UID or email as password
      phone: "Not provided",
      address: "Not provided",
    });

    await newUser.save();

    // Generate token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log(`✅ Google sign-up successful for ${email}`);

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
      },
    });
  } catch (err) {
    console.error("❌ Google sign-up error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
