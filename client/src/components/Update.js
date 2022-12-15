import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  batchtime: Yup.string().required('Required'),
});

export const Update = () => {
  const [message, setMessage] = useState("");
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5">
          <Formik
            initialValues={{email: '', batchtime: ''}}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              console.log(values);
              axios({
                method: 'POST',
                url: '/updatebatch',
                data: values
              })
              .then(function (response) {
                if(!response.data)
                {
                  setMessage("Batch Time Updated successfully!!")
                }
                else{
                  setMessage(response.response.data.message)
                }
              })
              .catch(function (error) {
                    if(!error.data)
                    {
                      setMessage("Batch Time Updated successfully!!")
                    }
                    else{
                      setMessage(error.response.data.message)
                    }
                    setMessage(error.response.data.message)
              });
              alert("Update Form is validated! Submitting the form...");
            }}
          >
            {({ touched, errors, isSubmitting, values }) =>
              !isSubmitting ? (
                <div>
                  <div className="row mb-5">
                    <div className="col-lg-12 text-center">
                      <h1 className="mt-5">Update Form</h1>
                    </div>
                  </div>
                  <Form>
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

                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-4"
                    >
                      Update
                    </button>
                  </Form>
                </div>
              ) : (
                <div>
                  <h1 className="p-3 mt-5">Form Submitted</h1>

                  <div className="alert alert-success mt-3">
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