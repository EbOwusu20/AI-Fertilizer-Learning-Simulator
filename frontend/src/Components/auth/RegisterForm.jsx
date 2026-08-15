import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import AuthCard from "./AuthCard";
import InputField from "./InputField";
import PasswordInput from "./PasswordInput";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    institution: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Check password confirmation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check password length
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    // Check required fields
    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.institution.trim()) {
      setError("Please enter your institution.");
      return;
    }

    setIsLoading(true);

    try {
      await register(
        formData.name,
        formData.institution,
        formData.email,
        formData.password
      );

      // Registration successful
      // AuthContext has already stored the JWT
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard>
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Full Name */}
        <InputField
          label="Full Name"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
        />

        {/* Institution */}
        <InputField
          label="Institution"
          name="institution"
          placeholder="Enter your institution"
          value={formData.institution}
          onChange={handleChange}
        />

        {/* Email */}
        <InputField
          label="Email Address"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
        />

        {/* Password */}
        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
        />

        {/* Confirm Password */}
        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
        />

        {/* Terms */}
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

        {/* Error message */}
        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="
            w-full
            bg-green-600
            text-white
            py-3
            rounded-xl
            font-semibold
            hover:bg-green-700
            transition
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
        >
          {isLoading
            ? "Creating Account..."
            : "Create Account"}
        </button>

        {/* Login link */}
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