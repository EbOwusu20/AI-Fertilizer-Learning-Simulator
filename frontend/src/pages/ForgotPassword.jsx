import AuthLayout from "../Components/auth/AuthLayout";
import ForgotForm from "../Components/auth/ForgotForm";

const ForgotPassword = () => {
    return (
        <AuthLayout
            title="Forgot Password?"
            subtitle="Enter your email and we'll help you reset your password.">
            <ForgotForm />
        </AuthLayout>
    );
};

export default ForgotPassword;