import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Navbar, Footer } from "../components";
import "../style/ProductPage.css";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  // Получение данных с API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://674d5c7e635bad45618aebb5.mockapi.io/Example/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error("Error fetching product:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="product-container">
        <div className="product-content">
          <div className="product-image">
            <img src={product.image} alt={product.productName} />
          </div>
          <div className="product-info">
            <h1 className="product-title">{product.productName}</h1>
            <div className="product-rating">
              {[...Array(5)].map((_, index) => (
                <i
                  key={index}
                  className={`fa fa-star ${
                    index < product.rating ? "active" : ""
                  }`}
                ></i>
              ))}
            </div>
            <h3 className="product-price">${product.price}</h3>
            <p className="product-description">{product.description}</p>
            <div className="product-buttons">
              <Link to="/cart" className="btn btn-go-to-cart">
                <i className="fa fa-shopping-cart"></i>
                Go to Cart
              </Link>
              <button
                className="btn btn-add-to-cart"
                onClick={() => addProduct(product)}
              >
                <i className="fa fa-plus"></i>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
