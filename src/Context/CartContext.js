import axios from "axios";
import { createContext } from "react";

export let CartContext=createContext()
export default function CartContextProvider(props) {  


    function checkOutSession(cartId,shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        shippingAddress,
        {
            headers:{token:localStorage.getItem("usertokern")}
        })
        .then((response)=>response)
        .catch((err)=>err)
    
    }
function addToCart(id) {
    return axios.post("https://ecommerce.routemisr.com/api/v1/cart",
    {productId:id},
    {
        headers:{token:localStorage.getItem("usertokern")}
    })
    .then((response)=>response)
    .catch((err)=>err)

}
function showCartItems(id) {
    return axios.get("https://ecommerce.routemisr.com/api/v1/cart",
  
    {
        headers:{token:localStorage.getItem("usertokern")}
    })
    .then((response)=>response)
    .catch((err)=>err)
}
function delItem(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
  
    {
        headers:{token:localStorage.getItem("usertokern")}
    })
    .then((response)=>response)
    .catch((err)=>err)
}
function updateItem(productId,count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
count:count
    },
  
    {
        headers:{token:localStorage.getItem("usertokern")}
    })
    .then((response)=>response)
    .catch((err)=>err)
}
    return<>
    <CartContext.Provider value={{addToCart,showCartItems,delItem,updateItem,checkOutSession}}>
        {props.children  }
          </CartContext.Provider>
    </>

}
