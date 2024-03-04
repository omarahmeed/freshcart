import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { BallTriangle } from 'react-loader-spinner';

export default function Brands() {
 
function getBrands(){

  return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
}
let{data ,isLoading}=  useQuery('allcategories',getBrands)
console.log(data?.data.data)

  return <>
  {isLoading?<><div className=''>
     <BallTriangle
                height={100}
                width={100}
                radius={5}
           
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass="text-main d-flex justify-content-center align-items-center vh-100"
                visible={true}
              />
    </div></>:
  
<div className="row gy-4 mt-4 ">
{data?.data.data.map(brand=>   <div key={brand.id} className='col-md-3 '>
<div className='product rounded-1 cover'>
  <div>
    <img className='img-fluid w-100  rounded-1 ' src={brand.image} alt={brand.name} />
  </div>
  <div className='' >
    <p className='font-large   text-center' >{brand.name}</p>
  </div>
  </div>

</div>)}
</div>
  

  
  
  
  
  
  
}</>
}
