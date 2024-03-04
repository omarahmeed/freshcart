import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserContext } from "./../../Context/UserContext";
import { useContext } from "react";

export default function Login() {
  const [loading, setloading] = useState(false);
  const [apierr, setapierr] = useState(null);
  let navigate = useNavigate();

  let { setUserToken } = useContext(UserContext);

  async function loginSubmit(values) {
    setloading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((err) => {
        setapierr(err.response.data.message);
        setloading(false);
      });

    if (data.message === "success") {
      setloading(false);
      localStorage.setItem("usertokern", data.token);
      setUserToken(data.token);

      navigate("/");
    }
  }

  let validationSchema = yup.object({
    email: yup.string().required("email is required").email("email is invaild"),
    password: yup
      .string()
      .required("password is required")
      .matches(/^[A-Z][|\w @]{5,8}$/, "invaild password "),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginSubmit,
  });

  return (
    <>
      <div className="w-75 py-4 mx-auto">
        <h2>LOGIN NOW</h2>

        <form onSubmit={formik.handleSubmit}>
          {apierr ? <div className="alert alert-danger">{apierr}</div> : ""}

          <label htmlFor="email">email :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="form-control mb-3"
            type="text"
            name="email"
            id="email"
          />
          {formik.errors.email && formik.touched ? (
            <div className="alert alert-danger ">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="password">password :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="form-control mb-3"
            type="text"
            name="password"
            id="password"
          />
          {formik.errors.password && formik.touched ? (
            <div className="alert alert-danger ">{formik.errors.password}</div>
          ) : null}
          {loading ? (
            <button type="button" className="btn bg-main text-light">
              <BallTriangle
                visible={true}
                wrapperClass=""
                wrapperStyle={{}}
                ariaLabel="ball-triangle-loading"
                color="white"
                height={30}
                width={30}
                radius={5}
              />{" "}
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              className="btn bg-main text-light"
              type="submit"
            >
              {" "}
              Register{" "}
            </button>
          )}
          <Link className="ps-2" to={"/register"}>
            Register Now
          </Link>
        </form>
      </div>
    </>
  );
}
