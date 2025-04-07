const express=require('express')
const router =express.Router()
const {getItemDetail}=require('../controllers/itempage')


router.get('/:categoryName/:productName', getItemDetail);




module.exports=router