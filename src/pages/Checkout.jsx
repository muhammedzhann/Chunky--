import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style/Checkout.css";


const Checkout = () => {
  const state = useSelector((state) => state.handleCart);

  const [formData, setFormData] = useState({
    address: "",
    country: "",
    state: "",
    postalCode: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
  });

  // Функция для отображения пустой корзины
  const EmptyCart = () => (
    <div className="empty-cart-container">
      <h4>No items in the Cart</h4>
      <Link to="/" className="btn continue-shopping-btn">
        <i className="fa fa-arrow-left"></i> Continue Shopping
      </Link>
    </div>
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Маскировка номера карты
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Удаляем все нецифровые символы
    if (value.length <= 16) {
      value = value.replace(/(\d{4})(?=\d)/g, "$1 "); // Добавляем пробелы каждые 4 цифры
    }
    setFormData((prevData) => ({
      ...prevData,
      cardNumber: value,
    }));
  };

  // Маскировка даты истечения
  const handleExpirationChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Убираем все нецифровые символы
    if (value.length <= 4) {
      value = value.replace(/(\d{2})(?=\d)/g, "$1/"); // Добавляем "/" после месяца
    }
    setFormData((prevData) => ({
      ...prevData,
      expiration: value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    let subtotal = 0;
    const DeliveryFee = 9.0;
    const taxRate = 0.15;

    state.forEach((item) => {
      subtotal += item.price * item.qty;
    });

    const tax = subtotal * taxRate;
    const totalAmount = (subtotal + DeliveryFee + tax).toFixed(2);

    const orderData = {
      OrderID: Math.floor(Math.random() * 100000),
      Products: state.map((item) => `${item.title} x ${item.qty}`).join(", "),
      TotalAmount: totalAmount,
      Address: formData.address,
      Country: formData.country,
      State: formData.state,
      PostalCode: formData.postalCode,
      PaymentMethod: "Card",
    };

    try {
      const sheetApiUrl =
        "https://v1.nocodeapi.com/muha_17/google_sheets/AMxhCLuKcIMQURsl?tabId=Orders";

      // Логирование данных для проверки
      console.log("Order Data to be sent:", [
        [
          orderData.OrderID,
          orderData.Products,
          orderData.TotalAmount,
          orderData.Address,
          orderData.Country,
          orderData.State,
          orderData.PostalCode,
          orderData.PaymentMethod,
        ],
      ]);

      const response = await axios.post(sheetApiUrl, {
        data: [
          [
            orderData.OrderID,
            orderData.Products,
            orderData.TotalAmount,
            orderData.Address,
            orderData.Country,
            orderData.State,
            orderData.PostalCode,
            orderData.PaymentMethod,
          ],
        ],
      });

      if (response.status === 200) {
        alert("Order placed successfully and saved to Google Sheets!");
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message);
      alert("An error occurred while placing the order. Please try again.");
    }
  };

  const ShowCheckout = () => {
    let subtotal = 0;
    const DeliveryFee = 9.0;
    const taxRate = 0.15;

    const totalItems = state.reduce((total, item) => total + item.qty, 0);

    state.forEach((item) => {
      subtotal += item.price * item.qty;
    });

    const tax = subtotal * taxRate;
    const totalAmount = (subtotal + DeliveryFee + tax).toFixed(2);

    return (
      <div className="checkout-container">
        <div className="checkout-summary">
          <h4 className="summary-title">Order Summary</h4>
          <ul className="summary-details">
            <li>
              <span>Products ({totalItems}):</span>
              <span>$ {subtotal.toFixed(2)}</span>
            </li>
            <li>
              <span>Delivery Fee:</span>
              <span>$ {DeliveryFee.toFixed(2)}</span>
            </li>
            <li>
              <span>Tax (15%):</span>
              <span>$ {tax.toFixed(2)}</span>
            </li>
            <li className="summary-total">
              <span>Total Amount:</span>
              <span>$ {totalAmount}</span>
            </li>
          </ul>
        </div>

        <div className="billing-details">
          <form className="billing-form" onSubmit={handlePlaceOrder}>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                placeholder="123 Main Street"
                value={formData.address} // Привязываем значение из состояния
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Country</label>
                <select
                  name="country"
                  value={formData.country} // Привязываем значение из состояния
                  required
                  onChange={handleInputChange}
                >
                  <option value="">Choose...</option>
                  <option>Kazakhstan</option>
                </select>
              </div>
              <div className="form-group">
                <label>State</label>
                <select
                  name="state"
                  value={formData.state} // Привязываем значение из состояния
                  required
                  onChange={handleInputChange}
                >
                  <option value="">Choose...</option>
                  <option>Taraz</option>
                  <option>Astana</option>
                  <option>Almaty</option>
                </select>
              </div>
              <div className="form-group">
                <label>Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="01001"
                  value={formData.postalCode} // Привязываем значение из состояния
                  required
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <hr />
            <h4>Payment</h4>
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="number"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber} // Привязываем значение из состояния
                required
                onChange={handleCardNumberChange} // Используем новую функцию обработки
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiration</label>
                <input
                  type="number"
                  name="expiration"
                  placeholder="MM/YY"
                  value={formData.expiration} // Привязываем значение из состояния
                  required
                  onChange={handleExpirationChange} // Используем новую функцию обработки
                />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input
                  type="number"
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv} // Привязываем значение из состояния
                  required
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button type="submit" className="submit-btn">
              Place Order
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="checkout-page">
        <h1 className="checkout-title">Checkout</h1>
        {state.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
