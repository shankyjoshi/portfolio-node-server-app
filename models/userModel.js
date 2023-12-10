const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin',  'MonthlySubscription', 'YearlySubscription', 'None'],
        default: 'None' 
    }
})


userSchema.statics.signup = async function (email, password) {
    if (!email || !password) {
        throw Error("All fields are required")
    }

    if (!validator.isEmail(email)) {
        throw Error("Please enter a valid email")
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough")
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error("Email already in use")
    }
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user;
}

userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error("All fields are required")
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error("Email does not exist")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Invalid password")
    }

    return user;
}

userSchema.statics.updateRole = async function(_id, role) {
    if (!_id || !role) {
        throw new Error("User ID and role are required for updating the role")
    }    

    const updatedUser = await this.findOneAndUpdate(
        { _id },
        { $set: { role } },
        { new: true }
    )

    if (!updatedUser) {
        throw new Error("User not found for the given ID.")
    }

    return updatedUser
}

module.exports = mongoose.model('User', userSchema);
