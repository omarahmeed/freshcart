import { useFormik } from "formik";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext.js";

export default function ShipingAdress() {
  let { cartId } = useParams();
  let { checkOutSession } = useContext(CartContext);

  async function checkOut(values) {
    let { data } = await checkOutSession(cartId, values);
    if (data.status === "success") {
      window.location.href = data.session.url;
    }
    console.log(data);
  }
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: checkOut,
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="py-5 w-75 mx-auto    ">
        <label htmlFor="details">details</label>
        <input
          onChange={formik.handleChange}
          className="form-control mb-3"
          type="text"
          id="details"
          name="details"
        />
        <label htmlFor="phone">phone</label>
        <input
          onChange={formik.handleChange}
          className="form-control mb-3"
          type="tel"
          id="phone"
          name="phone"
        />
        <label htmlFor="city">city</label>
        <input
          onChange={formik.handleChange}
          className="form-control mb-3"
          type="text"
          id="city"
          name="city"
        />

        <button
          type="submit"
          className="btn text-info btn-outline-info h   w-100"
        >
          pay now
        </button>
      </form>
    </>
  );
}
