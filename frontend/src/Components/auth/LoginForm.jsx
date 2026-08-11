import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthCard from "./AuthCard";
import InputField from "./InputField";
import PasswordInput from "./PasswordInput";

const LoginForm = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login Data:", {
      ...formData,
      rememberMe,
    });

    // Temporary frontend navigation.
    // Backend authentication will replace this later.
    navigate("/dashboard");
  };

  return (
    <AuthCard>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <InputField
          label="Email Address"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
        />

        <PasswordInput
          value={formData.password}
          onChange={handleChange}
        />

        <div className="flex items-center justify-between">

          <label className="flex items-center gap-2 text-sm text-gray-600">

            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) =>
                setRememberMe(e.target.checked)
              }
              className="accent-green-600"
            />

            Remember me

          </label>

          <Link
            to="/forgot-password"
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            Forgot password?
          </Link>

        </div>

        <button
          type="submit"
          className="
            w-full
            bg-green-600
            text-white
            py-3
            rounded-xl
            font-semibold
            hover:bg-green-700
            transition
          "
        >
          Login
        </button>

        <div className="relative my-6">

          <div className="border-t" />

          <span
            className="
              absolute
              left-1/2
              -translate-x-1/2
              -top-3
              bg-white
              px-3
              text-sm
              text-gray-400
            "
          >
            OR
          </span>

        </div>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="
            w-full
            border
            border-gray-300
            text-gray-700
            py-3
            rounded-xl
            font-medium
            hover:bg-gray-50
            transition
          "
        >
          Continue as Guest
        </button>

        <p className="text-center text-sm text-gray-500 pt-2">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-green-600 font-semibold hover:text-green-700"
          >
            Create account
          </Link>

        </p>

      </form>

    </AuthCard>
  );
};

export default LoginForm;