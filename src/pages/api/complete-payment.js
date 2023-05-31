const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
    url: `${process.env.NEXT_PUBLIC_WP_URL}/`,
    consumerKey: process.env.NEXT_PUBLIC_WC_KEY,
    consumerSecret: process.env.NEXT_PUBLIC_WC_SECRET,
    version: 'wc/v3'
});

export default async function handler(req, res) {
    let status = req.query.redirect_status === 'succeeded' ? 'processing' : 'cancelled'

    // ?id=528&redirect_status=succeeded&payment_intent=pi_3NDowYI9MWE3PvcY0TE4MiGt&payment_intent_client_secret=pi_3NDowYI9MWE3PvcY0TE4MiGt_secret_hrrVOUdPQ8EqkVrJBfX55cOkB
    api.put(`orders/${req.query.id}`, {
        status: status,
        transaction_id: req.query.payment_intent
    }).then(response => {
        res.status(201).redirect(`/podziekowanie?status=${req.query.redirect_status}&order=${req.query.id}`)
    }).catch(err => {
        res.status(500).send('Błąd podczas aktualizacji zamówienia, napisz do nas, twój numer zamówienia to: ' + req.query.id + ', twój numer płatności to: ' + req.query.payment_intent);
    })
};