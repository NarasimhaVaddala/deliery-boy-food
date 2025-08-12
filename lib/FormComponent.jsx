import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const FormComponent = ({ defaultValues, validations, submitFn }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: defaultValues || undefined,
    resolver: validations ? zodResolver(validations) : undefined,
  });

  const FormWrapper = ({ children, className }) => {
    return (
      <form className={className} onSubmit={handleSubmit(submitFn)}>
        {" "}
        {children}
      </form>
    );
  };

  return {
    FormWrapper,
    register,
    reset,
    watch,
    errors,
    setValue,
  };
};
