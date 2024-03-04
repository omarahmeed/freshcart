import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function Register() {
  const [loading, setloading] = useState(false);
  const [apierr, setapierr] = useState(null);
  let navigate = useNavigate();

  async function registerSubmit(values) {
    setloading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((err) => {
        setapierr(err.response.data.message);
        setloading(false);
      });
    if (data.message === "success") {
      setloading(false);
      navigate("/login");
    }
  }
  let validationSchema = yup.object({
    name: yup
      .string()
      .required("name is required")
      .min(3, "min length is 3")
      .max(10, "max length is 10"),
    email: yup.string().required("email is required").email("invaild email"),
    password: yup
      .string()
      .required("password is required")
      .matches(/^[A-Z][|\w @]{5,8}$/, "invaild password ex:omar4299@ "),
    rePassword: yup
      .string()
      .required("repassword is required")
      .oneOf([yup.ref("password")], "password and repassword dont match"),
    phone: yup
      .string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "we need egyption  number "),
  });
  // function validate(values) {
  //   let errors={};

  //   if(!values.name){
  //     errors.name='name is required'
  //   }else if(values.name.length<3){
  //     errors.name='minimum length is 3'
  //   }else if(values.name.length>10){
  //     errors.name='maximum length is 10'
  //   }

  //   if(!values.password){
  //     errors.password='password is required'
  //   }else if([/^[A-Z][/w @] {5,8} $ /.test(values.password)]){
  //     errors.password='invalid password ex: Omar4299@'
  //   }

  //   return errors;
  // }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  });

  return (
    <>
      <div className="w-75 mx-auto py-4">
        <h2>Register now :</h2>
        <form onSubmit={formik.handleSubmit}>
          {apierr ? <div className="alert alert-danger">{apierr}</div> : ""}

          <label htmlFor="name">name :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            name="name"
            id="name"
            className="form-control mb-3  "
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger py-2">{formik.errors.name}</div>
          ) : null}

          <label htmlFor="name">email :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            name="email"
            id="email"
            className="form-control mb-3  "
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger py-2">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="name">password :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            name="password"
            id="password"
            className="form-control mb-3  "
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger py-2">
              {formik.errors.password}
            </div>
          ) : null}

          <label htmlFor="name">rePassword :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            name="rePassword"
            id="rePassword"
            className="form-control mb-3  "
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger py-2">
              {formik.errors.rePassword}
            </div>
          ) : null}

          <label htmlFor="name">phone :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="tel"
            name="phone"
            id="phone"
            className="form-control mb-3  "
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger py-2">{formik.errors.phone}</div>
          ) : null}

          {loading ? (
            <button type="button" className="btn bg-main text-light">
              <BallTriangle
                height={30}
                width={30}
                radius={5}
                color="white"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-light"
            >
              Register
            </button>
          )}
          <Link className="ps-2" to={"/login"}>
            login Now
          </Link>
        </form>
      </div>
    </>
  );
}
