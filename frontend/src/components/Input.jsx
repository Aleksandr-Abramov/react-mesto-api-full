import React from "react";

function Input({
  id,
  InputClass,
  name,
  minlength,
  maxlength,
  placeholder,
  spanText,
  type,
  value,
  onChange,
  ref,
}) {
  return (
    <>
      <input
        value={value}
        type={type}
        id={id}
        className={InputClass}
        minLength={minlength}
        maxLength={maxlength}
        placeholder={placeholder}
        name={name}
        required
        onChange={onChange}
        ref={ref}
      />
      <span className={`${id}-error popup__input-error`}>{spanText}</span>
    </>
  );
}
export default Input;
