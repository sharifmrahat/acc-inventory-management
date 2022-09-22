const express = require("express");
const app = express();
const cors = require("cors");
// const errorHandler = require("./middleware/errorHandler");
const productRoutes = require("./routes/product.route");

// middleware
app.use(express.json());
app.use(cors());
// app.use(errorHandler);

// routes
app.use("/api/v1/product", productRoutes);

/** root route for testing purpose */
app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
