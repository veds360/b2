const Listing =require('../models/sellerlistings')
const {StatusCodes}=require('http-status-codes')
const{BadRequestError,NotFoundError,UnauthenticatedError}=require('../errors')
const { upload } = require("../config/cloudinary");

const createListing= async (req,res)=>{
    if(req.user.role!=='seller')
        throw new UnauthenticatedError("Unathenticated")

    req.body.createdBy=req.user.userId

    if(!req.file || !req.file.path)
        throw new BadRequestError("please provide a image")

    const imageUrl=req.file.path

    req.body.images=imageUrl

    const Listings= await Listing.create({...req.body})

    console.log("FILE:", req.file);
console.log("BODY:", req.body);

    res.status(StatusCodes.CREATED).json({Listings})

}

const deleteListing= async (req,res)=>{

    if(req.user.role!=='seller')
        throw new UnauthenticatedError("Unathenticated")
    const{user:{userId},params:{id:itemId}}=req

    const item= await Listing.findOneAndDelete({_id:itemId,createdBy:userId})

    if(!item)
        throw new NotFoundError(`No item with id :${itemId}`)

    res.status(StatusCodes.OK).send()
}

const getAllListings= async(req,res)=>{
   // console.log(req.user.role)
    if(req.user.role!=='seller')
        throw new UnauthenticatedError("Unathenticated")

    const Listings= await Listing.find({createdBy:req.user.userId})
    res.status(StatusCodes.OK).json({Listings})
}

const getListing= async (req,res)=>{

    if(req.user.role!=='seller')
        throw new UnauthenticatedError("Unathenticated")

    const{user:{userId},params:{id:itemId}}=req 

    console.log(userId,itemId)

    // if (!mongoose.Types.ObjectId.isValid(itemId)) {
    //     throw new BadRequestError(`Invalid listing ID: ${itemId}`);
    // }

      const item=await Listing.findOne({
            _id:itemId,
            createdBy:userId
        })
    
        if(!item){
            throw new NotFoundError(`No item with id :${itemId}`)
        }
    res.status(StatusCodes.OK).json({item})
}

const updateListing= async(req,res)=>{
    res.send("Update listing")
}

const getSellerProfile = async (req, res) => {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) throw new NotFoundError("User not found");

    if (user.role !== 'seller') {
        throw new UnauthenticatedError("Unauthorized access");
    }

    // Fetch all listings created by this seller
    const items = await Listing.find({ createdBy: req.user.userId });

    res.status(StatusCodes.OK).json({ user, items });
};


const updateProfile = async (req, res) => {
    const { userId } = req.user;
    const { name, email, password } = req.body;

    // Find user
    const user = await User.findById(userId);
    if (!user) throw new NotFoundError("User not found");

    // Update allowed fields
    if (name) user.name = name;

    if (email) {
        // Ensure new email is unique
        const emailExists = await User.findOne({ email });
        if (emailExists && emailExists._id.toString() !== userId) {
            throw new BadRequestError("Email is already in use");
        }
        user.email = email;
    }

    if (password) {
        user.password = password; // Will be hashed automatically by pre-save middleware
    }

    await user.save(); // Triggers pre-save middleware

    res.status(StatusCodes.OK).json({ message: "Profile updated successfully", user });
};


const getAllCategory= async(req,res)=>{
    const categoryName=req.params.id

    const { userId } = req.user;

   // console.log(categoryName)

    const listings=await Listing.find({category:categoryName,createdBy:userId})

    if (!listings.length) {
        return res.status(StatusCodes.OK).json({ messag: "No listings available" });
    }

    res.status(StatusCodes.OK).json({ listings });
}


module.exports={
    deleteListing,updateListing,createListing,getAllListings,getListing,getSellerProfile,updateProfile ,getAllCategory
}