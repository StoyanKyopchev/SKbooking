import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

type SignUpFormData = {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConf: string;
  };
};

const SignUp = () => {
  const [form, setForm] = useState<SignUpFormData>({
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConf: "",
    },
  });
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      formData: {
        ...form.formData,
        [event.target.name]: event.target.value,
      },
    });
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setError("");
      setSuccessMessage("");

      const response = await fetch(`${SERVER_BASE_URL}/api/users/sign-up`, {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(form.formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`${data.message}`);
      }

      setSuccessMessage(data.message);
      setTimeout(() => {
        authContext?.validateToken();
        navigate("/");
      }, 2500);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  }

  return (
    <>
      <div className="flex justify-center">
        <form
          className="flex flex-col items-center gap-3 pb-5 2xl:pb-0 w-full md:w-3/5 xl:w-1/2 2xl:w-1/3 group"
          onSubmit={handleSubmit}
          noValidate
        >
          {error && (
            <div className="rounded p-2 text-white font-bold bg-red-500 text-center">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="rounded p-2 text-white font-bold bg-green-500 text-center">
              {successMessage}
            </div>
          )}

          <h2 className="text-3xl font-bold text-sky-700">Sign Up</h2>
          <div className="flex flex-col lg:flex-row gap-5 w-full">
            <label
              className="text-sky-700 font-bold w-full lg:w-1/2"
              htmlFor="firstName"
            >
              First Name
              <input
                className="border w-full rounded mt-1 py-1 px-2 text-black font-normal text-base focus:outline-none focus:ring focus:ring-sky-700"
                type="text"
                name="firstName"
                value={form.formData.firstName}
                onChange={handleChange}
                required
              />
            </label>
            <label
              className="text-sky-700 font-bold w-full lg:w-1/2"
              htmlFor="lastName"
            >
              Last Name
              <input
                className="border w-full rounded mt-1 py-1 px-2 text-black font-normal text-base focus:outline-none focus:ring focus:ring-sky-700"
                type="text"
                name="lastName"
                value={form.formData.lastName}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <label className="text-sky-700 font-bold w-full" htmlFor="email">
            Email
            <input
              className="border w-full rounded mt-1 py-1 px-2 text-black font-normal text-base focus:outline-none focus:ring focus:ring-sky-700 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
              type="email"
              name="email"
              value={form.formData.email}
              onChange={handleChange}
              placeholder=" "
              required
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}"
            />
            <span className="mt-1 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
              Please enter a valid email address.
            </span>
          </label>
          <label className="text-sky-700 font-bold w-full" htmlFor="password">
            Password
            <input
              className="border w-full rounded mt-1 py-1 px-2 text-black font-normal text-base focus:outline-none focus:ring focus:ring-sky-700 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
              type="password"
              name="password"
              value={form.formData.password}
              onChange={handleChange}
              placeholder=" "
              required
              pattern=".{6,}"
            />
            <span className="mt-1 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
              Your password must be at least 6 characters long.
            </span>
          </label>
          <label
            className="text-sky-700 font-bold w-full"
            htmlFor="passwordConf"
          >
            Confirm Password
            <input
              className="border w-full rounded mt-1 py-1 px-2 text-black font-normal text-base focus:outline-none focus:ring focus:ring-sky-700 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
              type="password"
              name="passwordConf"
              value={form.formData.passwordConf}
              onChange={handleChange}
              placeholder=" "
              required
              pattern={`${
                form.formData.password === form.formData.passwordConf
                  ? ".{6,}"
                  : ".{12345,}"
              }`}
            />
            <span className="mt-1 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
              Passwords do not match.
            </span>
          </label>
          <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-center w-full">
            <span>
              Already have an account?{" "}
              <Link to="/sign-in" className="text-sky-700 font-bold underline">
                Sign In
              </Link>
            </span>
            <span className="w-3/4 md:w-1/3">
              <button
                className="bg-sky-700 w-full text-white text-lg font-bold p-2 rounded hover:bg-sky-600 focus:outline-none focus:ring focus:ring-sky-800 group-invalid:pointer-events-none group-invalid:opacity-30"
                type="submit"
              >
                Sign Up
              </button>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
