const {
  getProductService,
  createProductService,
  updateProductService,
  bulkUpdateProductService,
  deleteProductService,
  bulkDeleteProductService,
} = require("../services/product.services");

module.exports.getProduct = async (req, res, next) => {
  try {
    const product = await getProductService(req.query);
    res.status(200).send(product);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
    next(error);
  }
};

module.exports.createProduct = async (req, res, next) => {
  try {
    const product = await createProductService(req.body);
    product.logger();
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
    next(error);
  }
};

module.exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await updateProductService(id, req.body);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
    next(error);
  }
};

module.exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const product = await bulkUpdateProductService(req.body);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
    next(error);
  }
};

module.exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await deleteProductService(id);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
    next(error);
  }
};

module.exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    const product = await bulkDeleteProductService(req.body);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
    next(error);
  }
};
