import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import AuthCard from "./AuthCard";
import InputField from "./InputField";
import PasswordInput from "./PasswordInput";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();

  const { login, googleLogin } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing again
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      await login(
        formData.email,
        formData.password
      );

      // Login successful
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  console.log(
  "Google Client ID:",
  import.meta.env.VITE_GOOGLE_CLIENT_ID
);

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

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

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
          {isLoading ? "Signing in..." : "Login"}
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

        <div className="flex justify-center">
  <GoogleLogin
    onSuccess={async (credentialResponse) => {
      try {
        setError("");
        setIsLoading(true);

        await googleLogin(
          credentialResponse.credential
        );

        navigate("/dashboard");
      } catch (err) {
        setError(
          err.message ||
            "Google Sign-In failed. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }}
    onError={() => {
      setError("Google Sign-In failed. Please try again.");
    }}
  />
</div>

        <p className="text-center text-sm text-gray-500">
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