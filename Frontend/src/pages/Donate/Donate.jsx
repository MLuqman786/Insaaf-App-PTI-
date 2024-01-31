// ... (your other imports)

import { Field, Form, ErrorMessage, useFormik, FormikProvider } from "formik";
import { object, string, number } from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const userSchema = object({
  firstName: string().required("First Name is required"),
  lastName: string().required("Last Name is required"),
  email: string().email("Invalid email").required("Email is required"),
  phone: number().required("Phone is required"),
  pledgeAmount: number().required("Pledge Amount is required"),
  message: string(),
});

function Donate() {
  const handleSubmit = (values) => {
    console.log(values);
    formik.resetForm()
    toast.success("Submitted successfully");
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      pledgeAmount: "",
      message: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <>
      <ToastContainer />
      <FormikProvider value={formik}>
        <div className="flex flex-col items-center mb-4">
          <div className="shadow-lg w-full md:w-2/3 lg:w-1/2 xl:w-1/2 rounded-md border p-4">
            <h1 className="font-bold text-2xl md:text-4xl pb-4 text-green-600">
              Donation Form
            </h1>
            <h3 className="text-xs md:text-sm mb-4">
              Thank you for considering a donation! Your generosity helps us
              continue our mission and support the community.
            </h3>
            <hr className="bg-black mb-4 w-full" />
            <Form>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:gap-4">
                  <div className="flex-1">
                    <label>First Name</label>
                    <Field
                      type="text"
                      name="firstName"
                      className="p-2 w-full md:w-48 border rounded-md"
                    />
                    <ErrorMessage name="firstName">
                      {(msg) => <div className="text-red-600 mt-1">{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <div className="flex-1">
                    <label>Last Name</label>
                    <Field
                      type="text"
                      name="lastName"
                      className="p-2 w-full md:w-48 border rounded-md"
                    />
                    <ErrorMessage name="lastName">
                      {(msg) => <div className="text-red-600 mt-1">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>
                <div>
                  <label>Email Address</label>
                  <Field
                    type="email"
                    name="email"
                    className="p-2 w-full border rounded-md"
                  />
                  <ErrorMessage name="email">
                    {(msg) => <div className="text-red-600 mt-1">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div>
                  <label>Phone</label>
                  <Field
                    type="number"
                    name="phone"
                    className="p-2 w-full border rounded-md"
                  />
                  <ErrorMessage name="phone">
                    {(msg) => <div className="text-red-600 mt-1">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div>
                  <label>Pledge Amount</label>
                  <Field
                    type="number"
                    name="pledgeAmount"
                    className="p-2 w-full border rounded-md"
                  />
                  <ErrorMessage name="pledgeAmount">
                    {(msg) => <div className="text-red-600 mt-1">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div>
                  <label>Message</label>
                  <Field
                    as="textarea"
                    name="message"
                    className="font-open-sans font-medium p-2 border w-full rounded-md"
                    rows="4"
                    
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white rounded-sm mt-5 py-2 px-4"
              >
                Donate Now
              </button>
            </Form>
          </div>
        </div>
      </FormikProvider>
    </>
  );
}

export default Donate;
