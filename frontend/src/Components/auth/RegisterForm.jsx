import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthCard from "./AuthCard";
import InputField from "./InputField";
import PasswordInput from "./PasswordInput";

const RegisterForm = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    institution: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log("Registration Data:", formData);

    // Temporary navigation.
    navigate("/dashboard");
  };

  return (
    <AuthCard>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <InputField
          label="Full Name"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
        />

        <InputField
          label="Institution"
          name="institution"
          placeholder="Enter your institution"
          value={formData.institution}
          onChange={handleChange}
        />

        <InputField
          label="Email Address"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
        />

        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
        />

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
        />

        <label className="flex items-start gap-2 text-sm text-gray-600">

          <input
            type="checkbox"
            required
            className="mt-1 accent-green-600"
          />

          <span>
            I agree to the Terms of Service and Privacy Policy.
          </span>

        </label>

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
          Create Account
        </button>

        <p className="text-center text-sm text-gray-500">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-green-600 font-semibold hover:text-green-700"
          >
            Login
          </Link>

        </p>

      </form>

    </AuthCard>
  );
};

export default RegisterForm;