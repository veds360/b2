const mongoose=require('mongoose')

const CartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    listingId: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true }
}, { timestamps: true });

module.exports=new mongoose.model("Cart",CartSchema)