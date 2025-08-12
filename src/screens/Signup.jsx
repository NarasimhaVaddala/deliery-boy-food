import React from "react";
import { FormComponent } from "../../lib/FormComponent";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { signUpValidation } from "../../lib/validations";
import { Link } from "react-router-dom";
import { useSignUpHook } from "../../Hooks/SignupHook";

export default function SignUp() {
  const { handleSubmit } = useSignUpHook();
  const { FormWrapper, errors, register } = FormComponent({
    defaultValues: undefined,
    submitFn: handleSubmit,
    validations: signUpValidation,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Sign Up</h2>
          <p className="text-sm text-gray-600 mt-2">
            Please Enter required Details to create account
          </p>
        </div>

        <FormWrapper className="space-y-6">
          <CustomInput
            errors={errors}
            register={register}
            name={"name"}
            label={"Enter Full Name"}
            placeholder={"Shyam Sundar"}
            type={"text"}
          />
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
            name={"email"}
            label={"Enter Email"}
            placeholder={"someone@something.com"}
            type={"text"}
          />
          <CustomInput
            errors={errors}
            register={register}
            name={"password"}
            label={"Enter password"}
            placeholder={"password"}
            type={"password"}
          />

          <CustomInput
            errors={errors}
            register={register}
            name={"aadhar"}
            label={"Add aadhar card"}
            placeholder={"password"}
            type={"file"}
            accept={".jpg,.jpeg,.pdf"}
          />
          <CustomInput
            errors={errors}
            register={register}
            name={"license"}
            label={"Add Driving License"}
            placeholder={"password"}
            type={"file"}
            accept={".jpg,.jpeg,.pdf"}
          />

          <CustomButton />
        </FormWrapper>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Aleady have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
