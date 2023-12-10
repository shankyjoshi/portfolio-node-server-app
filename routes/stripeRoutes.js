const express = require('express')

const { paymentCheckout } = require('../controllers/stripeController')

const router = express.Router()

router.post('/checkout-page', paymentCheckout)

module.exports = router