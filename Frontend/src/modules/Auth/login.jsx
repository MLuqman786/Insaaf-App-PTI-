import { FormikProvider, useFormik, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import { useNavigate, Link } from "react-router-dom";
import AxiosInstnace from "../../utils/Axios/Axiox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const userSchema = object({
  email: string().min(8).email().max(30).required("Email is a required field"),
  password: string().min(8).max(20).required(),
});

function Login() {
  const navigate = useNavigate();

  const login = async (data) => {
    return AxiosInstnace.post("/members/login", data);
  };

  const handleSubmit = async (data) => {
    try {
      const response = await login(data);
      const id=response.data.response.id
      toast.success(response.data.message);
      if(response.status==200){
        navigate(`/membersLayout/${id}`);
        // console.log(response.data.response.id)
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  return(
  <FormikProvider value={formik}>
  <ToastContainer />

  <div className="mt-10 mb-16">
    <form
      className="flex flex-col w-full md:w-80 px-5 rounded-2xl shadow-xl justify-center mx-auto"
      action=""
    >
      <h1 className="text-center text-green-600 text-2xl mb-5">Login</h1>

      <label htmlFor="email" className="text-gray-600">
        Email
      </label>
      <Field
        className="mt-3 bg-transparent border-b-2 focus:outline-none focus:border-green-500"
        placeholder="Type your Email"
        name="email"
      />
      <div className="h-4">
        <ErrorMessage name="email">
          {(msg) => <div className="text-red-600 mt-1">{msg}</div>}
        </ErrorMessage>
      </div>

      <label htmlFor="password" className="mt-5 text-gray-600">
        Password
      </label>
      <Field
        type="password"
        className="mt-3 bg-transparent border-b-2 focus:outline-none focus:border-green-500"
        placeholder="Type Your password"
        name="password"
      />
      <div className="h-4">
        <ErrorMessage name="password">
          {(msg) => <div className="text-red-600 mt-1">{msg}</div>}
        </ErrorMessage>
      </div>

      <button
        className="mt-8 mb-4 p-2 bg-green-500 transition duration-300 rounded-md text-white hover:bg-green-700"
        onClick={formik.handleSubmit}
      >
        Login
      </button>
      <h3 className="text-gray-600 pb-5 text-center">
        Don't have an account?
        <span className="text-green-600"> Only members can register</span>
      </h3>
    </form>
  </div>
</FormikProvider>
  )

}
export default Login;
