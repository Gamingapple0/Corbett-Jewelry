import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import "./Shipping.css";

const Shipping = () => {
  const [formValues, setFormValues] = useState({
    fullName: '',
    address: '',
    zipCode: '',
    country: '',
    state: '',
    correctInfoConfirmation: false
  });

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = React.useState(null)
    const [shippingValidated, setShippingValidated] = useState(false);
    const [shippingPrice, setShippingPrice] = useState(0);

    const location = useLocation();
    const productDetailItem = location.state?.productDetailItem;
    console.log(productDetailItem)


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormValues({ ...formValues, [name]: checked });
  };


  const handleSubmit = () => {
    const apiUrl = "http://localhost:8081";
    const fetchData = async () => {
      const { fullName, address, zip, country, state } = formValues;

      // Encode each part of the address
      const encodedFullName = encodeURIComponent(fullName);
      const encodedAddress = encodeURIComponent(address);
      const encodedZip = encodeURIComponent(zip);
      const encodedCountry = encodeURIComponent(country);
      const encodedState = encodeURIComponent(state);
    
      // Concatenate the encoded parts with '/'
      const queryString = `?name=${encodedFullName}&address=${encodedAddress}&zipCode=${encodedZip}&country=${encodedCountry}&state=${encodedState}`;
    
      // Log the complete API URL
      console.log(apiUrl + "/api/shipping" + queryString);
      var response = await fetch(apiUrl + "/api/shipping" + queryString); 
      const res = await response.json();
      if(response.status === 200){
        setShippingPrice(res.price);
        setShippingValidated(true);
        const shippingState = {formValues, shippingPrice: res.price, shippingValidated: true, productDetailItem: productDetailItem}
        navigate("/payment", { state: { shippingState } })
      }
      else{
        console.log(response.status);
        console.log(res.message)
        setErrorMessage(res.message)
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      }
      console.log(res);
      }
      
  fetchData();
    
  };

  useEffect(() => {
    const { fullName, address, zip, country, state } = formValues;
    const totalEmptyInputs = [fullName, address, zip, country, state].filter(
      (value) => !value
    ).length;

  }, [formValues]);

  useEffect(() => {
    const { correctInfoConfirmation } = formValues;
  }, [formValues.correctInfoConfirmation]);



  return (
    <article className="m-checkout">
              {errorMessage &&<div className="password-error">
            Error: {errorMessage}
        </div>}
      <div className="m-checkout__form" id="checkout_form">
        <fieldset>
          <input
            id="full_name"
            type="text"
            placeholder="Bruce Wayne"
            required
            autoFocus
            pattern="^[A-Z][a-zA-Z ]+"
            name="fullName"
            value={formValues.fullName}
            onChange={handleInputChange}
          />
          <label className="is-valid" htmlFor="full_name">
            Full Name
          </label>
          <input
            id="address"
            type="text"
            placeholder="Wayne Manor 145"
            required
            pattern="^[A-Z|0-9][a-zA-Z0-9 ]+"
            name="address"
            value={formValues.address}
            onChange={handleInputChange}
          />
          <label htmlFor="address">Address</label>
          <input
            id="zip"
            type="text"
            placeholder="3000"
            required
            pattern="^\d{4}$"
            name="zip"
            value={formValues.zip}
            onChange={handleInputChange}
          />
          <label htmlFor="zip">Zip Code</label>
          <input
            id="country"
            type="text"
            placeholder="United States of America"
            required
            pattern="^[A-Z][a-zA-Z ]+"
            name="country"
            value={formValues.country}
            onChange={handleInputChange}
          />
          <label htmlFor="country">Country</label>
          <input
            id="state"
            type="text"
            placeholder="Wisconsin"
            required
            pattern="^[A-Z][a-zA-Z ]+"
            name="state"
            value={formValues.state}
            onChange={handleInputChange}
          />
          <label htmlFor="state">State</label>
          <div className="checkbox">
            <label htmlFor="correct_info_confirmation">
              Yes, the information I've entered is correct
            </label>
            <input
              id="correct_info_confirmation"
              type="checkbox"
              required
              name="correctInfoConfirmation"
              checked={formValues.correctInfoConfirmation}
              onChange={handleCheckboxChange}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="btn btn--block btn--rounded btn--success js-ship-the-products"
            disabled={!formValues.correctInfoConfirmation}
          >
            Ship my products
          </button>
        </fieldset>
      </div>
    </article>
  );
};

export default Shipping;