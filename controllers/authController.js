const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (id, email) => {
    return jwt.sign({_id: id, email: email}, process.env.SECRET_KEY, {expiresIn: '30m'})
}

const signup = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.signup(email, password)
        const token = createToken(user._id, user.email, user.role)

        res.status(200).json({email, token})
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

const login = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id, user.email, user.role)

        res.status(200).json({email, token})
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

const updateRole = async (req, res) => {
    const {authorization} = req.headers
    const role = req.body.role

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1];

    try {
        const {_id} = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.updateRole(_id, role)

        res.status(200).json({user})        
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

module.exports = {signup, login, updateRole}