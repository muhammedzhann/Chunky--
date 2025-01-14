import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";
import "../style/Cart.css";

const Cart = () => {
  const state = useSelector((state) => state.handleCart); // Состояние корзины
  const dispatch = useDispatch();

  // Компонент для пустой корзины
  const EmptyCart = () => (
    <div className="empty-cart">
      <h4>Your Cart is Empty</h4>
      <Link to="/" className="btn continue-shopping">
        <i className="fa fa-arrow-left"></i> Continue Shopping
      </Link>
    </div>
  );

  // Увеличение количества товара
  const addItem = (product) => {
    dispatch(addCart(product));
  };

  // Уменьшение количества товара
  const removeItem = (product) => {
    if (product.qty > 1) {
      dispatch(delCart(product));
    }
  };

  // Удаление товара из корзины
  const deleteItem = (product) => {
    dispatch(delCart({ ...product, qty: product.qty })); // Удалить весь товар
  };

  // Функция для безопасного преобразования цены в число
  const getValidPrice = (price) => {
    const validPrice = parseFloat(price);
    return isNaN(validPrice) ? 0 : validPrice; // Если цена не число, вернуть 0
  };

  // Компонент для отображения корзины
  const ShowCart = () => {
    let subtotal = 0;
    let taxRate = 0.15;
    let deliveryFee = 9.0;

    state.forEach((item) => {
      subtotal += getValidPrice(item.price) * item.qty; // Убедитесь, что price - число
    });

    const tax = subtotal * taxRate;
    const total = subtotal + tax + deliveryFee;

    return (
      <div className="cart-container">
        <div className="cart-items">
          {state.map((item) => {
            const price = getValidPrice(item.price); // Преобразуем в число перед использованием

            return (
              <div className="cart-item" key={item.id}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h4>{item.title}</h4>
                  <p>Price: ${price.toFixed(2)}</p>
                  <div className="cart-quantity">
                    <button
                      className="quantity-btn"
                      onClick={() => removeItem(item)}
                      disabled={item.qty <= 1}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <span className="quantity-number">{item.qty}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => addItem(item)}
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                  <p className="cart-item-total">
                    Total: ${(price * item.qty).toFixed(2)}
                  </p>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => deleteItem(item)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <h4>Shopping Cart Summary</h4>
          <p>
            <span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span>
          </p>
          <p>
            <span>Tax (15%):</span> <span>${tax.toFixed(2)}</span>
          </p>
          <p>
            <span>Delivery Fee:</span> <span>${deliveryFee.toFixed(2)}</span>
          </p>
          <p className="total-price">
            <span>Total Price:</span> <span>${total.toFixed(2)}</span>
          </p>
          <Link to="/checkout" className="checkout-btn">
            Go to Checkout
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <h1>Shopping Cart</h1>
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
