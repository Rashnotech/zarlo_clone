"use client";
import { type RegisterInputProps } from "@/types/types";
import Link from "next/link";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { createUser } from "@/actions/users";
import toast from "react-hot-toast";
import SignupCarousel from "../Frontend/SignupCarousel";
import Logo from "../Frontend/Logo";
import { useRouter } from "next/navigation";

export default function RegisterWithBg({
  role = "USER",
  plan = "",
}: {
  role?: string | string[] | undefined;
  plan?: string | string[] | undefined;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [emailErr, setEmailErr] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInputProps>();
  const router = useRouter();

  async function onSubmit(data: RegisterInputProps) {
    setIsLoading(true);
    data.role = role;
    data.plan = plan;
    try {
      const user = await createUser(data);
      if (user.status === 409) {
        setIsLoading(false);
        setEmailErr(user.error);
      } else if (user.status === 200) {
        setIsLoading(false);
        reset();
        toast.success("Account Created successfully");
        router.push(`/verify-account/${user.data?.id}`);
      } else {
        setIsLoading(false);
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
              Create your Account
            </h1>
            <p className="mb-4 text-balance text-sm text-muted-foreground">
              Join ZARLO today
            </p>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="transform transition-all duration-200 hover:scale-[1.01]">
              <TextInput
                label="Full Name"
                register={register}
                name="fullName"
                errors={errors}
                placeholder="John Doe"
              />
            </div>
            <div className="transform transition-all duration-200 hover:scale-[1.01]">
              <TextInput
                label="Email Address"
                register={register}
                name="email"
                type="email"
                errors={errors}
                placeholder="johndoe@gmail.com"
              />
              {emailErr && (
                <p className="mt-2 text-xs text-red-500">{emailErr}</p>
              )}
            </div>
            <div className="transform transition-all duration-200 hover:scale-[1.01]">
              <TextInput
                label="Phone Number"
                register={register}
                name="phone"
                type="tel"
                errors={errors}
                placeholder="+1234567890"
              />
            </div>
            <div className="transform transition-all duration-200 hover:scale-[1.01]">
              <TextInput
                label="Password"
                register={register}
                name="password"
                type="password"
                errors={errors}
                placeholder="******"
              />
            </div>

            <div className="transform transition-all duration-200 hover:scale-[1.02]">
              <SubmitButton
                title="Sign Up"
                isLoading={isLoading}
                loadingTitle="Creating Account please wait..."
              />
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-purple-600 transition-colors hover:text-pink-600 dark:text-purple-400"
            >
              Login
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
