import React from 'react'
import slide1 from "../../Assets/images/slider-image-1.jpeg"
import slide2 from "../../Assets/images/slider-image-2.jpeg"
import slide3 from "../../Assets/images/slider-image-3.jpeg"
import slide4 from "../../Assets/images/slide2.jpg"
import slide5 from "../../Assets/images/slidee4.jpg"
import Slider from "react-slick";

export default function MainSlider() {
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
  return <>
  
  <div className="row py-3 gx-0">

<div className="col-md-9">
  
<Slider {...settings}>
<img src={slide1} height={400} className='w-100' alt="slide1" />
<img src={slide2}height={400} className='w-100' alt="slide2" />
<img src={slide3}height={400} className='w-100' alt="slide3" />

</Slider>
</div>
<div className="col-md-3">
    <div>
        <img src={slide4} className='w-100' height={200} alt="" />
        <img src={slide5} className='w-100'height={200} alt="" />
    </div>
</div>

  </div>
  
  </>
}
