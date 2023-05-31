const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const WooCommerce = new WooCommerceRestApi({
  url: `${process.env.NEXT_PUBLIC_WP_URL}/`,
  consumerKey: process.env.NEXT_PUBLIC_WC_KEY,
  consumerSecret: process.env.NEXT_PUBLIC_WC_SECRET,
  version: 'wc/v3'
});

export default async function handler(req, res) {
  WooCommerce.post("orders", req.body.params)
    .then((response) => {
      res.status(201).send(response.data);
    })
    .catch((err) => {
      res.status(400).send(err)
    })
};