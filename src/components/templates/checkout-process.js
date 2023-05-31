import React, { useEffect, useMemo, useState } from "react"
import styled, { keyframes } from "styled-components"
import { Input } from "../atoms/input"
import Image from "next/image"
import Link from "next/link"
import ButtonFilled from "../atoms/button-filled"
import { generateOrderParams } from "../../utils/generate-order-params"
import { toast } from "react-toastify"
import PopUp from "../organisms/payment-pop-up"
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import Loader from "../organisms/loader"
import { useCart } from "react-use-cart"
import { useRouter } from "next/navigation"
import { Elements } from "@stripe/react-stripe-js"
import { useForm } from "react-hook-form"
import { InpostGeowidget } from "react-inpost-geowidget";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const getItem = (name, altVal = '') => {

  if (typeof window === 'undefined') return altVal

  return localStorage.getItem(name) !== 'null' ? localStorage.getItem(name) : altVal
}

const setFormToLocalStorage = (form) => {
  localStorage.setItem('name', form.name)
  localStorage.setItem('surName', form.surName)
  localStorage.setItem('phone', form.phone)
  localStorage.setItem('email', form.email)

  localStorage.setItem('postCode', form.postCode)
  localStorage.setItem('street', form.street)
  localStorage.setItem('country', form.country)
  localStorage.setItem('city', form.city)

  localStorage.setItem('customerNote', form.customerNote)

  localStorage.setItem('forFirm', form.forFirm)
  localStorage.setItem('firmName', form.firmName)
  localStorage.setItem('firmNip', form.firmNip)
}

