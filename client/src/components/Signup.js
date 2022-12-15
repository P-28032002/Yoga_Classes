import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";


const LoginSchema = Yup.object().shape({
  firstname: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('First Name is Required'),
  lastname: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Last Name is Required'),
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  age: Yup.number()
    .required("Age is Required")
    .min(18, "You must be at least 18 years")
    .max(65, "You must be at most 65 years"),
  address: Yup.string()
    .min(10, 'Must be 10 characters or more')
    .required('Address is Required'),
  city: Yup.string()
    .min(3, 'Must be 3 characters or more')
    .required('City is Required'),
  state: Yup.string()
    .min(3, 'Must be 3 characters or more')
    .required('State is Required'),
  country: Yup.string()
    .min(3, 'Must be 3 characters or more')
    .required('Country is Required'),
  gender: Yup.string().required('Required'),
  batchtime: Yup.string().required('Required'),
  fees: Yup.bool().oneOf([true], "You must accept the terms and conditions"),
});

export const Signup = () => {
  const [message, setMessage] = useState("");
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5">
          <Formik
            initialValues={{ firstname: '', lastname: '', email: '', age: '', address: '', city: '', state: '',country: '', gender: '', batchtime: '', fees: true, }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              console.log(values);
              axios({
                method: 'POST',
                url: '/userdata',
                data: values
              })
              .then(function (response) {
                    if(!response.data)
                    {
                      setMessage("Welcome to Yoga Classes, Registration is done successfully")
                    }
                    else{
                      setMessage(response.response.data.message)
                    }
              })
              .catch(function (error) {
                    if(!error.data)
                    {
                      setMessage("Welcome to Yoga Classes, Registration is done successfully")
                    }
                    else{
                      setMessage(error.response.data.message)
                    }
                    setMessage(error.response.data.message)
              });
              alert("Form is validated! Submitting the form...");
            }}
          >
            {({ touched, errors, isSubmitting, values }) =>
              !isSubmitting ? (
                <div>
                  <div className="row mb-5">
                    <div className="col-lg-12 text-center">
                      <h1 className="mt-5">Enroll Form</h1>
                    </div>
                  </div>
                  <Form>
                    <div className="form-group">
                      <label htmlFor="firstname">First Name</label>
                      <Field
                        type="text"
                        name="firstname"
                        placeholder="Enter First Name"
                        autoComplete="off"
                        className={`mt-2 form-control
                          ${touched.firstname && errors.firstname ? "is-invalid" : ""}`}
                      />

                      <ErrorMessage
                        component="div"
                        name="firstname"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastname" className="mt-3">
                        Last Name
                      </label>
                      <Field
                        type="text"
                        name="lastname"
                        placeholder="Enter Last Name"
                        className={`mt-2 form-control
                          ${touched.lastname && errors.lastname
                            ? "is-invalid"
                            : ""
                          }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="lastname"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        autoComplete="off"
                        className={`mt-2 form-control
                          ${touched.email && errors.email ? "is-invalid" : ""}`}
                      />

                      <ErrorMessage
                        component="div"
                        name="email"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="age" className="mt-3">
                        Age
                      </label>
                      <Field
                        type="number"
                        name="age"
                        placeholder="Enter Age"
                        className={`mt-2 form-control
                          ${touched.age && errors.age
                            ? "is-invalid"
                            : ""
                          }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="age"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="address" className="mt-3">
                        Address
                      </label>
                      <Field
                        type="text"
                        name="address"
                        placeholder="Enter Address"
                        className={`mt-2 form-control
                          ${touched.address && errors.address
                            ? "is-invalid"
                            : ""
                          }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="address"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="city" className="mt-3">
                        City
                      </label>
                      <Field
                        type="text"
                        name="city"
                        placeholder="Enter City"
                        className={`mt-2 form-control
                          ${touched.city && errors.city
                            ? "is-invalid"
                            : ""
                          }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="city"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="state" className="mt-3">
                        State
                      </label>
                      <Field
                        type="text"
                        name="state"
                        placeholder="Enter State"
                        className={`mt-2 form-control
                          ${touched.city && errors.city
                            ? "is-invalid"
                            : ""
                          }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="state"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="country" className="mt-3">
                        Country
                      </label>
                      <Field
                        type="text"
                        name="country"
                        placeholder="Enter Country"
                        className={`mt-2 form-control
                          ${touched.city && errors.city
                            ? "is-invalid"
                            : ""
                          }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="country"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="gender" className="mt-3">
                        Gender
                      </label>
                      <Field
                        name="gender"
                        as="select"
                        className={`mt-2 form-control
                          ${touched.gender && errors.gender
                            ? "is-invalid"
                            : ""
                          }`}
                      >
                        <option value="D" disabled>Choose....</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Others</option>
                      </Field>
                      <ErrorMessage
                        component="div"
                        name="gender"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="batch" className="mt-3">
                        Batch Time
                      </label>
                      <Field
                        name="batchtime"
                        as="select"
                        className={`mt-2 form-control
                          ${touched.batchtime && errors.batchtime
                            ? "is-invalid"
                            : ""
                          }`}
                      >
                        <option value="0" disabled>Choose....</option>
                        <option value="1">6-7AM</option>
                        <option value="2">7-8AM</option>
                        <option value="3">8-9AM</option>
                        <option value="4">5-6PM</option>
                      </Field>
                      <ErrorMessage
                        component="div"
                        name="batchtime"
                        className="invalid-feedback"
                      />
                    </div>

                    <div>
                      <label>
                      <Field 
                        type="checkbox" 
                        name="fees" 
                      />
                        I acknowledge to pay 500Rs as a monthly fee of Yoga Classes
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-4"
                    >
                      Register
                    </button>
                  </Form>
                </div>
              ) : (
                <div>
                  <h1 className="p-3 mt-5">Form Submitted</h1>

                  <div className="alert alert-success mt-3">
                    {/* Thank for your joining with us. Stay Safe, Stay Healthy :) ! */}
                    {message}
                  </div>
                </div>
              )
            }
          </Formik>
        </div>
      </div>
    </div>
  );
};