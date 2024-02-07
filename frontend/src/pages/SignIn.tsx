import { useState } from "react";

type SignInFormData = {
  formData: {
    email: string;
    password: string;
  };
};

const SignIn = () => {
  const [form, setForm] = useState<SignInFormData>({
    formData: {
      email: "",
      password: "",
    },
  });
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

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
  }

  return (
    <>
      <div className="flex justify-center">
        <form
          className="flex flex-col items-center gap-3 px-4 md:px-0 pb-5 2xl:pb-0 w-full lg:w-3/4 xl:w-1/2 2xl:w-1/3 group"
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

          <h2 className="text-3xl font-bold text-sky-700">Sign In</h2>
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
          <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-center w-full">
            <span>
              <a>Don't have an account? Sign Up</a>
            </span>
            <span className="w-3/4 md:w-1/3">
              <button
                className="bg-sky-700 w-full text-white text-lg font-bold p-2 rounded hover:bg-sky-600 focus:outline-none focus:ring focus:ring-sky-800 group-invalid:pointer-events-none group-invalid:opacity-30"
                type="submit"
              >
                Sign In
              </button>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};
