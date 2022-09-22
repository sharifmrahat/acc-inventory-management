const mongoose = require("mongoose");
//schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      unique: [true, "name must be unique"],
      minlength: [3, "name must be at least 3 characters"],
      maxlength: [100, "name is too large"],
    },
    description: { type: String, required: true },
    price: {
      type: Number,
      required: true,
      min: [0, "price can't be negetive"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs", "metre"],
        message: "unit must be kg, litre, pcs or metre",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "quantity can't be negetive"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          isInteger ? true : false;
        },
      },
      message: "quantity must be an integer",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discountinued"],
        message: "status can't be {VALUE}",
      },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier",
    // },
    // categories: {
    //   name: { type: String, required: true },
    //   _id: mongoose.Schema.ObjectId,
    // },
  },
  {
    timestamps: true,
  }
);

// mongoose middleware for saving data: pre/post
productSchema.pre("save", function (next) {
  this.quantity === 0
    ? (this.status = "out-of-stock")
    : (this.status = "in-stock");
  next();
});

// productSchema.post("save", function (doc, next) {
//   console.log("post save data");
//   next();
// });
// method
productSchema.methods.logger = function () {
  console.log(`data saved for ${this.name}`);
};

// SCHEMA -> MODEL -> QUERY
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
