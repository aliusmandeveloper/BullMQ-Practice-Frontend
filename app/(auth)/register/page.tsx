"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  RegisterSchema,
} from "@/features/auth/schemas/register.schema";

import { useRegister } from "@/features/auth/hooks/useRegister";

export default function RegisterPage() {
  const router = useRouter();

  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "user",
    },
  });

  const onSubmit = (data: RegisterSchema) => {
    console.log("🚀 FORM SUBMITTED:", data);

    registerMutation.mutate(data, {
      onSuccess: (res) => {
        console.log("✅ SUCCESS RESPONSE:", res);

        alert("Registration Successful");

        router.push("/login");
      },

      onError: (error: any) => {
        console.log("❌ ERROR RESPONSE:", error);

        alert(
          error?.response?.data?.message || "Registration Failed"
        );
      },
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 space-y-4 border rounded-xl p-6 shadow"
      >
        <h1 className="text-2xl font-bold text-center">
          Register
        </h1>

        {/* Name */}
        <input
          {...register("name")}
          placeholder="Name"
          className="border w-full p-2 rounded"
        />
        <p className="text-red-500 text-sm">
          {errors.name?.message}
        </p>

        {/* Email */}
        <input
          {...register("email")}
          placeholder="Email"
          className="border w-full p-2 rounded"
        />
        <p className="text-red-500 text-sm">
          {errors.email?.message}
        </p>

        {/* Password */}
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="border w-full p-2 rounded"
        />
        <p className="text-red-500 text-sm">
          {errors.password?.message}
        </p>

        {/* Role */}
        <select
          {...register("role")}
          className="border w-full p-2 rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>

      </form>

    </div>
  );
}