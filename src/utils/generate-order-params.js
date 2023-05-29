export const generateOrderParams = (items, form) => {
  return {
    line_items: items?.map(el => {
      return {
        product_id: el.databaseId,
        quantity: el.quantity,
      }
    }),
    method_title: form?.delivery?.type,
    method_description: form?.delivery?.description,
    method_supports: [
      "products"
    ],
    set_paid: false,
    payment_method_title: 'Stripe',
    customer_note: form.customerNote,
    billing: {
      first_name: form.name,
      last_name: form.surName,
      address_1: form.street,
      address_2: form.country,
      city: form.city,
      postcode: form.postcode,
      country: 'PL', // form.country
      email: form.email,
      phone: form.phone,
      company: form.forFirm ? form.firmName : '',
    },
    shipping: {
      first_name: form.name,
      last_name: form.surName,
      address_1: form.inpostNumber ? `${form.inpostNumber.address_details.street}, ${form.inpostNumber.address_details.building_number}` : form.street,
      address_2: '',
      city: form.inpostNumber ? form.inpostNumber.address_details.city : form.nameform.city,
      postcode: form.inpostNumber ? form.inpostNumber.address_details.post_code : form.postcode,
      state: form.inpostNumber ? form.inpostNumber.address_details.province : "",
      country: 'PL',
      phone: form.phone,
    },
    meta_data: [
      {
        key: '_billing_nip',
        value: form.forFirm ? form.nip : ''
      }
    ],
    shipping_lines: [
      form.deliveryMethod === 'inpost' ? {
        method_id: "easypack_parcel_machines",
        method_title: "InPost Paczkomat 24/7",
        total: `20`,
        meta_data: [
          {
            key: "Numer paczkomatu",
            value: form.inpostNumber.name
          }
        ]
      } : {
        method_id: "local_pickup",
        method_title: "Odbiór osobisty",
        total: `0`
      }
    ]
  }
}