const Listing = require("../models/sellerlistings");
const { StatusCodes } = require("http-status-codes");

const getItemDetail = async (req, res) => {
    const { categoryName, productName } = req.params;
   
    const item = await Listing.findOne({
        category: categoryName,
        name: productName.replace("_", " "), // Assuming the product name is stored with spaces and URL is encoded
    });

    if (!item) {
        return res.status(404).json({ message: "Item not found " });
    }

    res.status(200).json({ item });
};

module.exports={getItemDetail}
