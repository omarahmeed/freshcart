import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategoriesSlider() {
  var settings = {
    autoplay: true,
    autoplayspeed: 2000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
  };

  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data } = useQuery("categories", getCategories);
  console.log(data);
  return (
    <>
      <Slider className="mb-4" {...settings}>
        {data?.data.data.map((category, index) => (
          <div key={index} className="col-md-2">
            <div className="img">
              <img
                className="w-100"
                height={200}
                src={category.image}
                alt={category.name}
              />
              <p className="fw-bold font-md">{category.name}</p>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
}
