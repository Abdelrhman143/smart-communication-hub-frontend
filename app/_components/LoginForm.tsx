"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginFormData, loginSchema } from "@/lib/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login Data:", data);
    // send data to API
  };
  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)} action="">
      <Input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="bg-gray-50 mt-5"
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}
      <Input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="bg-gray-50 mt-5"
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 w-full bg-MainColor cursor-pointer hover:bg-MainColor/95"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
