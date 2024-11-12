"use client";
import Link from "next/link";
import TextInput from "../FormInputs/TextInput";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginInputProps } from "@/types/types";
import SubmitButton from "../FormInputs/SubmitButton";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { Button } from "../ui/button";
import Image from "next/image";
import SignupCarousel from "../Frontend/SignupCarousel";
import Logo from "../Frontend/Logo";

export default function LoginFormWithBg() {
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/dashboard";
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInputProps>();
  async function onSubmit(data: LoginInputProps) {
    try {
      setIsLoading(true);
      console.log("Attempting to sign in with credentials:", data);
      const loginData = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      console.log("SignIn response:", loginData);
      if (loginData?.error) {
        setIsLoading(false);
        toast.error("Sign-in error: Check your credentials");
        setShowNotification(true);
      } else {
        // Sign-in was successful
        setShowNotification(false);
        reset();
        setIsLoading(false);
        toast.success("Login Successful");
        router.push(returnUrl);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Network Error:", error);
      toast.error("Its seems something is wrong with your Network");
    }
  }
  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 lg:grid lg:min-h-[600px] lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[400px] gap-6">
          <div className="absolute left-5 top-5">
            <Logo />
          </div>
          <div className="grid gap-2">
            <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-3xl font-bold text-transparent">
              Login to your Account
            </h1>
            <p className="mb-4 text-balance text-sm text-muted-foreground">
              Welcome Back to ZARLO
            </p>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            {showNotification && (
              <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Sign-in error!</span> Please Check
                your credentials
              </Alert>
            )}
            <div className="transform transition-all duration-200 hover:scale-[1.01]">
              <TextInput
                label="Email Address"
                register={register}
                name="email"
                type="email"
                errors={errors}
                placeholder="johndoe@gmail.com"
              />
            </div>
            <div className="transform transition-all duration-200 hover:scale-[1.01]">
              <TextInput
                label="Password"
                register={register}
                page="login"
                name="password"
                type="password"
                errors={errors}
                placeholder="******"
              />
            </div>

            <div className="transform transition-all duration-200 hover:scale-[1.02]">
              <SubmitButton
                title="Login"
                isLoading={isLoading}
                loadingTitle="Logging you in please wait..."
              />
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-purple-600 transition-colors hover:text-pink-600 dark:text-purple-400"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <SignupCarousel />
      </div>
    </div>
  );
}
