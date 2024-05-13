import { useEffect, memo } from "react";
import "./Payment.css"

const Success = () => {

    const apiUrl = 'http://localhost:3001';
    console.log(localStorage.getItem("shipping"));
    const shippingInfo = JSON.parse(localStorage.getItem("shipping"));

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + '/api/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            to: localStorage.getItem("userEmail"),
            subject: 'Order Confirmed: ' + localStorage.getItem("chosenProduct"),
            text: `Thanyou for buying" + ${localStorage.getItem("chosenProduct")} + " from us! \n Total:  ${localStorage.getItem("total")}`,
            shipping: shippingInfo,
            item: localStorage.getItem("chosenProduct"),
          })
        });
  
        if (response.ok) {
          console.log('Email sent successfully');
        } else {
          console.error('Error sending email');
        }
      } catch (error) {
        console.error('Error sending email:', error);
      }
    };      



    return (
        <div className="success-container">
            <h1>Success!!</h1>
            <button onClick={fetchData}className="success-button">Get Email!</button>
        </div>
    )
}

export default memo(Success);