const express = require('express')

const {signup, login, updateRole} = require('../controllers/authController')

const router = express.Router()

router.post('/signup', signup)

router.post('/login', login)

router.patch('/update-role', updateRole)

module.exports = router