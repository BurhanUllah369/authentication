import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_ENDPOINTS } from "../api/api";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [errMessage, setErrorMessage] = useState("");
  const [showErrMessage, setShowErrMessage] = useState(false);
  const navigate = useNavigate();

  // if already logged in then no access to login page
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate('/'); 
    }
  }, [navigate]);

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await axios.post(API_ENDPOINTS.LOGIN, {
        email: values.email,
        password: values.password,
      });

      const accessToken = response.data.token.access;
      localStorage.setItem('accessToken', accessToken);
      navigate("/");

    } catch (error) {
      setErrorMessage(JSON.parse(error.request.response).message);
      setShowErrMessage(true);
      setTimeout(() => {
        setShowErrMessage(false);
      }, 2000);
      resetForm();
      setSubmitting(false);
    }
  };

  return (
    <div className="p-12 pb-24">
      <h1 className="text-3xl text-center font-bold mb-8">Login</h1>
      {showErrMessage ? (
        <p className="text-red-600 mb-4">{errMessage}</p>
      ) : null}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex flex-col items-center gap-4">
            <Field
              className={`w-full outline-none border-2 border-gray-200 p-2 ${
                errors.email && touched.email ? "border-red-500" : ""
              }`}
              type="email"
              name="email"
              placeholder="Email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />

            <Field
              className={`w-full outline-none border-2 border-gray-200 p-2 ${
                errors.password && touched.password ? "border-red-500" : ""
              }`}
              type="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />
            <button
              className="bg-blue-500 py-2 px-8 rounded-md text-white mt-4"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
      <Link
        to="/register"
        className="underline text-blue-600 float-right mt-6 text-sm"
      >
        Not a user
      </Link>
    </div>
  );
};

export default Login;
