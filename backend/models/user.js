import  mongoose from 'mongoose'
const { Schema } = mongoose;
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const UserSchema=new Schema({
    name:  {type:String,
            required:true
        },
    email: {type:String,
            required: true,
            unique:true
        },
    password:   {type:String, 
                required:true
            },
    date:{type:String,
        default:Date.now
    },
    refreshToken: {
        type: String
    }

});

UserSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
UserSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User=mongoose.model('userData',UserSchema)
// here user is nawm of the model  and data will stored in tavble/collection  named userdatas
// module.exports=User