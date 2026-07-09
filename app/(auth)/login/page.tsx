"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, LoginSchema } from "@/features/auth/schemas/login.schema";
import { useLogin } from "@/features/auth/hooks/useLogin";

export default function LoginPage() {
const router = useRouter();

const loginMutation = useLogin();

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<LoginSchema>({
  resolver: zodResolver(loginSchema),
});

const onSubmit = (data: LoginSchema) => {
  console.log("FORM DATA:", data);

  loginMutation.mutate(data, {
    onSuccess: (response) => {
      console.log("LOGIN SUCCESS:", response);

      localStorage.setItem("token", response.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

      document.cookie = `token=${response.token}; path=/`;

      if (response.user.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/dashboard/tasks");
      }

      router.refresh();
    },

    onError: (error: any) => {
      console.log("LOGIN ERROR:", error);

      console.log(
        "ERROR RESPONSE:",
        error?.response?.data
      );

      alert(
        error?.response?.data?.message ||
        "Login Failed"
      );
    },
  });
};


  return (
    <div className="flex justify-center items-center h-screen">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-96 border p-5 rounded-xl"
      >

        <h1 className="text-2xl font-bold">
          Login
        </h1>


        <input
          {...register("email")}
          placeholder="Email"
          className="border w-full p-2 rounded"
        />

        <p className="text-red-500 text-sm">
          {errors.email?.message}
        </p>


        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="border w-full p-2 rounded"
        />

        <p className="text-red-500 text-sm">
          {errors.password?.message}
        </p>


        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="bg-blue-500 text-white w-full py-2 rounded"
        >

          {
            loginMutation.isPending
              ? "Loading..."
              : "Login"
          }

        </button>


      </form>

    </div>
  );
}