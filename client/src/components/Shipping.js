import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import "./Shipping.css";

const Shipping = () => {
  const [formValues, setFormValues] = useState({
    fullName: '',
    address: '',
    city: '',
    country: '',
    state: '',
    correctInfoConfirmation: false
  });

const location = useLocation();
const productDetailItem = location.state?.productDetailItem;
console.log(productDetailItem)


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);

    setFormValues({ ...formValues, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormValues({ ...formValues, [name]: checked });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  useEffect(() => {
    const { fullName, address, city, country, state } = formValues;
    const totalEmptyInputs = [fullName, address, city, country, state].filter(
      (value) => !value
    ).length;

  }, [formValues]);

  useEffect(() => {
    const { correctInfoConfirmation } = formValues;
  }, [formValues.correctInfoConfirmation]);

  return (
    <article className="m-checkout">
      <form className="m-checkout__form" id="checkout_form" onSubmit={handleSubmit}>
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
            id="city"
            type="text"
            placeholder="Gotham City"
            required
            pattern="^[A-Z][a-zA-Z ]+"
            name="city"
            value={formValues.city}
            onChange={handleInputChange}
          />
          <label htmlFor="city">City</label>
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
            className="btn btn--block btn--rounded btn--success js-ship-the-products"
            disabled={!formValues.correctInfoConfirmation}
          >
            Ship my products
          </button>
        </fieldset>
      </form>
    </article>
  );
};

export default Shipping;