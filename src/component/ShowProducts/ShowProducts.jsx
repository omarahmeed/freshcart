import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { CartContext } from "../../Context/CartContext.js";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WishlistContext.js";

export default function ShowProducts() {
  const { addToCart } = useContext(CartContext);
  const { addToWishList, showWishListItems, delItems } =
    useContext(WishlistContext);
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  async function postToCart(id) {
    let { data } = await addToCart(id);

    if (data.status === "success")
      toast(data.message, {
        duration: 4000,
        position: "top-right",
        style: { height: 80 },
        className: "bg-main text-white",
        icon: "👏",
        iconTheme: { primary: "#000", secondary: "#fff" },
      });
  }

  async function postToWishList(id) {
    let { data } = await addToWishList(id);

    if (data.status === "success") {
      toast(data.message, {
        duration: 4000,
        position: "top-right",
        style: { height: 80 },
        className: "bg-main text-white",
        icon: "👏",
        iconTheme: { primary: "#000", secondary: "#fff" },
      });

      // Refresh wishlist
      displayWishListItems();
    }
  }

  async function displayWishListItems() {
    setLoading(true);
    let { data } = await showWishListItems();
    setLoading(false);
    setWishList(data.data);
  }

  async function displayDelItems(id) {
    setLoading(true);
    try {
      const { data } = await delItems(id);
      if (data.status === "success") {
        setWishList((prevState) => prevState.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    displayWishListItems();
  }, []);

  const isInWishlist = (id) => {
    return wishList.some((item) => item.id === id);
  };

  const { data, isLoading } = useQuery("ShowProducts", getProducts);

  return (
    <>
      {isLoading ? (
        <div className="">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass="text-main d-flex justify-content-center align-items-center vh-100"
            visible={true}
          />
        </div>
      ) : (
        <div className="row gy-2">
          {data?.data.data.map((product, index) => (
            <div key={index} className="col-lg-3">
              <div className="product p-2">
                <Link to={`/productdetails/${product.id}`}>
                  <img
                    className="w-100"
                    src={product.imageCover}
                    alt={product.title}
                  />
                  <span className="font-sm text-main">
                    {product.category.name}
                  </span>
                  <h3 className="h5">
                    {product.title.split(" ").splice(0, 2).join(" ")}
                  </h3>
                  <div className="d-flex py-3  justify-content-between align-items-center ">
                    <span className="font-sm">{product.price} EGP</span>
                    <span className="font-sm">
                      <i className="fas fa-star rating-color me-1"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => postToCart(product.id)}
                  className="btn bg-main w-100"
                >
                  Add To Cart
                </button>

                <i
                  onClick={() => postToWishList(product.id)}
                  className={`fa-solid fa-heart font-md cursor-pointer ${
                    isInWishlist(product.id) ? "text-danger" : ""
                  }`}
                ></i>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
