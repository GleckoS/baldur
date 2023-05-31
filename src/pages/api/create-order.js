const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const WooCommerce = new WooCommerceRestApi({
  url: `${process.env.NEXT_PUBLIC_WP_URL}/`,
  consumerKey: process.env.WC_KEY,
  consumerSecret: process.env.WC_SECRET,
  version: 'wc/v3'
});

export default async function handler(req, res) {
  WooCommerce.post("orders", req.body.params)
    .then((response) => {
      res.send({
        orderId: response,
      });
    })
    .catch((err) => {
      res.status(400).send(err)
    })
};