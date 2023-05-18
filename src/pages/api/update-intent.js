const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.update(req.body.intent, {
    payment_method_types: [req.body.method],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};