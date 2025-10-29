"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RegisterFormData, registerSchema } from "@/lib/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  function onSubmit(data: RegisterFormData) {
    console.log("register Data:", data);
  }

  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" action="">
        <Input
          {...register("name")}
          name="name"
          type="text"
          placeholder="Name"
          className="bg-gray-50 mt-5"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
        <Input
          {...register("email")}
          name="email"
          type="email"
          placeholder="Email"
          className="bg-gray-50 mt-5"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <Input
          {...register("password")}
          name="password"
          type="password"
          placeholder="Password"
          className="bg-gray-50 mt-5"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        <Input
          {...register("confirmPassword")}
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          className="bg-gray-50 mt-5"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-5 w-full bg-MainColor cursor-pointer hover:bg-MainColor/95"
        >
          {isSubmitting ? "registering" : "Register"}
        </Button>
      </form>
    </div>
  );
}
