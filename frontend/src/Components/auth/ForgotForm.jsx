import { useState } from "react";
import { Link } from "react-router-dom";

import AuthCard from "./AuthCard";
import InputField from "./InputField";

const ForgotForm = () => {

    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Password reset requested:", email);

        setSubmitted(true);
    };

    if (submitted) {
        return (
            <AuthCard>

                <div className="text-center">

                    <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">

                        <span className="text-2xl text-green-600">
                            ✓
                        </span>

                    </div>

                    <h2 className="text-xl font-bold mt-5">
                        Check your email
                    </h2>

                    <p className="text-gray-500 mt-3">
                        If an account exists for{" "}
                        <span className="font-medium text-gray-700">
                            {email}
                        </span>
                        , we've sent instructions to reset your password.
                    </p>

                    <Link
                        to="/login"
                        className="
              inline-block
              mt-6
              text-green-600
              font-semibold
              hover:text-green-700
            "
                    >
                        Back to Login
                    </Link>

                </div>

            </AuthCard>
        );
    }

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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

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
                    Send Reset Link
                </button>

                <div className="text-center">

                    <Link
                        to="/login"
                        className="text-green-600 font-medium hover:text-green-700"
                    >
                        ← Back to Login
                    </Link>

                </div>

            </form>

        </AuthCard>
    );
};

export default ForgotForm;