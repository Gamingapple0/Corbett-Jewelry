
import "./Payment.css"
import { useNavigate } from "react-router";

const Success = () => {

    const navigate = useNavigate();

    const apiUrl = 'https://us-central1-corbett-jewelry.cloudfunctions.net/order';
    console.log(localStorage.getItem("shipping"));
    const shippingInfo = JSON.parse(localStorage.getItem("shipping"));

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + '/api', {
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
          navigate("/products")
        } else {
          console.error('Error sending email');
        }
      } catch (error) {
        console.error('Error sending email:', error);
      }
    };      



    return (
        <div className="success-container">
            <h1>Payment Confimred</h1>
            <button onClick={fetchData}className="success-button">Finalize Order!</button>
        </div>
    )
}

export default Success;