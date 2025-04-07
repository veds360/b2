
const mongoose=require('mongoose')
const bcrypt =require('bcryptjs')
const jwt =require('jsonwebtoken')
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"plaease provide your name"],
        minlength:3,
        maxlength:50

    },
    email:{
        type:String,
        required:[true,"plaease provide your email"],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"please provide valid email"],
        unique:true ,// not a validator
    },
    password:{
        type:String,
        required:[true,"plaease provide your password"],
        minlength:6,
        
    },
    role:{
        type:String,
        enum:['buyer','seller'],
        default:'buyer'
    }
})

UserSchema.pre('save', async function(next){

    if(!this.isModified("password")) return next()
    const salt= await bcrypt.genSalt(10)
    this.password= await bcrypt.hash(this.password,salt)
    next()
})


UserSchema.methods.createJWT=function (){
    return jwt.sign({userId:this._id,name:this.name,role:this.role},process.env.JWT_SECRET,{expiresIn:'30d'})
}

UserSchema.methods.comparePassword=async function (candidatePassword){
    const isMatch=await bcrypt.compare(candidatePassword,this.password)
    return isMatch
}

module.exports=mongoose.model('User',UserSchema)