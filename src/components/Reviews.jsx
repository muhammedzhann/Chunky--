    import React, { useState } from "react";
    import "../style/Reviews.css";

    const Reviews = () => {
    const reviews = [
        {
        id: 1,
        stars: 5,
        text: "I can't get enough of Cookiezo! The chocolate chip cookies are perfectly chewy, with just the right amount of sweetness. They taste homemade but are even better because they're always consistent. Highly recommend for any cookie lover!",
        },
        {
        id: 2,
        stars: 4,
        text: "I love the variety Cookiezo offers—especially their peanut butter and oatmeal raisin flavors. The packaging is also super cute! However, they are a bit on the expensive side. Still worth it for an occasional treat.",
        },
        {
        id: 4,
        stars: 5,
        text: "Cookiezo's cinnamon rolls are heavenly. Fresh, warm, and perfect for breakfast or dessert. I've recommended them to all my friends!",
        },
        {
        id: 5,
        stars: 4,
        text: "Delicious and fresh cookies! My only complaint is the delivery took longer than expected. Otherwise, excellent quality and taste!",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? reviews.length - 3 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
        prevIndex + 3 >= reviews.length ? 0 : prevIndex + 1
        );
    };

    const displayedReviews = reviews.slice(
        currentIndex,
        currentIndex + 3
    );

    return (
        <div className="reviews-container">
        <h2 className="reviews-title">Customer Reviews</h2>
        <p className="reviews-description">
            See what our customers are saying about our products.
        </p>
        <div className="reviews-slider">
            <button className="slider-button prev" onClick={handlePrev}>
            &#8249;
            </button>
            <div className="reviews-cards">
            {displayedReviews.map((review) => (
                <div className="review-card" key={review.id}>
                <div className="review-stars">
                    {"★".repeat(review.stars)}
                    {"☆".repeat(5 - review.stars)}
                </div>
                <p className="review-text">{review.text}</p>
                </div>
            ))}
            </div>
            <button className="slider-button next" onClick={handleNext}>
            &#8250;
            </button>
        </div>
        </div>
    );
    };

    export default Reviews;
