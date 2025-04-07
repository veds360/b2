const express=require('express')
const router =express.Router()
const {getAllCategory}=require('../controllers/general')

// router.route('/').get(getAllListings)
// router.route('/books').get(getAllBooks)
// router.route('/clothes').get(getAllClothes)
// router.route('/electronics').get(getAllElectronics)
// router.route('/furniture').get(getAllFurniture)
router.route('/:id').get(getAllCategory)


module.exports=router