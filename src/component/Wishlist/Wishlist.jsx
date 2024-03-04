import React, { useContext, useEffect, useState } from "react";

import { BallTriangle } from "react-loader-spinner";
import { WishlistContext } from "../../Context/WishlistContext.js";

export default function Wishlist() {
  let { showWishListItems, delItems } = useContext(WishlistContext);
  const [wishList, setWishList] = useState(null);
  const [loading, setLoading] = useState(true);

  async function displayWishListItems() {
    let { data } = await showWishListItems();
    setLoading(false);
    setWishList(data.data);
    console.log(data.status);
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

  return (
    <>
      <div className="bg-main-light p-2 mt-5">
        <div className="d-flex justify-content-between mt-5 align-items-center">
          <h2 className="fw-bolder">My wish List</h2>
          <button className="btn btn-primary p-3 me-5  rounded-3">
            check out
          </button>
        </div>

        {loading ? (
          <>
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
          </>
        ) : (
          <>
            <div className="row pt-4 justify-content-between align-items-center"></div>

            {wishList.map((product) => (
              <div key={product.id} className="row border-bottom p-2 my-3  ">
                <div className="col-md-2">
                  <div>
                    <img className="w-100" src={product.imageCover} alt="" />
                  </div>
                </div>
                <div className="col-md-10">
                  <div className=" d-flex justify-content-between align-items-center  h-100">
                    <div className="">
                      <h3 className="h5 fw-bold">
                        {product.title.split(" ").splice(0, 3).join(" ")}
                      </h3>
                      <h3 className="h6 fw-bold">{product.price} EGP</h3>
                      <button
                        onClick={() => displayDelItems(product.id)}
                        className="btn btn-sm text-danger fw-bold p-0 m-0"
                      >
                        <i className="fa fa-trash m-lg-1 "></i>
                        remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
