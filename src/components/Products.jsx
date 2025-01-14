import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Обновление количества товаров на странице при изменении размера окна
  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth <= 768 ? 1 : 3);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  // Получение данных с API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://674d5c7e635bad45618aebb5.mockapi.io/Example");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Error fetching products:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Обработчики кнопок для навигации по товарам
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - itemsPerPage;
      return newIndex < 0 ? 0 : newIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, products.length - itemsPerPage)
    );
  };

  return (
    <div id="products" className="products-container">
      <h2 className="products-title">Our Products</h2>
      <p className="products-description">
        Browse through our collection of {products.length} unique items!
      </p>
      <div className="products-slider">
        {/* Previous Button */}
        <button
          className={`slider-button prev ${currentIndex === 0 ? "disabled" : ""}`}
          onClick={handlePrev}
          disabled={currentIndex <= 0}
        >
          &#8249;
        </button>

        {/* Product Cards */}
        <div className="products-content">
          {products
            .slice(currentIndex, currentIndex + itemsPerPage)
            .map((product) => (
              <div className="product-card" key={product.id}>
                <img
                  src={product.image}
                  alt={product.productName}
                  className="product-image"
                />
                <div className="product-details">
                  <h3 className="product-title">{product.productName}</h3>
                  <p className="product-price">$ {product.price}</p>
                </div>
                <div className="product-actions">
                  <Link
                    to={`/product/${product.id}`}
                    className="btn btn-view-details"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
        </div>

        {/* Next Button */}
        <button
          className="slider-button next"
          onClick={handleNext}
          disabled={currentIndex + itemsPerPage >= products.length}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Products;
