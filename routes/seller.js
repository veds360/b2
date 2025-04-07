const express=require('express')
const { upload } = require("../config/cloudinary");
const router =express.Router()
const { deleteListing,updateListing,createListing,getAllListings,getListing,getSellerProfile,updateProfile, getAllCategory
}=require('../controllers/seller')


router.route("/:id").patch(updateListing).delete(deleteListing).get(getListing)
router.route("/").get(getAllListings).post(upload.single("images"),createListing)
router.route("/profile").get(getSellerProfile).patch(updateProfile)
router.route('/category/:id').get(getAllCategory)


module.exports=router