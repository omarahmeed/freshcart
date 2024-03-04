import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext.js";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { date } from "yup";

export default function Cart() {
  let { showCartItems,delItem,updateItem } = useContext(CartContext);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  async function displayCartItems() {
    let { data } = await showCartItems();
    setLoading(false);
    setCart(data);
    console.log(data);
  }

  async function displayDelItems(id) {
    setLoading(true)
    let { data } = await delItem  (id);
    setLoading(false);
    setCart(data);
    console.log(data);
  }
  
  async function displayUpdateItems(id,count) {
    if(count<1){
      setLoading(true)
      let { data } = await delItem  (id);
      setLoading(false);
      setCart(data);
      
    }else{
      setLoading(true)
    let { data } = await updateItem(id,count);
    setLoading(false);
    setCart(data);
    console.log(data);
    }
    
  }
  useEffect(() => {
    displayCartItems();
  }, []);
  return (
    <>
      <div className="bg-main-light p-2 mt-5">
        <div className="d-flex justify-content-between mt-5 align-items-center"> 
          <h2 className="fw-bolder">Cart Shop</h2>
           
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
        ) :
        
        cart?
          <>
      
            <div className="row pt-4 justify-content-between align-items-center ">
              <h5 className="w-25 fw-bolder ">
                total price:
                <span className="text-main ">
                  {cart.data.totalCartPrice} EGP
                </span>{" "}
              </h5>
              <h5 className="w-25 fw-bolder">
                total number of items:
                <span className="text-main">{cart.numOfCartItems}</span>{" "}
              </h5>
            </div>
            <Link to={`/shipingadress/${cart.data._id}`}><button className="btn btn-primary p-3 me-5 w-100  rounded-3">check out</button></Link>
            {cart.data.products.map((product,index) => (
              <div key={index} className="row border-bottom p-2 my-3  ">
                <div className="col-md-2">
                  <div>
                    <img
                      className="w-100"
                      src={product.product.imageCover}
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-md-10">
                  <div className=" d-flex justify-content-between align-items-center  h-100">
                  <div className="">
                    <h3 className="h5 fw-bold">{product.product.title.split(" ").splice(0,3).join(" ")}</h3>
                    <h3 className="h6 fw-bold">{product.price} EGP</h3>
                    <button onClick={()=>displayDelItems(product.product.id)} className="btn btn-sm text-danger fw-bold p-0 m-0">
                      <i className="fa fa-trash m-lg-1 "></i>
                      remove</button>
                  </div>
                  <div className="">
                  <button onClick={()=>displayUpdateItems(product.product.id,product.count+1 )} className=" m-2 btn   brdr">+</button>
                  <span  >{product.count}</span>
                  <button onClick={()=>displayUpdateItems(product.product.id,product.count-1 )} className=" m-2  btn brdr">-</button>
                </div>
                </div>
                </div>
                
                
              </div>
              
            ))  }
          </>
          
         :<h2>cart is empty</h2> 
        }
        
      </div>
    </>
  );
}
