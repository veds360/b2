const Listing = require("../models/sellerlistings");
const { StatusCodes } = require("http-status-codes");

// const getAllListings = async (req, res) => {
//     const listings = await Listing.find();

//     if (!listings.length) {
//         return res.status(StatusCodes.OK).json({ message: "No listings available" });
//     }

//     res.status(StatusCodes.OK).json({ listings });
// };

// const getAllBooks= async(req,res)=>{
//     const listings=await Listing.find({category:"books"})

//     if (!listings.length) {
//         return res.status(StatusCodes.OK).json({ message: "No listings available" });
//     }

//     res.status(StatusCodes.OK).json({ listings });

// }

// const getAllElectronics= async(req,res)=>{
//     const listings=await Listing.find({category:"electronics"})

//     if (!listings.length) {
//         return res.status(StatusCodes.OK).json({ message: "No listings available" });
//     }

//     res.status(StatusCodes.OK).json({ listings });
// }

// const getAllClothes= async(req,res)=>{
//     const listings=await Listing.find({category:"clothing"})

//     if (!listings.length) {
//         return res.status(StatusCodes.OK).json({ message: "No listings available" });
//     }

//     res.status(StatusCodes.OK).json({ listings });
// }

// const getAllFurniture= async(req,res)=>{
//     const listings=await Listing.find({category:"furniture"})

//     if (!listings.length) {
//         return res.status(StatusCodes.OK).json({ message: "No listings available" });
//     }

//     res.status(StatusCodes.OK).json({ listings });
// }

const getAllCategory= async(req,res)=>{
    const categoryName=req.params.id

   // console.log(categoryName)

    const listings=await Listing.find({category:categoryName})

    console.log(categoryName)

    if (!listings.length) {
        return res.status(StatusCodes.OK).json({ messag: "No listings available" });
    }

    res.status(StatusCodes.OK).json({ listings });
}

module.exports = {getAllCategory};