export default function Process() {
  const { register, reset, watch, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });
  const forFirmChecked = watch('forFirm');

  const { items, cartTotal } = useCart();
  const router = useRouter();

  const [isTrueNip, setIsTrueNip] = useState(false)
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntent, setPaymentIntent] = useState("");
  const [orderNumber, setOrderNumber] = useState(null)
  const [isPaymentPopUpOpen, setIsPaymentPopUpOpen] = useState(false)
  const [discount, setDiscount] = useState(null)
  const [sum, setSum] = useState(0)
  const [form, setForm] = useState({
    name: getItem('name'),
    surName: getItem('surName'),
    phone: getItem('phone'),
    email: getItem('email'),

    postCode: getItem('postCode'),
    street: getItem('street'),
    country: getItem('country'),
    city: getItem('city'),

    customerNote: getItem('customerNote'),

    forFirm: getItem('forFirm') === 'true' ? true : false,
    firmName: getItem('firmName'),
    firmNip: getItem('firmNip'),

    paymentMethod: 'blik',
    deliveryMethod: 'inpost',
    inpostNumber: null
  })

  const totalSum = useMemo(() => {
    if (discount) {
      if (discount.discount_type === "percent") {
        return Math.round(sum * (1 - Number(discount.amount) / 100)) + (form.deliveryMethod === 'inpost' ? 20 : 0)
      } else {
        return Math.round(sum - Number(discount.amount)) + (form.deliveryMethod === 'inpost' ? 20 : 0)
      }
    }
    return sum + (form.deliveryMethod === 'inpost' ? 20 : 0)
  }, [form.deliveryMethod, sum, discount])

  const createIntent = async (sum, paymentMethod, orderId) => {
    axios.post("/api/create-intent", {
      count: Number(sum) * 100,
      id: orderId,
      method: paymentMethod
    })
      .then((res) => {
        setClientSecret(res.data.clientSecret)
        setPaymentIntent(res.data.id)
      })
      .catch((err) => {
        setIsPaymentPopUpOpen(false)
        toast.error('Problem pod czas tworzenia bramki płatności. Spróbuj ponownie. Jeśli problem będzie się powtarzał, skontaktuj się z nami.')
      })
  }

  const createOrder = async (items, form, sum) => {
    axios.post("/api/create-order", {
      params: generateOrderParams(items, form)
    })
      .then((res) => {
        console.log(res.data.orderId)
        setOrderNumber(res.data.orderId)
        createIntent(sum, form.paymentMethod, res.data.orderId)
      })
      .catch((err) => {
        setIsPaymentPopUpOpen(false)
        toast.error('Nie udało się utworzyć zamówienia. Spróbuj ponownie. Jeśli problem będzie się powtarzał, skontaktuj się z nami.')
      })
  }

  const paymentHandler = async () => {
    setFormToLocalStorage(form)
    setIsPaymentPopUpOpen(true)
    createOrder(items, form, totalSum)
  }

  useEffect(() => {
    if (cartTotal === 0) {
      router.push('/koszyk')
    }

    setSum(cartTotal)
    const discount = JSON.parse(localStorage.getItem('discount'))
    if (discount) {
      axios.put('/api/coupon-validation', { code: discount.code })
        .then(({ data }) => {
          if (data.code) {
            setDiscount(data)
          } else {
            setDiscount(null)
          }
        })
    }
  }, [])

  useEffect(() => {
    setIsTrueNip(false)
    const date = new Date().toISOString().split('T')[0]
    if (form.firmNip?.length === 10) {
      axios.get(`https://wl-api.mf.gov.pl/api/search/nip/${form.firmNip}?date=${date}`)
        .then(res => {
          if (res.data.result.subject) {
            setForm({ ...form, firmName: res.data.result.subject.name })
            setIsTrueNip(true)
          } else {
            toast.warn('Brak informacji w bazie NIP')
          }
        })
        .catch(err => {
          toast.error(err.response.data.message)
        })
    }
  }, [form.firmNip])

  const onPointCallback = (e) => {
    setForm({ ...form, inpostNumber: e })
  }

  return (
    <Wrapper>
      <div className="container">
        <Form onSubmit={handleSubmit(paymentHandler)}>
          <fieldset>
            <legend>Dane kontaktowe</legend>
            <label>
              <span>Imię:</span>
              <Input {...register("name", { required: true, minLength: 3 })} value={form.name} onChange={(e) => { setForm({ ...form, name: e.currentTarget.value }) }} />
              {errors.name && <span className='error'>Proszę poprawnie wypełnić to pole</span>}
            </label>
            <label>
              <span>Nazwisko:</span>
              <Input {...register("surname", { required: true, minLength: 3 })} value={form.surName} onChange={(e) => { setForm({ ...form, surName: e.currentTarget.value }) }} />
              {errors.surname && <span className='error'>Proszę poprawnie wypełnić to pole</span>}
            </label>
            <label>
              <span>Numer Telefonu: </span>
              <Input value={form.phone} onChange={(e) => { setForm({ ...form, phone: e.currentTarget.value }) }} />
            </label>
            <label>
              <span>Adres Email:</span>
              <Input {...register("mail", { required: true, pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} value={form.email} onChange={(e) => { setForm({ ...form, email: e.currentTarget.value }) }} />
              {errors.mail && <span className='error'>Proszę poprawnie wypełnić to pole</span>}
            </label>
            <label className="text-area">
              <span>Uwagi do zamówienia:</span>
              <Input as='textarea' rows='5' value={form.customerNote} onChange={(e) => { setForm({ ...form, customerNote: e.currentTarget.value }) }} />
            </label>
          </fieldset>
          <fieldset>
            <legend>Dane  adresowe</legend>
            <label>
              <span>Kod pocztowy:</span>
              <Input {...register("postcode", { required: true })} value={form.postCode} onChange={(e) => { setForm({ ...form, postCode: e.currentTarget.value }) }} />
              {errors.postcode && <span className='error'>Proszę poprawnie wypełnić to pole</span>}
            </label>
            <label>
              <span>Ulica i Nr lokalu/domu:</span>
              <Input {...register("adres", { required: true })} value={form.street} onChange={(e) => { setForm({ ...form, street: e.currentTarget.value }) }} />
              {errors.adres && <span className='error'>Proszę poprawnie wypełnić to pole</span>}
            </label>
            <label>
              <span>Kraj: </span>
              <Input {...register("country", { required: true })} value={form.country} onChange={(e) => { setForm({ ...form, country: e.currentTarget.value }) }} />
              {errors.country && <span className='error'>Proszę poprawnie wypełnić to pole</span>}
            </label>
            <label>
              <span>Miasto:</span>
              <Input {...register("city", { required: true })} value={form.city} onChange={(e) => { setForm({ ...form, city: e.currentTarget.value }) }} />
              {errors.city && <span className='error'>Proszę poprawnie wypełnić to pole</span>}
            </label>
          </fieldset>
          <fieldset>
            <label className="check box-wrap">
              <input {...register("forFirm")} checked={form.forFirm} onChange={(e) => { setForm({ ...form, forFirm: e.currentTarget.checked }) }} type='checkbox' />
              <span className="box">
                <svg className="left" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.58417 9.83269e-06C3.7807 -0.0127349 14.0398 12.3682 14.0398 12.3682L35 34.9994C35 34.9994 24.9609 35.376 9.90287 16.9355L11.8313 14.8534C11.8313 14.8534 8.77502 13.4608 6.16089 9.8853C3.54676 6.30982 3.64012 6.48593 2.48974 5.42001C1.33935 4.35408 0.282323 3.78984 0.0269199 3.21169C-0.228483 2.6347 1.38764 0.0127546 2.58417 9.83269e-06V9.83269e-06Z" fill="#C38D8D" />
                </svg>
                <svg className="right" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32.4158 9.83269e-06C31.2193 -0.0127349 20.9602 12.3682 20.9602 12.3682L0 34.9994C0 34.9994 10.0391 35.376 25.0971 16.9355L23.1687 14.8534C23.1687 14.8534 26.225 13.4608 28.8391 9.8853C31.4532 6.30982 31.3599 6.48593 32.5103 5.42001C33.6607 4.35408 34.7177 3.78984 34.9731 3.21169C35.2285 2.6347 33.6124 0.0127546 32.4158 9.83269e-06V9.83269e-06Z" fill="#C38D8D" />
                </svg>
              </span>
              <p>Kupuję na firmę</p>
            </label>
          </fieldset>
          <fieldset className={form.forFirm ? "firm active" : "firm"}>
            <label>
              <span>NIP:</span>
              <Input maxLength='10' {...register("nip", { validate: () => { return (isTrueNip || !forFirmChecked) ? true : 'Proszę wprowadzić poprawny NIP' } })} value={form.firmNip} onChange={(e) => { setForm({ ...form, firmNip: e.currentTarget.value }) }} />
              {errors.nip && <span className='error'>Proszę wprowadzić poprawny NIP</span>}
            </label>
            <label>
              <span>Nazwa firmy: </span>
              <Input {...register("firmName")} value={form.firmName} onChange={(e) => { setForm({ ...form, firmName: e.currentTarget.value }) }} />
            </label>
          </fieldset>
          <fieldset className="payment">
            <legend>Wybierz płatność</legend>
            <label className="radio box-wrap">
              <input onChange={(e) => { setForm({ ...form, paymentMethod: e.currentTarget.defaultValue }) }} defaultChecked={form.paymentMethod === 'blik'} type="radio" name="payment" value='blik' />
              <span className="box">
                <svg className="left" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.58417 9.83269e-06C3.7807 -0.0127349 14.0398 12.3682 14.0398 12.3682L35 34.9994C35 34.9994 24.9609 35.376 9.90287 16.9355L11.8313 14.8534C11.8313 14.8534 8.77502 13.4608 6.16089 9.8853C3.54676 6.30982 3.64012 6.48593 2.48974 5.42001C1.33935 4.35408 0.282323 3.78984 0.0269199 3.21169C-0.228483 2.6347 1.38764 0.0127546 2.58417 9.83269e-06V9.83269e-06Z" fill="#C38D8D" />
                </svg>
                <svg className="right" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32.4158 9.83269e-06C31.2193 -0.0127349 20.9602 12.3682 20.9602 12.3682L0 34.9994C0 34.9994 10.0391 35.376 25.0971 16.9355L23.1687 14.8534C23.1687 14.8534 26.225 13.4608 28.8391 9.8853C31.4532 6.30982 31.3599 6.48593 32.5103 5.42001C33.6607 4.35408 34.7177 3.78984 34.9731 3.21169C35.2285 2.6347 33.6124 0.0127546 32.4158 9.83269e-06V9.83269e-06Z" fill="#C38D8D" />
                </svg>
              </span>
              <Image src='/blik.png' width={212} height={133} alt='ikona blik' />
            </label>
            <label className="radio box-wrap">
              <input onChange={(e) => { setForm({ ...form, paymentMethod: e.currentTarget.defaultValue }) }} defaultChecked={form.paymentMethod === 'p24'} type="radio" name="payment" value='p24' />
              <span className="box">
                <svg className="left" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.58417 9.83269e-06C3.7807 -0.0127349 14.0398 12.3682 14.0398 12.3682L35 34.9994C35 34.9994 24.9609 35.376 9.90287 16.9355L11.8313 14.8534C11.8313 14.8534 8.77502 13.4608 6.16089 9.8853C3.54676 6.30982 3.64012 6.48593 2.48974 5.42001C1.33935 4.35408 0.282323 3.78984 0.0269199 3.21169C-0.228483 2.6347 1.38764 0.0127546 2.58417 9.83269e-06V9.83269e-06Z" fill="#C38D8D" />
                </svg>
                <svg className="right" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32.4158 9.83269e-06C31.2193 -0.0127349 20.9602 12.3682 20.9602 12.3682L0 34.9994C0 34.9994 10.0391 35.376 25.0971 16.9355L23.1687 14.8534C23.1687 14.8534 26.225 13.4608 28.8391 9.8853C31.4532 6.30982 31.3599 6.48593 32.5103 5.42001C33.6607 4.35408 34.7177 3.78984 34.9731 3.21169C35.2285 2.6347 33.6124 0.0127546 32.4158 9.83269e-06V9.83269e-06Z" fill="#C38D8D" />
                </svg>
              </span>
              <Image src='/p24.png' width={183} height={72} alt='ikona przelewy 24' />
            </label>
          </fieldset>
          <fieldset className="payment">
            <legend>Wybierz sposób dostawy</legend>
            <label className="radio box-wrap">
              <input onChange={(e) => { setForm({ ...form, deliveryMethod: e.currentTarget.defaultValue }) }} defaultChecked={form.deliveryMethod === 'inpost'} type="radio" name="delivery" value='inpost' />
              <span className="box">
                <svg className="left" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.58417 9.83269e-06C3.7807 -0.0127349 14.0398 12.3682 14.0398 12.3682L35 34.9994C35 34.9994 24.9609 35.376 9.90287 16.9355L11.8313 14.8534C11.8313 14.8534 8.77502 13.4608 6.16089 9.8853C3.54676 6.30982 3.64012 6.48593 2.48974 5.42001C1.33935 4.35408 0.282323 3.78984 0.0269199 3.21169C-0.228483 2.6347 1.38764 0.0127546 2.58417 9.83269e-06V9.83269e-06Z" fill="#C38D8D" />
                </svg>
                <svg className="right" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32.4158 9.83269e-06C31.2193 -0.0127349 20.9602 12.3682 20.9602 12.3682L0 34.9994C0 34.9994 10.0391 35.376 25.0971 16.9355L23.1687 14.8534C23.1687 14.8534 26.225 13.4608 28.8391 9.8853C31.4532 6.30982 31.3599 6.48593 32.5103 5.42001C33.6607 4.35408 34.7177 3.78984 34.9731 3.21169C35.2285 2.6347 33.6124 0.0127546 32.4158 9.83269e-06V9.83269e-06Z" fill="#C38D8D" />
                </svg>
              </span>
              <Image src='/inpost.png' width={152} height={113} alt='ikona inpost' />
            </label>
            <label className="radio box-wrap">
              <input onChange={(e) => { setForm({ ...form, deliveryMethod: e.currentTarget.defaultValue }) }} defaultChecked={form.deliveryMethod === 'osobisty'} type="radio" name="delivery" value='osobisty' />
              <span className="box">
                <svg className="left" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.58417 9.83269e-06C3.7807 -0.0127349 14.0398 12.3682 14.0398 12.3682L35 34.9994C35 34.9994 24.9609 35.376 9.90287 16.9355L11.8313 14.8534C11.8313 14.8534 8.77502 13.4608 6.16089 9.8853C3.54676 6.30982 3.64012 6.48593 2.48974 5.42001C1.33935 4.35408 0.282323 3.78984 0.0269199 3.21169C-0.228483 2.6347 1.38764 0.0127546 2.58417 9.83269e-06V9.83269e-06Z" fill="#C38D8D" />
                </svg>
                <svg className="right" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32.4158 9.83269e-06C31.2193 -0.0127349 20.9602 12.3682 20.9602 12.3682L0 34.9994C0 34.9994 10.0391 35.376 25.0971 16.9355L23.1687 14.8534C23.1687 14.8534 26.225 13.4608 28.8391 9.8853C31.4532 6.30982 31.3599 6.48593 32.5103 5.42001C33.6607 4.35408 34.7177 3.78984 34.9731 3.21169C35.2285 2.6347 33.6124 0.0127546 32.4158 9.83269e-06V9.83269e-06Z" fill="#C38D8D" />
                </svg>
              </span>
              <Image src='/odbior.png' width={226} height={133} alt='ikona odbioru osobistego' />
            </label>
          </fieldset>
          <div className={form.deliveryMethod === 'inpost' && !form.inpostNumber ? "active geo-widget" : "geo-widget"}>
            <InpostGeowidget
              token={process.env.NEXT_PUBLIC_INPOST_GEO_KEY}
              config='parcelCollect'
              onPoint={onPointCallback}
            />
          </div>
          <div className={form.deliveryMethod === 'inpost' && form.inpostNumber ? "active inpost-data" : "inpost-data"}>
            <h2>Paczkomat Inpost:</h2>
            <p>{form.inpostNumber?.address?.line1}</p>
            <p>{form.inpostNumber?.address?.line2}</p>
            <p>{form.inpostNumber?.name}</p>
            <button onClick={() => { setForm({ ...form, inpostNumber: false }) }}>Zmień paczkomat</button>
          </div>
          <div className="summary">
            <div className="flex">
              <span>PRODUKTY: </span>
              <span>{sum}&nbsp;zł</span>
            </div>
            {discount && (
              <div className="flex">
                <span>KOD RABATOWY ({discount.code}):</span>
                <span>{Math.round(Number(discount.amount))}&nbsp;{discount.discount_type === "percent" ? '%' : 'zł'}</span>
              </div>
            )}
            <div className="flex">
              <span>WYSYŁKA: </span>
              <span>{form.deliveryMethod === 'inpost' ? 20 : 0}&nbsp;zł</span>
            </div>
            <div className="flex">
              <span>RAZEM: </span>
              <span>{totalSum}&nbsp;zł</span>
            </div>
          </div>
          <label className="check box-wrap small-text">
            <input {...register("checkbox", { required: true })} type='checkbox' />
            <span className="box">
              <svg className="left" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.58417 9.83269e-06C3.7807 -0.0127349 14.0398 12.3682 14.0398 12.3682L35 34.9994C35 34.9994 24.9609 35.376 9.90287 16.9355L11.8313 14.8534C11.8313 14.8534 8.77502 13.4608 6.16089 9.8853C3.54676 6.30982 3.64012 6.48593 2.48974 5.42001C1.33935 4.35408 0.282323 3.78984 0.0269199 3.21169C-0.228483 2.6347 1.38764 0.0127546 2.58417 9.83269e-06V9.83269e-06Z" fill="#C38D8D" />
              </svg>
              <svg className="right" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32.4158 9.83269e-06C31.2193 -0.0127349 20.9602 12.3682 20.9602 12.3682L0 34.9994C0 34.9994 10.0391 35.376 25.0971 16.9355L23.1687 14.8534C23.1687 14.8534 26.225 13.4608 28.8391 9.8853C31.4532 6.30982 31.3599 6.48593 32.5103 5.42001C33.6607 4.35408 34.7177 3.78984 34.9731 3.21169C35.2285 2.6347 33.6124 0.0127546 32.4158 9.83269e-06V9.83269e-06Z" fill="#C38D8D" />
              </svg>
            </span>
            <p>Przeczytałem/am <Link href='/regulamin'>regulamin</Link> i rozumiem <Link href='/polityka-prywatnosci'>politykę prywatności</Link> i cookies</p>
            {errors.checkbox && <span className='error'>Proszę zaakceptować regulamin i politykę prywatności </span>}
          </label>
          <ButtonFilled disabled={form.deliveryMethod === 'inpost' && !form.inpostNumber} className='button' as='button'>
            <span>
              PŁATNOŚĆ
            </span>
          </ButtonFilled>
        </Form>
        <Link className="back-link" href='/koszyk'>
          <svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.1232 18.629C10.6048 18.1343 10.6048 17.3323 10.1232 16.8377L2.97898 9.5L10.1232 2.16233C10.6048 1.66767 10.6048 0.865662 10.1232 0.370998C9.64154 -0.123667 8.86068 -0.123667 8.37906 0.370998L0.362831 8.60433C-0.118789 9.09899 -0.118789 9.901 0.362831 10.3957L8.37906 18.629C8.86068 19.1237 9.64154 19.1237 10.1232 18.629Z" fill="#EDE2E2" />
          </svg>
          Wróć do koszyka
        </Link>
      </div>
      {isPaymentPopUpOpen
        ? clientSecret
          ? <Elements options={{ clientSecret: clientSecret }} stripe={stripePromise} >
            <PopUp setIsPaymentPopUpOpen={setIsPaymentPopUpOpen} intent={paymentIntent} orderNumber={orderNumber} clientSecret={clientSecret} />
          </Elements>
          : <Loader />
        : null
      }
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .back-link{
    display: flex;
    gap: 10px;
    align-items: center;
    color: var(--primary-500);
    width: fit-content; 
    margin-top: 40px;
    svg{
      margin-top: 4px;
    }
  }

  .button{
    margin: 50px auto 0;
  }

  .summary{
    margin-top: 90px;
    display: grid;
    gap: 10px;

    @media (max-width: 480px) {
      width: calc(100% + 48px);
      margin-left: -24px;
    }


    .flex{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 23px;
      background-color: var(--primary-500);

      > span{
        &:first-child{
          text-transform: uppercase;
          font-size: 24rem;
          color: var(--dark-500);

          @media (max-width: 360px) {
            font-size: clamp(0rem, ${24 / 360 * 100}vw, 24rem);
          }
        }

        &:last-child{
          font-size: 40rem;
          font-weight: 500;
          color: var(--dark-500);

          @media (max-width: 360px) {
            font-size: clamp(0rem, ${40 / 360 * 100}vw, 40rem);
          }
        }
      }
    }
  }
`

const Form = styled.form`

  .inpost-data{
    opacity: 0;
    pointer-events: none;
    height: 0;
    &.active{
      opacity: 1;
      pointer-events: all;
      height: auto;
    }

    h2{
      margin-top: 30px;
      margin-bottom: 15px;
      font-size: 36rem;
      font-family: var(--text);

      @media (max-width: 360px) {
        font-size: clamp(0rem, ${36 / 360 * 100}vw, 36rem);
      }
    }

    button{
      background-color: transparent;
      border: none;
      text-decoration: underline;
      margin-top: 10px;
    }
  }


  .geo-widget{
    margin-top: 0;
    height: 0;
    transition: all .3s ease-out;

    &.active{
      height: 600px;
      margin-top: 40px;
    }
  }

  .error{
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
    font-size: 14rem;
  }

  fieldset{
    margin-top: 60px;
    padding: 0;
    border: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 35px 25px;

    @media (max-width: 820px) {
      grid-template-columns: 1fr;
    }

    &.firm{
      margin-top: 0px;
      padding: 0px 5px;
      height: 0px;
      overflow: hidden;
      transition: all .2s ease-out;
      padding-bottom: 0;

      &.active{
        margin-top: 40px;
        height: 143px;
        padding-bottom: 30px;

        @media (max-width: 820px) {
          height: 261px;
        }
      }
    }

    &.payment{
      width: fit-content;
      display: flex;
      flex-wrap: wrap;
    }

    legend{
      margin-bottom: 40px;
      font-size: 36rem;

      @media (max-width: 360px) {
        font-size: clamp(0rem, ${36 / 360 * 100}vw, 36rem);
      }
    }

    .text-area{
      grid-column-end: 3;
      grid-column-start: 1;

      @media (max-width: 820px) {
        grid-column-end: unset;
      }
    }

    label{
      display: grid;
      gap: 10px;
      position: relative;

      span{
        font-size: 26rem;

        @media (max-width: 360px) {
          font-size: clamp(0rem, ${26 / 360 * 100}vw, 26rem);
        }
      }
    }
  }

  .radio{
    display: grid;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 0 26px;
    height: 133px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    grid-template-columns: 46px 1fr;
    width: 350px;
    max-width: 350px;
    justify-content: flex-start;

    img{
      display: block;
      margin: 0 auto;
    }

    @media (max-width: 640px) {
      width: 100%;
    }

    @media (max-width: 380px) {
      padding: 0 12px;
    }

    @media (max-width: 355px) {
      padding: 0 12px;
      img{
        width: 80%;
        height: fit-content;
      }
    }

    .box{
      border: 3px solid #0A0A0A;
      box-sizing: content-box;
    }
    
    input:focus-visible ~ .box{
      outline: 2px solid var(--dark-500) !important ;
      outline-offset: 2px; 
    }
  }

  .check{
    display: grid;
    align-items: center;
    grid-template-columns: 40px auto;
    gap: 15px;
    cursor: pointer;
      position: relative;

    p{
      font-size: 36rem;

      @media (max-width: 360px) {
        font-size: clamp(0rem, ${36 / 360 * 100}vw, 36rem);
      }
    }

    &.small-text{
      margin-top: 40px;

      p{
        font-size: clamp(16rem, ${20 / 1440 * 100}vw, 20rem);
        line-height: 160%;

        @media (max-width: 864px) {
          font-size: clamp(16rem, ${20 / 768 * 100}vw, 20rem);
        }

        @media (max-width: 360px) {
          font-size: clamp(0rem, ${16 / 360 * 100}vw, 16rem);
        }

        a{
          color: var(--secondary-500);
          text-decoration: underline;
        }
      }
    }
  }

  .box-wrap {
    p{
      line-height: 110%;
    }

    input{
      height: 0;
      width: 0;
      opacity: 0;
      position: absolute;
    }

    input ~ .box{
      margin-top: 4px;
      width: 40px;
      height: 40px;
      background: #FFFFFF;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      position: relative;
      overflow: hidden;

      .left{
        position: absolute;
        left: 2px;
        top: 2px;
        opacity: 0;
        transform: translate(-50%, -50%);
        transition: all .2s ease-out .2s;
      }

      .right{
        position: absolute;
        right: 2px;
        top: 2px;
        opacity: 0;
        transform: translate(50%, -50%);
        transition: all .2s ease-out;
      }
    }

    input:focus-visible ~ .box{
      outline: 2px solid var(--primary-500) ;
      outline-offset: 2px; 
    }

    input:checked ~ .box{
      .left{
        transform: unset;
        opacity: 1;
      }
      .right{
        transform: unset;
        opacity: 1;
      }
    }
  }
`