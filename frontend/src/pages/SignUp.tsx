import { useState } from "react";

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
  const [state, setState] = useState<SignUpFormData>({
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConf: "",
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      formData: {
        ...state.formData,
        [event.target.name]: event.target.value,
      },
    });
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/api/users/sign-up", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(state.formData),
    });
  }

  return (
    <>
      <div className="flex justify-center">
        <form
          className="flex flex-col items-center gap-3 md:gap-5 px-4 md:px-0 pb-5 2xl:pb-0 w-full lg:w-3/4 xl:w-1/2 2xl:w-1/3"
          onSubmit={handleSubmit}
        >
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
                value={state.formData.firstName}
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
                value={state.formData.lastName}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <label className="text-sky-700 font-bold w-full" htmlFor="email">
            Email
            <input
              className="border w-full rounded mt-1 py-1 px-2 text-black font-normal text-base focus:outline-none focus:ring focus:ring-sky-700"
              type="email"
              name="email"
              value={state.formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label className="text-sky-700 font-bold w-full" htmlFor="password">
            Password
            <input
              className="border w-full rounded mt-1 py-1 px-2 text-black font-normal text-base focus:outline-none focus:ring focus:ring-sky-700"
              type="password"
              name="password"
              value={state.formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <label
            className="text-sky-700 font-bold w-full"
            htmlFor="passwordConf"
          >
            Confirm Password
            <input
              className="border w-full rounded mt-1 py-1 px-2 text-black font-normal text-base focus:outline-none focus:ring focus:ring-sky-700"
              type="password"
              name="passwordConf"
              value={state.formData.passwordConf}
              onChange={handleChange}
              required
            />
          </label>
          <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-center w-full">
            <span>
              <a>Already have an account? Sign In</a>
            </span>
            <span className="w-3/4 md:w-1/3">
              <button
                className="bg-sky-700 w-full text-white text-lg font-bold p-2 rounded hover:bg-sky-600 focus:outline-none focus:ring focus:ring-sky-800"
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
