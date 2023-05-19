import Book1Img from './img/book1.png';
import Book2Img from './img/book2.jpg';
import { useEffect } from 'react';

export default function Card() {

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    useEffect(() => {
        loadScript("https://checkout.razorpay.com/v1/checkout.js");
    });


    function makePayment(e, price, book_name) {

        e.preventDefault();


        let formData = new FormData();
        formData.append('price', price);
        formData.append('product_name', book_name);

        async function paymentGateway() {
            const url = 'http://127.0.0.1:8000/payment/new-order'
            const res = await fetch(url, {
                method: 'POST', body: formData,
            })
            const jsonRes = await res.json()
            return jsonRes
        }

        paymentGateway().then((res) => {

            var options = {
                "key": res['razorpay_key'],
                "amount": res['order']['amount'],
                "currency": res['order']['currency'],
                "callback_url": res['callback_url'],
                prefill: {
                    "email": "xzy@gmail.com",
                    "contact": "1234567890"
                },
                "name": res['product_name'],
                "order_id": res['order']['id'],
            };

            var rzp1 = new window.Razorpay(options);
            rzp1.open();
        })

    }


    return (
        <>
            <section>
                <div>
                    <h2>Educated</h2>
                    <img className='w-48' src={Book1Img} alt="" height={200} />
                    <p >Price : ₹ 15000</p>
                    <button type='button'
                        onClick={e => { makePayment(e, 15000, "Educated") }}
                    >Proceed to Buy</button>
                </div>
                <div>
                    <h2 >Atomic Habit</h2>
                    <img className='w-48' src={Book2Img} alt="" />
                    <p >Price : ₹ 20000</p>
                    <button
                        onClick={e => { makePayment(e, 20000, "Atomic Habit") }}
                    >Proceed to Buy</button>
                </div>
            </section>
        </>
    )

}
