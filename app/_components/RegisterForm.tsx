"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RegisterFormData, registerSchema } from "@/lib/schema/auth.schema";
import { registerUserService } from "@/lib/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });
  const [apiError, setApiError] = useState<string | null>(null);

  async function onSubmit(data: RegisterFormData) {
    console.log("register Data:", data);
    setApiError(null);

    try {
      const response = await registerUserService(data);
      console.log("after response coming from backend", response);
      toast.success("register complete");
      reset();
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError("unexpected error");
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {apiError && <p className="text-red-500 text-sm">{apiError}</p>}
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
