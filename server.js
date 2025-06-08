require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String
});

const OrderSchema = new mongoose.Schema({
    productId: String,
    quantity: Number
});

const Product = mongoose.model("Product", ProductSchema);
const Order = mongoose.model("Order", OrderSchema);

app.get("/products", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.post("/orders", async (req, res) => {
    const { productId, quantity } = req.body;
    const order = new Order({ productId, quantity });
    await order.save();
    res.json({ success: true, order });
});

app.listen(5000, () => console.log("Server running on port 5000"));
