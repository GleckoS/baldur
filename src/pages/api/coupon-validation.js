import WooCommerceAPI from "@woocommerce/woocommerce-rest-api";

const wooCommerce = new WooCommerceAPI({
  url: "https://baldur.headlesshub.com",
  consumerKey: "ck_29847299c7c95fddb6ab84acc604aa3ebc20c573",
  consumerSecret: "cs_e2618792ffcbee46cbd26eec2c06e7f55ea7bbe6",
  version: "wc/v3"
});

export default async function handler(req, res) {
  wooCommerce.get("coupons")
    .then((response) => {
      let discount = response.data.find(coupon => coupon.code === req.body.code)
      res.send(discount)
    })
    .catch((error) => {
      console.log(error.response.data);
    });
};