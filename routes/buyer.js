const express=require('express')
const router =express.Router()
const {
    addToCart,getAllCart,deleteFromCart,getSingleCartItem,getBuyerProfile,updateBuyerProfile
}=require('../controllers/buyer')


router.route('/').get(getAllCart)
router.route('/:id').delete(deleteFromCart).post(addToCart).get(getSingleCartItem)
router.route('/profile').get(getBuyerProfile).patch(updateBuyerProfile)


module.exports=router