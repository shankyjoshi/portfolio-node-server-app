const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const subscriptionPrices = new Map([
    [1, { priceInCents: 500, name: "Monthly Subscription" }],
    [2, { priceInCents: 5000, name: "Yearly Subscription" }]
]);

//payment
const paymentCheckout = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items.map(item => {
                const subscriptionPrice = subscriptionPrices.get(item.id)
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: subscriptionPrice.name
                        },
                        unit_amount: subscriptionPrice.priceInCents
                    },
                    quantity: item.quantity
                }
            }),

            success_url: `${process.env.CLIENT_URL}/success.html`,
            cancel_url: `${process.env.CLIENT_URL}/cancel.html`
        });

        res.status(200).json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

module.exports = { paymentCheckout }
