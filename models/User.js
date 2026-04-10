const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  address: { type: String },
  password: { type: String },
  cart: [[String]], // Array of arrays to store productId and quantity
  wishlist: [String],
  orders: [
    {
      orderId: String,
      status: {
        type: String,
        enum: [
          "Placed",
          "Confirmed",
          "Shipped",
          "Out for Delivery",
          "Delivered",
          "problem:cancel",
          "problem:return",
          "problem:exchange",
        ],
        default: "Placed",
      },
      createdAt: { type: Date, default: Date.now }, // When order was placed
      deliveryDate: { type: Date, default: null }, // Set when order is delivered
      paymentMethod: String,
      deliveryAddress: String,
      products: [
        {
          productId: String,
          quantity: Number,
        },
      ],
      total: Number,
    },
  ], // Array of orders with full details
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
