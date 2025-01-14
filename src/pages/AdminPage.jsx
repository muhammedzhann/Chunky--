import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components";


const AdminPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        productName: "",
        description: "",
        image: "",
        price: "",
        rating: "5",
    });

    // Check user role on page load
    useEffect(() => {
        const userRole = localStorage.getItem("userRole");
        if (userRole !== "admin") {
            alert("You do not have access to this page.");
            navigate("/"); // Redirect to the main page
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "https://674d5c7e635bad45618aebb5.mockapi.io/Example",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                alert("Product successfully saved!");
                setFormData({
                    productName: "",
                    description: "",
                    image: "",
                    price: "",
                    rating: "5",
                });
            } else {
                alert("Error saving the product. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error connecting to the server.");
        }
    };

    return (
        <>
            <Navbar />
            <div
                style={{
                    padding: "20px",
                    backgroundColor: "#fff4e6", // Cream background
                
                }}
            >
                <h1 style={{ textAlign: "center", color: "#d4a373" }}>
                    Add Product
                </h1>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        maxWidth: "800px",
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                        backgroundColor: "#fff",
                        padding: "25px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        border: "1px solid #f0cba7",
                    }}
                >
                    <div>
                        <label
                            htmlFor="productName"
                            style={{ fontWeight: "600", color: "#d4a373" }}
                        >
                            Product Name *
                        </label>
                        <input
                            id="productName"
                            type="text"
                            value={formData.productName}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #f0cba7",
                            }}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="description"
                            style={{ fontWeight: "600", color: "#d4a373" }}
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter product description"
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #d4a373",
                            }}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="image"
                            style={{ fontWeight: "600", color: "#d4a373" }}
                        >
                            Image URL *
                        </label>
                        <input
                            id="image"
                            type="text"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="Enter image URL"
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #f0cba7",
                            }}
                        />
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <div style={{ flex: 1 }}>
                            <label
                                htmlFor="price"
                                style={{ fontWeight: "600", color: "#d4a373" }}
                            >
                                Price *
                            </label>
                            <input
                                id="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Enter product price"
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    borderRadius: "8px",
                                    border: "1px solid #d4a373",
                                }}
                            />
                        </div>

                        <div style={{ flex: 1 }}>
                            <label
                                htmlFor="rating"
                                style={{ fontWeight: "600", color: "#d4a373" }}
                            >
                                Rating *
                            </label>
                            <select
                                id="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    borderRadius: "8px",
                                    border: "1px solid #d4a373",
                                }}
                            >
                                <option value="1">1 star</option>
                                <option value="2">2 stars</option>
                                <option value="3">3 stars</option>
                                <option value="4">4 stars</option>
                                <option value="5">5 stars</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <button
                            type="reset"
                            style={{
                                backgroundColor: "#ccc",
                                padding: "12px 25px",
                                borderRadius: "8px",
                                border: "none",
                                fontWeight: "600",
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{
                                backgroundColor: "#d4a373",
                                color: "#fff",
                                padding: "12px 25px",
                                borderRadius: "8px",
                                border: "none",
                                fontWeight: "600",
                            }}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AdminPage;
