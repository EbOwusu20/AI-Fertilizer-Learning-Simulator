import AuthLayout from "../Components/auth/AuthLayout";
import LoginForm from "../Components/auth/LoginForm";

const Login = () => {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue to your fertilizer simulator."
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;