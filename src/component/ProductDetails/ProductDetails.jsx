import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext.js';
import Slider from "react-slick";
import toast from 'react-hot-toast';
export default function ProductDetails() {
    var settings = {
        autoplay:true,
        autoplayspeed:2000,
        dots: false,  
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
      };
const [productsDetails, setProductsDetails] = useState({});
let {id}=useParams()
const [loading, setLoading] = useState(true);

async function getProductsDetails(){

let{data} = await  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)

setLoading(false)
setProductsDetails(data.data)
}
useEffect(()=>{getProductsDetails()},[])
let{addToCart}=useContext(CartContext)
async function postToCart(id){
  
  let{data}= await addToCart(id)
 
  if(data.status==="success")
  toast(data.message, {
   duration: 4000,
   position: 'top-right',
 
   // Styling
   style: {height:80},
   className: 'bg-main text-white',
 
   // Custom Icon
   icon: '👏',
 
 
   // Change colors of success/error/loading icon
   iconTheme: {
     primary: '#000',
     secondary: '#fff',
   },
 
   // Aria
  
 });
 }


  return <>{loading?<><div className=''>
  <BallTriangle
             height={100}
             width={100}
             radius={5}
        
             ariaLabel="ball-triangle-loading"
             wrapperStyle={{}}
             wrapperClass="text-main d-flex justify-content-center align-items-center vh-100"
             visible={true}
           />
 </div></>:<>
 <div className="row align-items-center">
   <div className="col-md-4">
   <Slider {...settings}>
      
       {productsDetails.images.map(image=><img className='w-100' src={image} alt={productsDetails.title} key={productsDetails.id}/>)}
    </Slider>
  

   </div>
   <div className="col-md-8">
    <h3 className='h5'>{productsDetails.title}</h3>
<p className='h6 py-3'>{productsDetails.description}</p>
<span className='font-sm text-main'>{productsDetails.category.name} </span>
<div className='d-flex py-3  justify-content-between align-items-center '>
            <span className='font-sm'>{productsDetails.price} EGP</span>
            <span className='font-sm'>
                <i className='fas fa-star rating-color me-1'></i>
                {productsDetails.ratingsAverage}</span>
        </div>
        <button onClick={()=>postToCart(productsDetails.id)} className='btn bg-main w-100 text-white'>Add To Cart</button>
   </div>
 </div>
 </>}</>
}
