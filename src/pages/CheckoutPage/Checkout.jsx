import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  selectCardItems,
  selectCardTotalAmount,
} from "../../redux/slice/cardSlice";
import { selectEmail } from "../../redux/slice/authSlice";
import { selectBillingAddress, selectShippingAddress } from "../../redux/slice/checkoutSlice";
import { toast } from "react-toastify";
import CheckoutForm from "../../components/checkoutForm/checkoutForm";
const stripePromise = loadStripe(
  "pk_test_51NM66TFAmsoQbm5g2ssPllrqBlAAZmk6MOQco9hkX6CEfFDBLtgyIL3Kg8AVsI2mTtpPPY2dj9YrBG1VVtVgghsY001cZe3REq"
);

const Checkout = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("Initializing checkout");
  const [clientSecret, setClientSecret] = useState("");

  const cardItems = useSelector(selectCardItems);
  const totalAmount = useSelector(selectCardTotalAmount);
  const customerEmail = useSelector(selectEmail);

  const shippingAddress = useSelector(selectShippingAddress);
  const billingAddress = useSelector(selectBillingAddress);

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cardItems]);
  const description = `eShop payment: email: ${customerEmail}, Amount: ${totalAmount}`;
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cardItems,
        userEmail: customerEmail,
        shipping: shippingAddress,
        billing: billingAddress,
        description,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        setMessage("Failed to initialize checkout");
        toast.error("Something went wrong!!!");
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <section>
        <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
      </section>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Checkout;
