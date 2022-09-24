const Products = require("../models/Product");

module.exports.getProductService = async (query) => {
  // const product = await Product.where("name")
  //   .equals(/\w/)
  //   .where("quantity")
  //   .lt(10)
  //   .limit(2);
  const { status, limit, sort, page } = query;
  let sorted, fields;
  if (sort) {
    sorted = sort.split(",").join(" ");
  }
  if (query.fields) {
    fields = query.fields.split(",").join(" ");
  }
  return await Products.find();
  // .sort(sorted)
  // .select(fields)
  // .limit(+limit);
};

module.exports.createProductService = async (data) => {
  return await Products.create(data);
  //const product = new Product(req.body);
  //await product.save();
};

module.exports.updateProductService = async (id, data) => {
  // return await Product.updateOne(
  //   { _id: id },
  //   { $set: data },
  //   { runValidators: true }
  // );
  const product = await Products.findById(id);
  return await product.set(data).save();
};

module.exports.bulkUpdateProductService = async (data) => {
  // return await Products.updateMany({ _id: data.ids }, data.data, {
  //   runValidators: true,
  // });
  const products = [];
  data.ids.forEach((product) => {
    products.push(Products.updateOne({ _id: product.id }, product.data));
  });
  const result = await Promise.all(products);
  return result;
};

module.exports.deleteProductService = async (id) => {
  return await Products.deleteOne({ _id: id });
};

module.exports.bulkDeleteProductService = async (data) => {
  return await Products.deleteMany({ _id: data.ids });
};
