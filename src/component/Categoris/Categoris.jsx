import axios from 'axios'
import React from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { useQuery } from 'react-query'

export default function Categoris() {


  function getAllCategoris(){

    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }
  let{data,isLoading}=  useQuery('allcategories',getAllCategoris)
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
  {data?.data.data.map(category=>   <div key={category.id} className='col-md-4 '>
  <div  className='product rounded-1 cover'>
    <div>
      <img className='img-fluid w-100 height-sm rounded-1 ratio ratio-4x3' src={category.image} alt={category.name} />
    </div>
    <div className='' >
      <p className='font-large fw-bold text-main text-center' >{category.name}</p>
    </div>
    </div>
  
  </div>)}
  </div>
    
  
    
    
    
    
    
}
    </>
}
