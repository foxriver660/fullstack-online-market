import React, { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components";
import CheckoutSummary from "../../components/checkoutSummary/checkoutSummary";
import { SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS } from "../../redux/slice/checkoutSlice";
import styles from "./CheckoutDetails.module.scss";

const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};

const CheckoutDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));
    navigate("/checkout");
  };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Детали заказа</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <h3>Адрес доставки</h3>
              <label>Имя получателя</label>
              <input
                type="text"
                placeholder="Имя"
                required
                name="name"
                value={shippingAddress.name}
                onChange={(e) => handleShipping(e)}
              />
              <label>Адрес</label>
              <input
                type="text"
                placeholder="Адрес"
                required
                name="line1"
                value={shippingAddress.line1}
                onChange={(e) => handleShipping(e)}
              />
              <label>Город</label>
              <input
                type="text"
                placeholder="Город"
                required
                name="city"
                value={shippingAddress.city}
                onChange={(e) => handleShipping(e)}
              />
              <label>Страна</label>
              <input
                type="text"
                placeholder="Страна"
                required
                name="state"
                value={shippingAddress.state}
                onChange={(e) => handleShipping(e)}
              />
              <label>Почтовый код</label>
              <input
                type="text"
                placeholder="Почтовый код"
                required
                name="postal_code"
                value={shippingAddress.postal_code}
                onChange={(e) => handleShipping(e)}
              />
              {/* COUNTRY INPUT */}
              <CountryDropdown
                className={styles.select}
                valueType="short"
                value={shippingAddress.country}
                onChange={(val) =>
                  handleShipping({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />
              <label>Телефон</label>
              <input
                type="text"
                placeholder="Телефон"
                required
                name="phone"
                value={shippingAddress.phone}
                onChange={(e) => handleShipping(e)}
              />
            </Card>
            {/* BILLING ADDRESS */}
            <Card cardClass={styles.card}>
              <h3>Адрес для выставления счета</h3>
              <label>Имя получателя</label>
              <input
                type="text"
                placeholder="Имя"
                required
                name="name"
                value={billingAddress.name}
                onChange={(e) => handleBilling(e)}
              />
              <label>Адрес</label>
              <input
                type="text"
                placeholder="Адрес"
                required
                name="line1"
                value={billingAddress.line1}
                onChange={(e) => handleBilling(e)}
              />

              <label>Город</label>
              <input
                type="text"
                placeholder="Город"
                required
                name="city"
                value={billingAddress.city}
                onChange={(e) => handleBilling(e)}
              />
              <label>Страна</label>
              <input
                type="text"
                placeholder="Страна"
                required
                name="state"
                value={billingAddress.state}
                onChange={(e) => handleBilling(e)}
              />
              <label>Почтовый код</label>
              <input
                type="text"
                placeholder="Почтовый код"
                required
                name="postal_code"
                value={billingAddress.postal_code}
                onChange={(e) => handleBilling(e)}
              />
              {/* COUNTRY INPUT */}
              <CountryDropdown
                className={styles.select}
                valueType="short"
                value={billingAddress.country}
                onChange={(val) =>
                  handleBilling({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />
              <label>Телефон</label>
              <input
                type="text"
                placeholder="Телефон"
                required
                name="phone"
                value={billingAddress.phone}
                onChange={(e) => handleBilling(e)}
              />
              <button type="submit" className="--btn --btn-primary">
                Перейти к оформлению заказа
              </button>
            </Card>
          </div>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
