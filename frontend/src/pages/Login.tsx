
import { LoginForm } from "@/components/auth/LoginForm";

export default function Login() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-center mb-8">
          Login to EduComplaint
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
