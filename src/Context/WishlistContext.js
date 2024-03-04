import axios from "axios";
import { createContext } from "react";

export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {
  function addToWishList(id) {
    return axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId: id },
      {
        headers: { token: localStorage.getItem("usertokern") },
      }
    );
  }

  function showWishListItems() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: { token: localStorage.getItem("usertokern") },
    });
  }

  function delItems(productId) {
    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        headers: { token: localStorage.getItem("usertokern") },
      }
    );
  }

  return (
    <>
      <WishlistContext.Provider
        value={{ addToWishList, delItems, showWishListItems }}
      >
        {props.children}
      </WishlistContext.Provider>
    </>
  );
}
