import React, { useId } from "react";

export default function CustomInput({
  register,
  errors,
  name,
  type,
  placeholder,
  label,
  accept,
}) {
  const id = useId();
  const error = errors[name];

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          type={type}
          accept={accept}
          placeholder={placeholder}
          {...register(name)}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`appearance-none block w-full px-3 py-2 border ${
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          } rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm`}
        />
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600" id={`${id}-error`}>
          {error.message}
        </p>
      )}
    </div>
  );
}
