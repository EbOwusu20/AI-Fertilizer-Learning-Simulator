import AuthLayout from "../Components/auth/AuthLayout";
import RegisterForm from "../Components/auth/RegisterForm";

const Register = () => {
    return (
        <AuthLayout
            title="Create Your Account"
            subtitle="Start making smarter fertilizer decisions today.">
            <RegisterForm />
        </AuthLayout>
    );
};

export default Register;