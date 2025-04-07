const mongoose=require('mongoose')

const ListingSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide a name"],
        trim:true
    },

    description:{
        type:String,
        required:[true,"Please provide a  description"],
        maxlength:1000
    },

    price: {
        type: String,
        required: [true, "Please provide a price"],
    },

    category: {
        type: String,
        required: [true, "Please provide a category"],
        enum: ["Electronics", "Books",  "Clothing", "others","Furniture"], // Add more categories
        default: "others",
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the user who created the listing
        required: true,
    },
    status: {
        type: String,
        enum: ["available", "sold"],
        default: "available",
    },

    images: {
        type: String, // Array of image URLs (if using cloud storage)
        required:[true,"please provide image"]
    },

    phone:{
        type:String,
        required:[true,'Provide a phone number']
    }


},{timestamps:true})

module.exports = mongoose.model("Listing", ListingSchema);

