const Listing =require('../models/sellerlistings')
const {StatusCodes}=require('http-status-codes')
const{BadRequestError,NotFoundError,UnauthenticatedError}=require('../errors')
const Cart=require('../models/cart')


const getAllCart = async (req, res) => {
    const { userId } = req.user; // Get logged-in user's ID
    
    // Find all cart items for this user and populate listing details
    const cartItems = await Cart.find({ userId }).populate("listingId");

   

    res.status(StatusCodes.OK).json({ cartItems });
};


const deleteFromCart = async (req, res) => {
    const { userId } = req.user;
    const { id: listingId } = req.params;

    // Find and delete the item from cart
    const cartItem = await Cart.findOneAndDelete({ userId, listingId });

    if (!cartItem) {
        throw new NotFoundError(`Item not found in cart: ${listingId}`);
    }

    res.status(StatusCodes.OK).json({ message: "Removed from cart" });
};

const getBuyerProfile = async (req, res) => {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) throw new NotFoundError("User not found");

    if (user.role !== 'buyer') {
        throw new UnauthenticatedError("Unauthorized access");
    }

    const cartItems = await Cart.find({ userId: req.user.userId }).populate("listingId");

    res.status(StatusCodes.OK).json({ user, cartItems });
};

const addToCart = async (req, res) => {
    const { userId } = req.user;
    const { id: listingId } = req.params;

    // Check if the listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) throw new NotFoundError(`No listing found with ID: ${listingId}`);

    // Check if item is already in cart
    const alreadyInCart = await Cart.findOne({ userId, listingId });

    if (alreadyInCart) {
        return res.status(StatusCodes.OK).json({ message: "Already in cart" });
    }

    // Add item to cart
    const cartItem = await Cart.create({ userId, listingId });

    res.status(StatusCodes.OK).json({ message: "Added to cart", cartItem });
};


const getSingleCartItem = async (req, res) => {
    const { userId } = req.user;
    const { id: listingId } = req.params;

    // Find the cart item for the user
    const cartItem = await Cart.findOne({ userId, listingId }).populate("listingId");

    if (!cartItem) {
        throw new NotFoundError(`Item not found in cart: ${listingId}`);
    }

    res.status(StatusCodes.OK).json({ cartItem });
};



const updateBuyerProfile = async (req, res) => {
    const { userId } = req.user;
    const { name, email, password } = req.body;

    const user = await User.findById(userId);
    if (!user) throw new NotFoundError("User not found");

    if (user.role !== 'buyer') throw new BadRequestError("Unauthorized");

    if (name) user.name = name;
    if (email) user.email = email;

    if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(StatusCodes.OK).json({ user });
};


module.exports={
    addToCart,getAllCart,deleteFromCart,getSingleCartItem,getBuyerProfile,updateBuyerProfile
}