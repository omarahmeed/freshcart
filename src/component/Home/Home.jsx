import React from "react";

import ShowProducts from "../ShowProducts/ShowProducts.jsx";
import MainSlider from "../MainSlider/MainSlider.jsx";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider.jsx";

export default function Home() {
  return (
    <>
      <MainSlider />
      <CategoriesSlider />
      <ShowProducts />
    </>
  );
}
