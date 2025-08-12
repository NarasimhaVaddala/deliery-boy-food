import React from "react";
import { FormComponent } from "../../lib/FormComponent";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { LoginValidation } from "../../lib/validations";
import { Link } from "react-router-dom";
import { useLoginHook } from "../../Hooks/LoginHook";

export default function Login() {
  const { handleSubmit } = useLoginHook();
  const { FormWrapper, errors, register } = FormComponent({
    defaultValues: undefined,
    submitFn: handleSubmit,
    validations: LoginValidation,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Sign in</h2>
          <p className="text-sm text-gray-600 mt-2">
            Please enter your mobile and password
          </p>
        </div>

        <FormWrapper className="space-y-6">
          <CustomInput
            errors={errors}
            register={register}
            name={"mobile"}
            label={"Enter Mobile number"}
            placeholder={"9876543210"}
            type={"number"}
          />
          <CustomInput
            errors={errors}
            register={register}
            name={"password"}
            label={"Enter password"}
            placeholder={"password"}
          />

          <CustomButton />
        </FormWrapper>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
