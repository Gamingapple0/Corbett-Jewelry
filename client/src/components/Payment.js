import {loadStripe} from '@stripe/stripe-js';
import { useLocation } from 'react-router';
import "./Payment.css"

const Payment = ()=>{
    const location = useLocation();
    const sesstionData = location.state?.shippingState
    console.log(sesstionData);
    console.log(localStorage.getItem('userEmail'))
    localStorage.setItem('chosenProduct',sesstionData.productDetailItem.title)
    localStorage.setItem('total', sesstionData.shippingPrice + sesstionData.productDetailItem.price)
    localStorage.setItem("shipping", JSON.stringify(sesstionData));
    const makePayment = async()=>{
        const apiUrl = "http://localhost:5000";
        const stripe = await loadStripe("pk_test_51NeC8IBhyB2h88yTEEvfInrNsPzgFShuYa1JCGFkZta5KLknwrgSUXuvigwArN66vkBe8uHgf5TSZfCRXzQP8ch80028jfY56v");
        const body = {
            productName:sesstionData.productDetailItem.title,
            amount: sesstionData.shippingPrice + sesstionData.productDetailItem.price,
            url:"http://localhost:3000"
        }
        const headers = {
            "Content-Type": "application/json"
        }
        const response = await fetch(apiUrl + "/api/payment", {
            method: "POST",
            body: JSON.stringify(body),
            headers: headers})

        const session = await response.json();
        console.log(session);
        const result = stripe.redirectToCheckout({sessionId: session.id})

    }


    return(
        <div>
            <div className='payment-confirmation-wrapper'>
                <img src={sesstionData.productDetailItem.img}></img>
                <h1>{sesstionData.productDetailItem.title}</h1>
                <h2>Product Cost: ${sesstionData.productDetailItem.price}</h2>
                <h3>Shipping Cost: ${sesstionData.shippingPrice}</h3>
                <h3>Shipping To: {sesstionData.formValues.address}, {sesstionData.formValues.state} {sesstionData.formValues.zip}, {sesstionData.formValues.country}</h3>
                <h1>Total Cost: ${sesstionData.shippingPrice + sesstionData.productDetailItem.price}</h1>
                <button class="payment-btn" onClick={makePayment}>Proceed To Payment</button>
            </div>
        </div>
    )
}

export default Payment;